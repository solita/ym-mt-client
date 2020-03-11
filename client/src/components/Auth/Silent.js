import { Component } from 'react';
import * as AuthService from '../../services/AuthService';

class Login extends Component {
  componentDidMount() {
    AuthService.userManager
      .signinSilentCallback()
      .then(user => {
        return true;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return null;
  }
}

export default Login;
