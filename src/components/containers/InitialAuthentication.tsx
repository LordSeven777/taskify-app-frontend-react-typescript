import { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Helpers
import { isFetchBaseQueryError } from '@helpers/rtk';

// Store
import type { RootState } from '@/store';

// Actions
import { setAuth } from '@slices/auth';
import { addFeedback } from '@slices/feedbacks';

// Services
import { useTokenAuthenticationMutation } from '@services/auth';

interface InitialAuthenticationProps {
  children?: (isDone: boolean) => ReactNode;
}

export default function InitialAuthentication({
  children,
}: InitialAuthenticationProps) {
  const { hasFetched } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [authenticateToken, { error, data: authResult }] =
    useTokenAuthenticationMutation();

  useEffect(() => {
    authenticateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On authentication success
  useEffect(() => {
    if (authResult) {
      dispatch(
        addFeedback({
          reason: 'browse',
          data: {
            type: 'success',
            title: 'Greetings',
            message: 'Welcome back',
            duration: 3000,
          },
        })
      );
      dispatch(
        setAuth({
          authUser: authResult.user,
          csrfToken: authResult.csrfToken,
          isAuthenticated: true,
          hasFetched: true,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authResult]);

  // On authentication error
  useEffect(() => {
    if (error) {
      console.log(error);
      const defaultMessage = 'An error occured. You must sign in again';
      let message: string | undefined;
      if (isFetchBaseQueryError(error)) {
        switch (error.status) {
          case 400:
            message = 'Your session expired. You must sign in again';
            break;
          case 404:
            message = defaultMessage;
            break;
          default:
            break;
        }
      } else {
        message = defaultMessage;
      }
      if (message) {
        dispatch(
          addFeedback({
            reason: 'browse',
            data: {
              type: 'error',
              title: 'Authentication error',
              message,
              duration: 3500,
            },
          })
        );
      }
      dispatch(
        setAuth({
          hasFetched: true,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return children ? <>{children(hasFetched)}</> : null;
}
