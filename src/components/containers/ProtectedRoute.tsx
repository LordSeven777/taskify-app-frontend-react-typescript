import { useRef, useEffect, PropsWithChildren } from 'react';
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

  const renderCountRef = useRef(0);

  const isAuthorized = reverse ? !isAuthenticated : isAuthenticated;

  useEffect(() => {
    if (renderCountRef.current === 0) {
      const message = reverse
        ? 'You cannot visit that page while being logged in'
        : 'You need to sign in in order to visit that page';
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
    renderCountRef.current++;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuthorized ? <>{children}</> : null;
}
