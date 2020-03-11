import cx from 'classnames';
import { compose } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { eventOperations } from '../../state/ducks/event';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Navigation from '../Navigation/Navigation';
import { AllEvents } from './Events';
import styles from './MyPage.module.css';
import { OMA_SIVU } from '../../routes';

class MyEvents extends Component {
  componentDidMount() {
    this.props.fetchAllEvents();
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row className={styles.container}>
            <Col span={12}>
              <h1 className={'textCenter'}>{t('Organisaation tapahtumat')}</h1>
              <div className={'divider'} />
              <Link className={'backButton'} to={OMA_SIVU}>
                {t('Omat sivut -etusivu')}
              </Link>
            </Col>
          </Row>
          <Row className={styles.container}>
            <Col span={12}>
              <AllEvents />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchAllEvents: () => dispatch(eventOperations.fetchAllEvents())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(MyEvents);
