import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Assets
import tasksBg from './assets/images/92330418-to-do-list-seamless-pattern-background-business-flat-vector-illustration-checklist-task-list-symbol-.webp';

// Components
import Navbar from '@components/parts/Navbar';

export default function App() {
  return (
    <AppWrapper
      className="app d-flex flex-column"
      style={{ backgroundImage: `url("${tasksBg}")` }}
    >
      <Navbar />
      <div className="container flex-fill">
        <Outlet />
      </div>
    </AppWrapper>
  );
}

/* STYLES **********************************************************/

const AppWrapper = styled.div`
  background-color: red;
  min-height: 100vh;
  height: auto;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    opacity: 0.6;
  }
`;
