import userReducer from './reducers';
import * as actions from './actions';

describe('Duck: User', function() {
  describe('state transfers', () => {
    it('initial state', () => {
      const emptyAction = {};

      const undefinedState = undefined;

      const result = userReducer(undefinedState, emptyAction);

      const expected = { user: { user: undefined, loggedIn: false, isAuthorizationDone: false } };
      expect(result).toEqual(expected);
    });

    it('login', () => {
      const userObject = { key: 'value' };
      const action = actions.logIn(userObject);

      const result = userReducer(undefined, action);
      const expected = {
        user: { user: { key: 'value' }, loggedIn: true, isAuthorizationDone: false }
      };

      expect(result).toEqual(expected);
    });

    it('logout', () => {
      const action = actions.logOut();

      const initialState = {
        user: { user: { key: 'value' }, loggedIn: true, isAuthorizationDone: false }
      };

      const result = userReducer(initialState, action);
      const expected = { user: { user: undefined, loggedIn: false, isAuthorizationDone: false } };

      expect(result).toEqual(expected);
    });

    it('should change authorization done when action is dispatched', () => {
      const action = actions.authorizationDone();

      const result = userReducer(undefined, action);
      const expected = {
        user: { user: undefined, loggedIn: false, isAuthorizationDone: true }
      };

      expect(result).toEqual(expected);
    });
  });
});
