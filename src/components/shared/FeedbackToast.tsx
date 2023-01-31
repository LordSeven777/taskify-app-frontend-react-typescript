import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Types
import { FeedbackAttributes } from '@customTypes/feedback';

export interface FeedbackToastProps {
  show?: boolean;
  feedback: Omit<FeedbackAttributes, 'id'> &
    Partial<Pick<FeedbackAttributes, 'id'>>;
  position?: 'top-right' | 'bottom-right' | 'bottom-left';
  onClose?: (id?: string | number) => void;
}

const BIG_NUMBER = 999999999999;

export default function FeedbackToast({
  show = true,
  feedback,
  position,
  onClose,
}: FeedbackToastProps) {
  const navigate = useNavigate();

  const portalRef = useRef<HTMLElement>(
    document.getElementById('feedback-portal')
  );

  let icon: IconProp;
  let color: string;
  switch (feedback.type) {
    case 'info':
      icon = 'info-circle';
      color = 'secondary';
      break;
    case 'success':
      icon = 'check-circle';
      color = 'success';
      break;
    case 'error':
      icon = 'times-circle';
      color = 'danger';
      break;
    default:
      icon = 'info-circle';
      color = 'primary';
      break;
  }

  const toast = (
    <Toast
      show={show}
      autohide={typeof feedback.duration === 'number'}
      delay={feedback.duration || BIG_NUMBER}
      onClose={() => onClose && onClose(feedback.id)}
    >
      <Toast.Header>
        <strong>{feedback.title}</strong>
      </Toast.Header>
      <Toast.Body>
        <div
          className="d-flex"
          style={{
            cursor:
              typeof feedback.redirectTo === 'string' ? 'pointer' : 'text',
          }}
          onClick={() =>
            typeof feedback.redirectTo === 'string' &&
            navigate(feedback.redirectTo)
          }
        >
          <div className="me-2">
            {feedback.type === 'loading' ? (
              <Spinner variant="primary" size="sm" />
            ) : (
              <FontAwesomeIcon
                icon={icon}
                fontSize="1rem"
                className={'text-' + color}
              />
            )}
          </div>
          <div>
            <p className="mb-0">{feedback.message}</p>
          </div>
        </div>
      </Toast.Body>
    </Toast>
  );

  if (position) {
    const style: Record<string, string> = {
      position: 'fixed',
      height: 'auto',
      width: 'fit-content',
      zIndex: '5',
    };
    if (position.match(/^bottom/)) {
      style.bottom = '1rem';
      if (position === 'bottom-left') style.left = '1rem';
      else style.right = '1rem';
    } else {
      style.top = 'calc(3.5rem + 0.5rem)';
      style.right = '1rem';
    }
    return createPortal(
      <div style={style}>{toast}</div>,
      portalRef.current as HTMLElement
    );
  }

  return toast;
}
