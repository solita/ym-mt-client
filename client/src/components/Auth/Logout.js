import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Row, Container, Col } from '../Layout/Layout';
import cx from 'classnames';
import * as AuthService from '../../services/AuthService';
import Loader from '../Loader/Loader';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleLogout = () => {
    return AuthService.userManager
      .signoutRedirectCallback()
      .then(res => {
        return res;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  componentDidMount() {
    this.handleLogout().then(res => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row>
            <Col span={12}>
              {loading ? <Loader loading={loading}></Loader> : <Redirect to="/" />}
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default Logout;
