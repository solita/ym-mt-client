import { combineReducers } from 'redux';
import * as types from './types';
import produce from 'immer';

const initialUserState = {
  user: undefined,
  loggedIn: false,
  isAuthorizationDone: false
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return produce(state, draft => {
        draft.user = action.payload;
        draft.loggedIn = true;
      });
    case types.USER_LOGGED_OUT:
      return produce(state, draft => {
        draft.user = undefined;
        draft.loggedIn = false;
      });
    case types.USER_AUTHORIZATION_DONE:
      return produce(state, draft => {
        draft.isAuthorizationDone = true;
      });
    default:
      return state;
  }
};

const userReducer = combineReducers({
  user
});

export default userReducer;
