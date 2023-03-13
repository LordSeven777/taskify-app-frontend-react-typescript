import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

// Types
import type { TaskAttributes, PartialTaskAttributes } from '@customTypes/Task';

// Actions
import { addFeedback } from '@slices/feedbacks';

// Services
import { useDeleteTaskMutation } from '@services/tasks';

interface DeleteTaskModalProps {
  show: boolean;
  task: TaskAttributes | PartialTaskAttributes | null;
  onClose(): void;
}

export default function DeleteTaskModal({
  show,
  task,
  onClose,
}: DeleteTaskModalProps) {
  const dispatch = useDispatch();

  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const [isError, setError] = useState(false);

  async function handleTaskDelete() {
    if (!task) throw new Error('No task to delete');
    try {
      await deleteTask(task._id).unwrap();
      onClose();
      dispatch(
        addFeedback({
          reason: 'action',
          data: {
            type: 'success',
            title: 'Operation status',
            message: 'The task was deleted successfully',
            duration: 3000,
          },
        })
      );
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Modal show={show} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task deletion confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isError && (
          <Alert variant="danger" dismissible onClose={() => setError(false)}>
            <p>An error occured. Please try again.</p>
          </Alert>
        )}
        {task && (
          <p className="mb-0">
            Do you really want to delete the task: <strong>{task.name}</strong>?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex flex-row-reverse">
          <Button
            variant="danger"
            disabled={isLoading}
            className="ms-3"
            onClick={handleTaskDelete}
          >
            Delete
            {isLoading && (
              <Spinner
                animation="border"
                size="sm"
                variant="light"
                className="ms-2"
              />
            )}
          </Button>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
