import { useState, useReducer, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Switch from 'react-bootstrap/Switch';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// Types
import type { TaskAttributes, TaskFormData } from '@customTypes/Task';
import type { FeedbackAttributesWithoutId } from '@customTypes/feedback';

// Helpers
import { isFetchBaseQueryError } from '@helpers/rtk';

// Services
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskCompletionMutation,
} from '@services/tasks';

// Components
import FormField from '@components/shared/FormField';
import FeedbackToast from '@components/shared/FeedbackToast';
import TaskLabelsField from './TaskLabelsField';
import TaskCheckListFields from './TaskCheckListField';

interface TaskFormProps {
  action?: 'creation' | 'update';
  read?: boolean;
  task?: TaskAttributes;
  onOpen?: () => void;
  onCancel?: () => void;
  onSubmitted?: (task: TaskAttributes) => void;
}

const emptyTaskData: TaskFormData = {
  name: '',
  description: '',
  checkList: [],
  startsAt: '',
  endsAt: '',
  labels: [],
  isCompleted: false,
};

const formValidationSchema = Yup.object().shape({
  name: Yup.string().required('The task name is required'),
  description: Yup.string(),
  startsAt: Yup.date().required('The starting time must be defined'),
  endsAt: Yup.date()
    .required('The finish time must be defined')
    .test({
      message: 'The finish time cannot be prior to the start time',
      test(finishDate, context) {
        const startDate = context.parent.startsAt as Date;
        if (finishDate && startDate)
          return (context.parent.startsAt as Date) < finishDate;
        else return true;
      },
    }),
  isCompleted: Yup.boolean(),
});

export default function TaskForm({
  action = 'creation',
  read = false,
  task,
  onCancel,
  onOpen,
  onSubmitted,
}: TaskFormProps) {
  // Error handling
  if (action === 'update' && !task) {
    throw new Error('A task update action requires a task props');
  }

  const [addTask, addTaskMutationResult] = useAddTaskMutation();
  const [updateTask, updateTaskMutationResult] = useUpdateTaskMutation();
  const [updateTaskCompletion, updateTaskCompletionResult] =
    useUpdateTaskCompletionMutation();

  const isSubmitting =
    addTaskMutationResult.isLoading || updateTaskMutationResult.isLoading;

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useReducer(
    (
      feedback: FeedbackAttributesWithoutId,
      payload: Partial<FeedbackAttributesWithoutId>
    ) => ({
      ...feedback,
      ...payload,
    }),
    {
      type: 'loading',
      title: '',
      message: '',
    }
  );

  const initialValues = useMemo<TaskFormData>(() => {
    return !task
      ? emptyTaskData
      : {
          name: task.name,
          description: task.description ?? '',
          checkList: task.checkList,
          startsAt: task.startsAt,
          endsAt: task.endsAt,
          labels: task.labels.map((label) => label._id),
          isCompleted: task.isCompleted,
        };
  }, [task]);

  const {
    values,
    touched,
    errors,
    setFieldValue,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: formValidationSchema,
    onSubmit(values) {
      switch (action) {
        case 'creation':
          addTask(values);
          break;
        case 'update':
          updateTask({
            id: (task as TaskAttributes)._id,
            ...values,
          });
          break;
        default:
          break;
      }
    },
  });

  // On task completion update success
  useEffect(() => {
    const updatedTask = updateTaskCompletionResult.data;
    if (updatedTask) {
      setFieldValue('isCompleted', updatedTask.isCompleted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTaskCompletionResult.data]);

  // On creation/update submission loading
  useEffect(() => {
    if (isSubmitting) {
      setFeedback({
        type: 'loading',
        title: 'Submitting ...',
        message:
          action === 'creation'
            ? 'Adding the task'
            : "Saving the task's changes",
      });
      !showFeedback && setShowFeedback(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  // On creation/update submission success
  useEffect(() => {
    const submittedTask =
      addTaskMutationResult.data || updateTaskMutationResult.data;
    if (submittedTask) {
      const message =
        action === 'creation'
          ? 'Task saved successfully'
          : 'Task updated successfully';
      !showFeedback && setShowFeedback(true);
      setFeedback({
        type: 'success',
        title: 'Operation success',
        message,
        duration: 3000,
      });
      onSubmitted && onSubmitted(submittedTask);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTaskMutationResult.data, updateTaskMutationResult.data]);

  // On creation/update submission error
  useEffect(() => {
    const error = addTaskMutationResult.error || updateTaskMutationResult.error;
    if (error) {
      let message = 'An unexpected error occured. Please try again.';
      if (isFetchBaseQueryError(error)) {
        if (error.status < 500) {
          message = 'There are wrong values in the form';
        }
      }
      !showFeedback && setShowFeedback(true);
      setFeedback({
        type: 'error',
        title: 'Operation error',
        message,
        duration: 3000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTaskMutationResult.error, updateTaskMutationResult.error]);

  function handleIsCompletedChange() {
    if (read && task) {
      // If the form is readonly, the completion state is updated directly to the API
      updateTaskCompletion({
        id: task._id,
        isCompleted: !values.isCompleted,
      });
    } else if (!read) {
      setFieldValue('isCompleted', !values.isCompleted);
    }
  }

  function handleFormCancel() {
    setValues({
      ...initialValues,
      isCompleted: values.isCompleted,
    });
    onCancel && onCancel();
  }

  return (
    <div>
      <Form noValidate onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <FormSectionWrapper>
              <FormField
                name="name"
                label="Name"
                value={values.name}
                placeholder="Name of the task"
                required={true}
                disabled={isSubmitting}
                isTouched={!!touched.name}
                errorMessage={errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormField
                as="textarea"
                name="description"
                label="Description"
                value={values.description}
                disabled={isSubmitting}
                placeholder="Describe the task"
                rows={3}
                isTouched={!!touched.description}
                errorMessage={errors.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TaskCheckListFields
                items={values.checkList}
                onItemsChange={(items) => setFieldValue('checkList', items)}
              />
              <TaskLabelsField
                read={read}
                labels={task?.labels ?? []}
                onSelectedChange={(labelIds) =>
                  setFieldValue('labels', labelIds)
                }
              />
            </FormSectionWrapper>
          </div>
          <div className="col-12 col-md-6">
            <FormSectionWrapper>
              <FormField
                type="datetime-local"
                name="startsAt"
                label="Start time"
                value={values.startsAt}
                required={true}
                disabled={isSubmitting}
                isTouched={!!touched.startsAt}
                errorMessage={errors.startsAt}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormField
                type="datetime-local"
                name="endsAt"
                label="Finish time"
                value={values.endsAt}
                required={true}
                disabled={isSubmitting}
                isTouched={!!touched.endsAt}
                errorMessage={errors.endsAt}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Group controlId="is-completed-field">
                <Form.Label>Is completed:</Form.Label>
                <Switch
                  checked={values.isCompleted}
                  name="isCompleted"
                  disabled={
                    updateTaskCompletionResult.isLoading || isSubmitting
                  }
                  title={
                    !values.isCompleted
                      ? 'Set to completed'
                      : 'Set to uncompleted'
                  }
                  onChange={handleIsCompletedChange}
                />
              </Form.Group>
              <div className="mt-4 d-flex align-items-start">
                {!read && (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="me-3"
                  >
                    Submit
                    {isSubmitting && (
                      <Spinner
                        animation="border"
                        size="sm"
                        variant="light"
                        className="ms-2"
                      />
                    )}
                  </Button>
                )}
                {action === 'update' && (
                  <>
                    {read ? (
                      <Button
                        variant="primary"
                        onClick={() => onOpen && onOpen()}
                      >
                        <FontAwesomeIcon icon="pen" className="me-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="outline-secondary"
                        onClick={handleFormCancel}
                      >
                        Cancel
                      </Button>
                    )}
                  </>
                )}
              </div>
            </FormSectionWrapper>
          </div>
        </div>
        <FeedbackToast
          feedback={feedback}
          show={showFeedback}
          position="bottom-right"
          onClose={() => setShowFeedback(false)}
        />
      </Form>
    </div>
  );
}

/* STYLES **********************************************************/

const FormSectionWrapper = styled.div`
  max-width: 23.75rem; /* 380px */
`;
