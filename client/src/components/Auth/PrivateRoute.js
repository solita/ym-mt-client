import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSelectors } from '../../state/ducks/user';
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { isAllowed } from './PrivateComponent';

class PrivateRoute extends Component {
  render() {
    const { component: Component, componentProps, user, ...rest } = this.props;
    return userSelectors.isLoggedIn(user) && isAllowed(user, this.props) ? (
      <Route
        {...rest}
        render={props => (
          <ErrorBoundary>
            <Component {...props} key={this.props.path} {...componentProps} />
          </ErrorBoundary>
        )}
      />
    ) : (
      <Route {...rest} component={NotAuthorized} />
    );
  }
}

const mapStateToProps = state => ({ user: state.userState.user });

export default connect(mapStateToProps)(PrivateRoute);
