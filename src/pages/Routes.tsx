import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

// Pages
import HomePage from './Home/HomePage';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
    </ReactRouterRoutes>
  );
}
