import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// Types
import type { LabelAttributes } from '@customTypes/Label';

// Actions
import { addFeedback } from '@slices/feedbacks';

// Services
import { useDeleteLabelMutation } from '@services/labels';

interface LogoutModalProps {
  show: boolean;
  label: LabelAttributes | null;
  onClose(): void;
}

export default function DeleteLabelModal({
  show,
  label,
  onClose,
}: LogoutModalProps) {
  const dispatch = useDispatch();

  const [deleteLabel, { isLoading, isSuccess, error }] =
    useDeleteLabelMutation();

  function handleDelete() {
    label && deleteLabel(label._id);
  }

  // On logout success
  useEffect(() => {
    if (isSuccess || error) {
      onClose();
      const type = isSuccess ? 'success' : 'error';
      const title = isSuccess ? 'Label deleted' : 'Deletion error';
      const message = isSuccess
        ? 'The label has been deleted'
        : 'An error occured while deleting the label';
      dispatch(
        addFeedback({
          reason: 'action',
          data: {
            type,
            title,
            message,
            duration: 4000,
          },
        })
      );
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  return (
    <Modal show={show} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Label deletion confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {label && (
          <p>
            Do you really want to delete the label:{' '}
            <strong>{label.name}</strong>?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" disabled={isLoading} onClick={handleDelete}>
          Delete
          {isLoading && <Spinner size="sm" variant="light" className="ms-2" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
