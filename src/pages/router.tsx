import { createBrowserRouter } from 'react-router-dom';

// Layouts
import App from '@/App';

// Pages
import HomePage from './Home/HomePage';
import SignInPage from './SignIn/SignInPage';
import RegisterPage from './Register/RegisterPage';
import TasksPage from './Tasks/TasksPage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <SignInPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
      },
    ],
  },
]);

export default router;
