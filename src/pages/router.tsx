import { createBrowserRouter } from 'react-router-dom';

// Pages
import HomePage from './Home/HomePage';
import SignInPage from './SignIn/SignInPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
]);

export default router;