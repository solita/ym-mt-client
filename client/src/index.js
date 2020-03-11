import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'normalize.css';
import './index.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import { initUserManager } from './services/AuthService';
import { Provider } from 'react-redux';
import store from './state/store';
import { initToastService } from './services/ToastService';

if (window.location.pathname === '/silent') {
  initUserManager().signinSilentCallback();
} else {
  initToastService(store);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
