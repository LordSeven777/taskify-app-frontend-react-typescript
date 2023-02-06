import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Types
import type { RootState } from '@/store';

// Actions
import { addFeedback } from '@slices/feedbacks';

type ProtectedRouteProps = PropsWithChildren<{
  reverse?: boolean;
}>;

export default function ProtectedRoute({
  children,
  reverse = false,
}: ProtectedRouteProps) {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const isAuthorized = reverse ? !isAuthenticated : isAuthenticated;

  if (!isAuthorized) {
    const message = reverse
      ? 'You cannot access that route while being logged in'
      : 'You need to sign in in order to access that route';
    const redirectTo = reverse ? '/tasks' : '/login';
    dispatch(
      addFeedback({
        reason: 'browse',
        data: {
          type: 'error',
          title: 'Access denied',
          message,
          duration: 3500,
        },
      })
    );
    navigate(redirectTo);
  }

  return <>{children}</>;
}
