import React, { Component } from 'react';
import * as AuthService from '../../services/AuthService';
import { logIn, logOut, authorizationDone } from '../../state/ducks/user/operations';
import { connect } from 'react-redux';

class OidcProvider extends Component {
  constructor(props) {
    super(props);

    this.userManager = AuthService.initUserManager();
    this.userManager.getUser().then(user => {
      if (user) {
        this.onUserLoaded(user);
      } else {
        AuthService.renewToken(this.userManager)
          .catch(err => {
            // This is a no-op error catch. Server response is login_required when user is not logged in and silent login fails because of that on page load
          })
          .finally(() => this.props.authorizationDone());
      }
    });
  }

  componentWillMount() {
    this.userManager.events.addUserLoaded(this.onUserLoaded);
    this.userManager.events.addSilentRenewError(this.onSilentRenewError);
    this.userManager.events.addAccessTokenExpired(this.onAccessTokenExpired);
    this.userManager.events.addAccessTokenExpiring(this.onAccessTokenExpiring);
    this.userManager.events.addUserUnloaded(this.onUserUnloaded);
    this.userManager.events.addUserSignedOut(this.onUserSignedOut);
  }

  componentWillUnmount() {
    this.userManager.events.removeUserLoaded(this.onUserLoaded);
    this.userManager.events.removeSilentRenewError(this.onSilentRenewError);
    this.userManager.events.removeAccessTokenExpired(this.onAccessTokenExpired);
    this.userManager.events.removeAccessTokenExpiring(this.onAccessTokenExpiring);
    this.userManager.events.removeUserUnloaded(this.onUserUnloaded);
    this.userManager.events.removeUserSignedOut(this.onUserSignedOut);
  }

  onUserLoaded = user => {
    this.props.logIn(user);
    this.props.authorizationDone();
  };

  onSilentRenewError = error => {
    console.error(error);
  };

  onAccessTokenExpired = () => {
    console.warn('token expired');
    this.userManager.removeUser().then(res => {
      console.warn('user signed out');
      this.props.logOut();
      this.isAuthorizationDone = true;
    });
  };

  onAccessTokenExpiring = () => {
    console.warn('token expiring');
    this.userManager.signinSilent();
  };

  onUserUnloaded = () => {
    console.log('user session terminated');
  };

  onUserSignedOut = () => {
    this.userManager.removeUser().then(res => {
      console.warn('user signed out');
      this.props.logOut();
    });
  };

  render() {
    return React.Children.only(this.props.children);
  }
}

const mapDispatchToProps = dispatch => ({
  authorizationDone: () => dispatch(authorizationDone()),
  logIn: user => dispatch(logIn(user)),
  logOut: () => dispatch(logOut())
});

export default connect(
  null,
  mapDispatchToProps
)(OidcProvider);
