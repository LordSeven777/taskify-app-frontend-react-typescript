import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from '@components/parts/Navbar';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}
