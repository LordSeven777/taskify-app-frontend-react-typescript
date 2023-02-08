import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

export default function InitialLoader() {
  return (
    <Container className="d-flex justify-content-center align-items-center bg-white">
      <div
        className="d-flex align-items-center"
        style={{ width: 'fit-content' }}
      >
        <Spinner variant="primary" className="me-3" />
        Loading ...
      </div>
    </Container>
  );
}

/* STYLES **********************************************************/

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  z-index: 100;
`;
