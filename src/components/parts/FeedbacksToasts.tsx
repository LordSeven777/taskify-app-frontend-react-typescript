import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import type { RootState } from '@/store';
import { deleteFeedback, type FeedbackReason } from '@/slices/feedbacks';

import FeedbackToast from '@components/shared/FeedbackToast';

export default function FeedbacksToasts() {
  const { actionFeedbacks, browseFeedbacks, notificationFeedbacks } =
    useSelector((state: RootState) => state.feedbacks);
  const dispatch = useDispatch();

  function handleClose(reason: FeedbackReason, id?: string | number) {
    console.log('Deleted');
    dispatch(
      deleteFeedback({
        id: id as string | number,
        reason,
      })
    );
  }

  return (
    <aside>
      <ActionsFeedbacksRoot>
        {actionFeedbacks.map((fb) => (
          <FeedbackToast
            key={fb.id as string | number}
            feedback={fb}
            onClose={(id) => handleClose('action', id)}
          />
        ))}
      </ActionsFeedbacksRoot>
      <BrowseFeedbacksRoot>
        {browseFeedbacks.map((fb) => (
          <FeedbackToast
            key={fb.id as string | number}
            feedback={fb}
            onClose={(id) => handleClose('browse', id)}
          />
        ))}
      </BrowseFeedbacksRoot>
      <NotificationsFeedbacksRoot>
        {notificationFeedbacks.map((fb) => (
          <FeedbackToast
            key={fb.id as string | number}
            feedback={fb}
            onClose={(id) => handleClose('notification', id)}
          />
        ))}
      </NotificationsFeedbacksRoot>
    </aside>
  );
}

/* STYLES ******************************************************** */

const ActionsFeedbacksRoot = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

const BrowseFeedbacksRoot = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`;

const NotificationsFeedbacksRoot = styled.div`
  position: fixed;
  top: 0.5rem;
  right: 1rem;
`;
