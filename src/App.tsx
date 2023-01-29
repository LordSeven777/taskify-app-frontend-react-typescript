import { RouterProvider } from 'react-router-dom';

// The router
import router from '@pages/router';

export default function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
