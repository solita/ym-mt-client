import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import cx from 'classnames';
import { withNamespaces } from 'react-i18next';
import { Row, Container, Col } from '../Layout/Layout';
import styles from './NotFound.module.css';

const NotFound = ({ t }) => (
  <>
    <Header />
    <Navigation />
    <Container className={cx('flex-grow-1')}>
      <Row className={styles.row}>
        <Col span={12}>
          <h1 className={'textCenter'}>{t('Sivua ei löydy')}</h1>
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
);

export default withNamespaces()(NotFound);
