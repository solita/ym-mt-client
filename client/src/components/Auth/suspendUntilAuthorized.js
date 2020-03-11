import React from 'react';
import { connect } from 'react-redux';

const suspendUntilAuthorized = WrappedComponent => {
  return connect(mapStateToProps)(
    class extends React.Component {
      render() {
        const { isAuthorizationDone, ...rest } = this.props;
        return !isAuthorizationDone ? null : <WrappedComponent {...rest} />;
      }
    }
  );
};

const mapStateToProps = state => ({
  isAuthorizationDone: state.userState.user.isAuthorizationDone
});

export default suspendUntilAuthorized;
