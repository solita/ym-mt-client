import React from 'react';
import { Helmet } from 'react-helmet';
import ListRequestForOffer from './List';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import cx from 'classnames';
import styles from './RequestForOffer.module.css';
import { Row, Container, Col } from '../Layout/Layout';
import { withNamespaces } from 'react-i18next';
import Search from '../Search/Search';
import ListView from './ListView';
import ListRequestForOfferOnMap from './ListMap';
import PrivateComponent from '../Auth/PrivateComponent';
import { Link } from 'react-router-dom';
import GetMoreRfos from '../Search/GetMoreRfos';
import { LISAA_ILMOITUS } from '../../routes';

export const ListAllRfos = ({ t }) => {
  return (
    <>
      <Helmet>
        <title>{t('Hae ilmoituksia - Materiaalitori')}</title>
      </Helmet>
      <Header />
      <Navigation />
      <Container className={cx('flex-grow-1')}>
        <Row options={{ center: true }}>
          <Col span={10} className={cx(styles.container)}>
            <h1 className={'textCenter'}>{t('Ilmoitukset')}</h1>
            <h3 className={'textCenter'}>
              {t('Hae, suodata ja selaa ilmoituksia tarpeidesi mukaan.')}
              <PrivateComponent>
                <div className={styles.addRfoButtonWrap}>
                  <Link className={cx('buttonStyle')} to={LISAA_ILMOITUS}>
                    {t('+Lisää ilmoitus')}
                  </Link>
                </div>
              </PrivateComponent>
            </h3>
            <div className={'divider'} />
            <Search />
          </Col>
        </Row>
      </Container>
      <Container>
        <ListRequestForOfferOnMap />
      </Container>
      <Container>
        <Row options={{ center: true }}>
          <Col span={10} className={cx(styles.container)}>
            <ListRequestForOffer render={rfos => <ListView rfos={rfos} />} />
            <GetMoreRfos />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default withNamespaces()(ListAllRfos);
