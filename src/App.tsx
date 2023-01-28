import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// Redux store
import store from './store';

// Components
import Routes from '@pages/Routes';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}
