import React from 'react';
import { Component } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import ViewContainer from './ViewContainer';
import cx from 'classnames';
import styles from './RequestForOffer.module.css';
import { Row, Container, Col } from '../Layout/Layout';

class ViewAsPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Navigation />

        <Container className={cx('flex-grow-1')}>
          <Row options={{ center: true }}>
            <Col span={8} sm={10} xs={12} className={styles.container}>
              <ViewContainer id={this.props.match.params.id} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default ViewAsPage;
