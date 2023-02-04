import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// Types
import type { LoginCredentials } from '@customTypes/auth';

// Helpers
import { isFetchBaseQueryError } from '@helpers/rtk';

// Hooks
import usePageTitle from '@hooks/usePageTitle';

// Slices
import { setAuth } from '@slices/auth';
import { addFeedback } from '@slices/feedbacks';

// Services
import { useLoginMutation } from '@services/auth';

// Components
import AuthPageLayout from '@components/parts/AuthPageLayout';
import FloatingLabelField from '@components/shared/FloatingLabelField';

// Illustration
import { ReactComponent as LoginIllustration } from '../../assets/images/undraw_sign_in_re_o58h.svg';

const formInitialValues: LoginCredentials = {
  email: '',
  password: '',
};

const formValidationSchema = Yup.object({
  email: Yup.string()
    .required('The email is empty')
    .email('This is not a valid email address'),
  password: Yup.string().required('The password is empty'),
});

export default function SignInPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { isLoading, error, data: authResult }] = useLoginMutation();

  const loginCredentialsAreWrong =
    !!error && isFetchBaseQueryError(error) && error.status === 422;

  const errorMessage = loginCredentialsAreWrong
    ? 'One of the e-mail address and the password is wrong'
    : 'An unexpected error occured';

  usePageTitle('Sign in');

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
    onSubmit: (values) => login(values),
  });

  // Highlight the invalid inputs on wrong login credentials
  useEffect(() => {
    if (error && loginCredentialsAreWrong) {
      setErrors({ email: '', password: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // Success login handler
  useEffect(() => {
    if (authResult) {
      dispatch(
        setAuth({
          authUser: authResult.user,
          isAuthenticated: true,
          csrfToken: authResult.csrfToken,
        })
      );
      dispatch(
        addFeedback({
          reason: 'action',
          data: {
            type: 'success',
            title: 'Login status',
            message: 'You are now logged in',
            duration: 4000,
          },
        })
      );
      navigate('/tasks');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authResult]);

  return (
    <div id="sign-in-page">
      <AuthPageLayout>
        <IllustrationPart className="illustration-part">
          <div className="illustration-wrapper">
            <LoginIllustration id="login-illustration" />
          </div>
        </IllustrationPart>
        <div className="form-part d-flex">
          <MainContent className="px-3">
            <h1 className="mb-4">
              <FontAwesomeIcon icon="lock" className="me-4" />
              Sign in
            </h1>
            <Form method="POST" noValidate onSubmit={handleSubmit}>
              {error && (
                <Alert variant="danger" className="mb-3">
                  {errorMessage}
                </Alert>
              )}
              <FloatingLabelField
                type="email"
                name="email"
                label="E-mail"
                placeholder="E-mail address"
                value={values.email}
                isTouched={!!touched.email}
                disabled={isLoading}
                errorMessage={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FloatingLabelField
                type="password"
                name="password"
                label="Password"
                placeholder="Your password"
                value={values.password}
                isTouched={!!touched.password}
                disabled={isLoading}
                errorMessage={errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="d-grid mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                >
                  Authenticate
                  {isLoading && (
                    <Spinner variant="light" size="sm" className="ms-2" />
                  )}
                </Button>
              </div>
            </Form>
            <p className="mt-4 text-secondary">
              <small>
                You do not have an account yet?{' '}
                <Link to="/register">Register here</Link>
              </small>
            </p>
          </MainContent>
        </div>
      </AuthPageLayout>
    </div>
  );
}

/* STYLES **********************************************************/

const IllustrationPart = styled.div`
  .illustration-wrapper {
    width: 100%;
    padding: 0 2.75rem;
  }

  svg#login-illustration {
    max-width: 100%;

    #upper-body,
    #left-hand,
    #right-hand,
    #bullet-rect {
      fill: var(--bs-primary);
    }
  }
`;

const MainContent = styled.main`
  width: 21.875rem; /* 300px */
  max-width: 100%;
  align-self: center;

  @media screen and (min-width: 62rem) {
    align-self: flex-end;
  }
`;
