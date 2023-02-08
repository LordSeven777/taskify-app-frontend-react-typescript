import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

// The router
import router from '@pages/router';

// Redux store
import store from './store';

// Components
import IconsImports from '@components/containers/IconsImports';
import InitialAuthentication from '@components/containers/InitialAuthentication';
import InitialLoader from '@components/parts/InitialLoader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IconsImports>
        <InitialAuthentication>
          {(isDone: boolean) =>
            isDone ? <RouterProvider router={router} /> : <InitialLoader />
          }
        </InitialAuthentication>
      </IconsImports>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
