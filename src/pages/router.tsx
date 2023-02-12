import { createBrowserRouter } from 'react-router-dom';

// Layouts
import App from '@/App';

// Containers
import ProtectedRoute from '@components/containers/ProtectedRoute';

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
        element: (
          <ProtectedRoute reverse={true}>
            <SignInPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <ProtectedRoute reverse={true}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tasks',
        element: (
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
