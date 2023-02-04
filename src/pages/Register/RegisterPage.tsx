import { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

// Types
import type { UserCreationAttributes } from '@customTypes/user';
import type { FeedbackAttributes } from '@customTypes/feedback';
import type { ApiValidationError } from '@customTypes/api';

// Utils
import { isStrongPassword } from '@utils/strings';

// Helpers
import { isFetchBaseQueryError } from '@helpers/rtk';
import { formatApiValidationErrors } from '@helpers/formatters';

// Hooks
import usePageTitle from '@hooks/usePageTitle';

// Slices
import { setAuth } from '@slices/auth';
import { addFeedback } from '@slices/feedbacks';

// Services
import { useRegisterUserMutation } from '@services/auth';

// Components
import AuthPageLayout from '@components/parts/AuthPageLayout';
import FeedbackToast from '@components/shared/FeedbackToast';
import RegistrationField from './RegistrationField';

// Illustration
import { ReactComponent as IllustrationSVG } from '../../assets/images/undraw_login_re_4vu2.svg';

type FeedbackPayload = Omit<FeedbackAttributes, 'id'>;

const formInitialValues: UserCreationAttributes = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const formValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('The first name must not be empty')
    .min(2, 'Must contain at least 2 characters'),
  lastName: Yup.string()
    .required('The last name must not be empty')
    .min(2, 'Must contain at least 2 characters'),
  username: Yup.string().required('The username must not be empty'),
  email: Yup.string().required('The email must not be empty').email(),
  password: Yup.string()
    .required('The password must not be empty')
    .test(
      'Is strong password',
      'Must have at least 7 characters and contain at least 1 lowercase, 1 uppercase and 1 special character',
      (value) => (value ? isStrongPassword(value, 7) : true)
    ),
  passwordConfirmation: Yup.string()
    .required('You must confirm your password')
    .oneOf([Yup.ref('password')], 'Incorrect password confirmation'),
});

export default function RegisterPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [register, { data: authResult, error, isLoading }] =
    useRegisterUserMutation();

  const [feedbackIsShown, showOrHideFeedback] = useState(false);
  const [feedback, setFeedback] = useReducer(
    (feedback: FeedbackPayload, payload: Partial<FeedbackPayload>) => ({
      ...feedback,
      ...payload,
    }),
    {
      type: 'loading',
      title: '',
      message: '',
    }
  );

  // Loading feedback
  useEffect(() => {
    if (isLoading) {
      setFeedback({
        type: 'loading',
        title: 'Loading ...',
        message: 'Registering the user',
      });
      showOrHideFeedback(true);
    }
  }, [isLoading]);

  // Error handling
  useEffect(() => {
    if (error) {
      console.log(error);
      const defaultError =
        'An unexpected error occured during the registration';
      let fbMessage: string;
      if (isFetchBaseQueryError(error)) {
        switch (error.status) {
          case 422: {
            fbMessage = 'There are wrong values in the form';
            // Setting the fields errors
            const errors = formatApiValidationErrors(
              (error.data as ApiValidationError).payload
            );
            setErrors(errors);
            break;
          }
          default:
            fbMessage = defaultError;
            break;
        }
      } else fbMessage = defaultError;
      setFeedback({
        type: 'error',
        title: 'Error',
        message: fbMessage,
        duration: 4000,
      });
      showOrHideFeedback(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // On registration success
  useEffect(() => {
    if (authResult) {
      console.log(authResult);
      showOrHideFeedback(false);
      dispatch(
        setAuth({
          isAuthenticated: true,
          authUser: authResult.user,
          csrfToken: authResult.csrfToken,
        })
      );
      dispatch(
        addFeedback({
          reason: 'action',
          data: {
            type: 'success',
            title: 'Registration completed',
            message: 'You have been successfully registered to Taskify',
            duration: 4000,
          },
        })
      );
      navigate('/tasks');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authResult]);

  usePageTitle('Create an account');

  const {
    values,
    errors,
    touched,
    setErrors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema,
    onSubmit: (values) => register(values),
  });

  return (
    <main id="registration-page">
      <AuthPageLayout>
        <div className="form-part">
          <RegistrationContent
            className="px-3 py-5"
            aria-labelledby="registration-title"
          >
            <h1 id="registration-title" className="mb-4">
              <FontAwesomeIcon icon="edit" className="me-3" />
              Register
            </h1>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              <FontAwesomeIcon icon="info-circle" className="me-2" />
              <em>Fields marked with * are required</em>
            </p>
            <Form noValidate onSubmit={handleSubmit}>
              <RegistrationField
                label="First name *"
                placeholder="First name"
                name="firstName"
                value={values.firstName}
                isTouched={!!touched.firstName}
                disabled={isLoading}
                errorMessage={errors.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <RegistrationField
                label="Last name *"
                placeholder="Last name"
                name="lastName"
                value={values.lastName}
                isTouched={!!touched.lastName}
                disabled={isLoading}
                errorMessage={errors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <RegistrationField
                label="Username *"
                placeholder="Username"
                name="username"
                value={values.username}
                isTouched={!!touched.username}
                disabled={isLoading}
                errorMessage={errors.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <RegistrationField
                type="email"
                label="E-mail *"
                placeholder="E-mail address"
                name="email"
                value={values.email}
                isTouched={!!touched.email}
                disabled={isLoading}
                errorMessage={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <RegistrationField
                type="password"
                label="Password *"
                placeholder="Password"
                name="password"
                value={values.password}
                isTouched={!!touched.password}
                disabled={isLoading}
                errorMessage={errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <RegistrationField
                type="password"
                label="Password confirmation *"
                placeholder="Confirm your password"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                isTouched={!!touched.passwordConfirmation}
                disabled={isLoading}
                errorMessage={errors.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="mt-4">
                <Button type="submit" disabled={isLoading} variant="primary">
                  Submit
                  {isLoading && (
                    <Spinner variant="light" size="sm" className="ms-2" />
                  )}
                </Button>
              </div>
              <FeedbackToast
                position="bottom-right"
                show={feedbackIsShown}
                feedback={feedback}
                onClose={() => showOrHideFeedback(false)}
              />
            </Form>
            <p className="mt-4 text-secondary">
              <small>
                You already have an account? <Link to="/login">Sign in</Link>
              </small>
            </p>
          </RegistrationContent>
        </div>
        <section aria-label="Illustration" className="illustration-part">
          <IllustrationWrapper className="illustration-wrapper">
            <IllustrationSVG id="illustration-svg" />
          </IllustrationWrapper>
        </section>
      </AuthPageLayout>
    </main>
  );
}

/* STYLES **********************************************************/

const IllustrationWrapper = styled.div`
  padding: 0 2rem;

  svg#illustration-svg {
    max-width: calc(100% - 2rem);

    #door-bell,
    #upper-1,
    #upper-2,
    #upper-3 {
      fill: var(--bs-primary);
    }
  }
`;

const RegistrationContent = styled.section`
  max-width: 21.875rem;
  width: 100%;
  align-self: center;

  @media screen and (min-width: 62rem) {
    align-self: flex-start;
  }
`;
