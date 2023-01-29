import { createBrowserRouter } from 'react-router-dom';

// Layouts
import App from '@/App';

// Pages
import HomePage from './Home/HomePage';
import SignInPage from './SignIn/SignInPage';

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
    ],
  },
]);

export default router;
