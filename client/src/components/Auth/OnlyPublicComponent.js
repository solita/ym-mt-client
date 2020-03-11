import { Component } from 'react';
import { connect } from 'react-redux';
import { userSelectors } from '../../state/ducks/user';

// Usage:
// <OnlyPublicComponent><>Hello</></OnlyPublicComponent> // returns <>Hello</> if the user is not logged in, otherwise null
class OnlyPublicComponent extends Component {
  render() {
    const { user, children } = this.props;
    const userIsLoggedIn = userSelectors.isLoggedIn(user);

    if (!userIsLoggedIn) {
      return children; // Show contents only if the user is not logged in
    }

    return null;
  }
}

const mapStateToProps = state => ({ user: state.userState.user });

export default connect(mapStateToProps)(OnlyPublicComponent);
