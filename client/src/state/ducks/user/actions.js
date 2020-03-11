import * as types from './types';

export const logIn = user => ({
  type: types.USER_LOGGED_IN,
  payload: user
});

export const logOut = () => ({
  type: types.USER_LOGGED_OUT
});

export const authorizationDone = () => ({
  type: types.USER_AUTHORIZATION_DONE
});
