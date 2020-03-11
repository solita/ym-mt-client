import { postJson } from '../../services/ApiService';
import { CLIENT_ERROR } from '../../services/endpoints';
import store from '../../state/store';
import { path } from 'ramda';

export const isUserLoggedIn = state => {
  const loggedInState = path(['userState', 'user', 'loggedIn'], state);
  return !!loggedInState;
};

export const logError = (type, url = '', body = '') => {
  const isLoggedIn = isUserLoggedIn(store.getState());

  return postJson(CLIENT_ERROR, {
    type,
    url,
    body,
    isAuthenticated: isLoggedIn
  });
};
