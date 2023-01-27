import { BrowserRouter as Router } from 'react-router-dom';

// Components
import Routes from '@pages/Routes';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes />
      </div>
    </Router>
  );
}
