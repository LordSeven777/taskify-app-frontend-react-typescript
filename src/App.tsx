import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// The router
import router from '@pages/router';

export default function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
