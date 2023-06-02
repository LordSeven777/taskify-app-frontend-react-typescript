import { createBrowserRouter, Outlet } from 'react-router-dom';

// Layouts
import App from '@/App';

// Containers
import ProtectedRoute from '@components/containers/ProtectedRoute';

// Pages
import HomePage from '@pages/Home/HomePage';
import SignInPage from '@pages/SignIn/SignInPage';
import RegisterPage from '@pages/Register/RegisterPage';
import TasksPage from '@pages/Tasks/TasksPage';
import LabelsPage from '@pages/Labels/LabelsPage';
import AddTaskPage from '@pages/AddTask/AddTaskPage';

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
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <TasksPage />,
          },
          {
            path: 'labels',
            element: <LabelsPage />,
          },
          {
            path: 'new-task',
            element: <AddTaskPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
