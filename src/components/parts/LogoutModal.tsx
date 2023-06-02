import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// Actions
import { logout as logoutAction } from '@slices/auth';
import { addFeedback } from '@slices/feedbacks';

// Services
import { useLogoutMutation } from '@services/auth';

interface LogoutModalProps {
  show: boolean;
  onClose(): void;
}

export default function LogoutModal({ show, onClose }: LogoutModalProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [logout, { isLoading, isSuccess, error }] = useLogoutMutation();

  function handleLogout() {
    logout();
  }

  // On logout success
  useEffect(() => {
    if (isSuccess || error) {
      onClose();
      const fbType = isSuccess ? 'success' : 'error';
      const fbTitle = isSuccess ? 'Log out success' : 'Log out error';
      const fbMessage = isSuccess
        ? 'You are now logged out'
        : 'An error occured while logging you out';
      dispatch(
        addFeedback({
          reason: 'action',
          data: {
            type: fbType,
            title: fbTitle,
            message: fbMessage,
            duration: 4000,
          },
        })
      );
      dispatch(logoutAction());
      if (isSuccess) navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  return (
    <Modal show={show} size="sm" centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log out confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you really want to log out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" disabled={isLoading} onClick={handleLogout}>
          Log out
          {isLoading && <Spinner size="sm" variant="light" className="ms-2" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
