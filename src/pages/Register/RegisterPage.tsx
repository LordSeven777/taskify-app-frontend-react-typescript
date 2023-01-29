import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

// Hooks
import usePageTitle from '@hooks/usePageTitle';

// Components
import AuthPageLayout from '@components/parts/AuthPageLayout';

// Illustration
import { ReactComponent as IllustrationSVG } from '../../assets/images/undraw_login_re_4vu2.svg';

export default function RegisterPage() {
  usePageTitle('Create an account');

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
            <Form noValidate>
              <FloatingLabel
                controlId="firstname-input"
                label="First name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="First name"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="lastname-input"
                label="Last name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="username-input"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="email-input"
                label="E-mail"
                className="mb-3"
              >
                <Form.Control type="email" name="email" placeholder="E-mail" />
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
              <FloatingLabel
                controlId="password_confirmation-input"
                label="Password confirmation"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="password_confirmation"
                  placeholder="Password confirmation"
                />
              </FloatingLabel>
              <div className="mt-4">
                <Button variant="primary">Submit</Button>
              </div>
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
