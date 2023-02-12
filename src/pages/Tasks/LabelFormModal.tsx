import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import type {
  LabelAttributes,
  LabelCreationAttributes,
} from '@customTypes/Label';
import type { ApiValidationError } from '@customTypes/api';

// Helpers
import { isFetchBaseQueryError } from '@helpers/rtk';
import { formatApiValidationErrors } from '@helpers/formatters';

// Actions
import { addFeedback } from '@slices/feedbacks';

// Services
import { useAddLabelMutation, useUpdateLabelMutation } from '@services/labels';

interface LabelFormModalProps {
  show: boolean;
  editLabel?: LabelAttributes | null;
  onClose?: () => void;
}

const initialValues: LabelCreationAttributes = {
  name: '',
  color: '#1C1C1C',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('The label name must not be empty'),
  color: Yup.string().required(),
});

export default function LabelFormModal({
  show,
  editLabel,
  onClose,
}: LabelFormModalProps) {
  const dispatch = useDispatch();

  const [
    addLabel,
    { isLoading: isAddingLabel, isSuccess: isAddSuccess, error: addError },
  ] = useAddLabelMutation();
  const [
    updateLabel,
    {
      isLoading: isUpdatingLabel,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateLabelMutation();

  const action: 'creation' | 'update' = editLabel ? 'update' : 'creation';

  const {
    values,
    errors,
    touched,
    setValues,
    setErrors,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<LabelCreationAttributes>({
    initialValues: initialValues,
    validationSchema,
    onSubmit(values) {
      if (!editLabel) addLabel(values);
      else {
        updateLabel({
          _id: editLabel._id,
          ...values,
        });
      }
    },
  });

  const isLoading = isAddingLabel || isUpdatingLabel;

  // Setting the initial values on modal show
  useEffect(() => {
    if (show) {
      setValues(
        !editLabel
          ? initialValues
          : {
              name: editLabel.name,
              color: editLabel.color,
            }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // On error
  useEffect(() => {
    const error = addError || updateError;
    if (error) {
      if (isFetchBaseQueryError(error) && error.status === 422) {
        setErrors(
          formatApiValidationErrors((error.data as ApiValidationError).payload)
        );
      } else {
        onClose && onClose();
        const title = addError ? 'Label addition error' : 'Label update error';
        const message = `Something went wrong while ${
          addError ? 'adding' : 'updating'
        } the label. Try again.`;
        dispatch(
          addFeedback({
            reason: 'action',
            data: {
              type: 'error',
              title,
              message,
              duration: 4000,
            },
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addError, updateError]);

  // Success handler
  useEffect(() => {
    if (isAddSuccess || isUpdateSuccess) {
      onClose && onClose();
      const message = isAddSuccess
        ? 'The label has been added'
        : 'The label has been edited';
      const title = isAddSuccess ? 'Label added' : 'Label edited';
      dispatch(
        addFeedback({
          reason: 'action',
          data: {
            type: 'success',
            title,
            message,
            duration: 4000,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddSuccess, isUpdateSuccess]);

  return (
    <Modal show={show} centered onHide={onClose} onExiting={() => resetForm()}>
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'creation' ? (
              <>
                <FontAwesomeIcon icon="plus" className="me-3" />
                Add a label
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="pen-square" className="me-3" />
                Edit the label
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="label-name" className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              disabled={isLoading}
              placeholder="Label name"
              isInvalid={!!touched.name && !!errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && !!errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="label-color" className="mb-3">
            <Form.Label>Color:</Form.Label>
            <Form.Control
              type="color"
              name="color"
              value={values.color}
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <div>
            <div className="mb-2">Preview:</div>
            <span
              className="btn"
              style={{ backgroundColor: values.color, color: '#fff' }}
            >
              {values.name}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            Submit
            {isLoading && (
              <Spinner size="sm" variant="light" className="ms-2" />
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
