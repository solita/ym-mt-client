import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import cx from 'classnames';
import { withNamespaces } from 'react-i18next';
import { Row, Container, Col } from '../Layout/Layout';
import styles from './NotAuthorized.module.css';

const NotFound = ({ t }) => (
  <>
    <Header />
    <Navigation />
    <Container className={cx('flex-grow-1')}>
      <Row className={styles.row}>
        <Col span={12}>
          <h1 className={'textCenter qa-unauthorized'}>{t('Ei pääsyoikeutta, kirjaudu sisään')}</h1>
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
);

export default withNamespaces()(NotFound);
