import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// Hooks
import usePageTitle from '@hooks/usePageTitle';

// Components
import AuthPageLayout from '@components/parts/AuthPageLayout';

// Illustration
import { ReactComponent as LoginIllustration } from '../../assets/images/undraw_sign_in_re_o58h.svg';

export default function SignInPage() {
  usePageTitle('Sign in');

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
            <Form method="POST" noValidate>
              <FloatingLabel
                controlId="email-input"
                label="E-mail"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="E-mail address"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="password-input"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </FloatingLabel>
              <div className="d-grid mt-4">
                <Button type="submit" variant="primary" size="lg">
                  Authenticate
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
