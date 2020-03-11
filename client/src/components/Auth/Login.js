import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Row, Container, Col } from '../Layout/Layout';
import cx from 'classnames';
import * as AuthService from '../../services/AuthService';
import Loader from '../Loader/Loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleSignin = () => AuthService.userManager.signinRedirectCallback();

  componentDidMount() {
    this.handleSignin()
      .then(user => {
        const { state } = user;
        const redirectTo = state ? state.redirectTo : '/';
        this.setState({ loading: false, redirectTo });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    const { loading, redirectTo } = this.state;

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row>
            <Col span={12}>
              {loading ? <Loader loading={loading}></Loader> : <Redirect to={redirectTo} />}
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default Login;
