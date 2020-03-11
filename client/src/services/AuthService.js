import { UserManager } from 'oidc-client';
import { getAuthServerUrl } from '../utils/config-utils';
import { getFromCookies } from '../utils/cookie-utils';

let userManager = undefined;

const origin = window.location.origin;

const settings = {
  authority: getAuthServerUrl('https://test.server.fi'),
  client_id: 'ym-tietoalusta-spa',
  response_type: 'id_token token',
  scope: 'openid profile ym-tietoalusta-api',
  accessTokenExpiringNotificationTime: 60,

  redirect_uri: origin + '/callback',
  post_logout_redirect_uri: origin + '/logout',
  ui_locales: getFromCookies('language') || 'fi-FI',

  automaticSilentRenew: false,
  silent_redirect_uri: origin + '/silent',
  monitorSession: !window.hasOwnProperty('cypress_test_session_in_progress')
};

const getUser = userMgr => {
  return userMgr.getUser();
};

const login = (userMgr, state = {}) => {
  if (userMgr && userMgr._settings) {
    userMgr._settings._ui_locales = getFromCookies('language') || 'fi-FI';
  }
  return userMgr.signinRedirect({ state });
};

const renewToken = userMgr => {
  return userMgr.signinSilent();
};

const logout = userMgr => {
  return userMgr.signoutRedirect();
};

const initUserManager = () => {
  if (!userManager) {
    userManager = new UserManager(settings);
  }
  return userManager;
};

export { userManager, UserManager, getUser, login, renewToken, logout, initUserManager };
