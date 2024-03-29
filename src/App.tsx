import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from '@components/parts/Navbar';
import FeedbacksToasts from '@components/parts/FeedbacksToasts';

// Assets
import './assets/css/style.css';
import tasksBg from './assets/images/92330418-to-do-list-seamless-pattern-background-business-flat-vector-illustration-checklist-task-list-symbol-.webp';

export default function App() {
  return (
    <AppWrapper
      className="app d-flex flex-column"
      style={{ backgroundImage: `url("${tasksBg}")` }}
    >
      <Navbar />
      <AppContainer className="container flex-fill pt-4 pb-5">
        <Outlet />
      </AppContainer>
      <div id="feedback-portal"></div>
      <FeedbacksToasts />
    </AppWrapper>
  );
}

/* STYLES **********************************************************/

const AppWrapper = styled.div`
  background-attachment: fixed;
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
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const AppContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 6px #888;
`;
