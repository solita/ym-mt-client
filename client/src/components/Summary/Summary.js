import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import cx from 'classnames';
import { Container, Row, Col } from '../Layout/Layout';
import { withNamespaces } from 'react-i18next';
import styles from './Summary.module.css';
import Icon from '../Icon/Icon';
import { KOKOOMATIEDOT_ILMOITUKSET, KOKOOMATIEDOT_TSV, KOKOOMATIEDOT_PIENERAT } from '../../routes';

const Summary = ({ t }) => {
  return (
    <>
      <Header />
      <Navigation />
      <Container className={cx('flex-grow-1')}>
        <Row options={{ center: true }}>
          <Col span={10} sm={12} xs={12}>
            <h1 className={styles.centerText}>{t('Tilastoja ilmoituksista ja materiaaleista')}</h1>
            <p className={styles.centerText}>
              {t(
                'Tällä sivulla näet tilastotietoa Materiaalitorin ilmoituksista, materiaaleista ja kunnan toissijaisesta jätehuoltopalvelusta. Hakukoneilla voit etsiä tietoa monilla eri kriteereillä.'
              )}
            </p>
            <div className={'divider'} />
          </Col>
        </Row>
        <Row options={{ center: true }}>
          <Col span={4} sm={6} xs={12} className={styles.columnContainer}>
            <div className={styles.iconContainer}>
              <Icon name={'OpenPaper'} />
            </div>
            <h2 className={styles.centerText}>{t('Tilastoja ilmoituksista ja materiaaleista')}</h2>
            <p className={styles.centerText}>
              {t(
                'Tarkastele tietoja Materiaalitoriin tehdyistä ilmoituksista ja ilmoitettujen materiaalien määristä.'
              )}
            </p>
            <p className={styles.centerText}>
              <Link className={'buttonStyle'} to={KOKOOMATIEDOT_ILMOITUKSET}>
                {t('Katso')}
              </Link>
            </p>
          </Col>

          <Col span={4} sm={6} xs={12}>
            <div className={styles.iconContainer}>
              <Icon name={'Archive'} />
            </div>
            <h2 className={styles.centerText}>
              {t('Tilastoja kunnan toissijaisesta jätehuoltopalvelusta tehdyistä sopimuksista')}
            </h2>
            <p className={styles.centerText}>
              {t('Tarkastele tietoja kunnan toissijaisesta jätehuoltopalvelusta.')}
            </p>
            <p className={styles.centerText}>
              <Link className={'buttonStyle'} to={KOKOOMATIEDOT_TSV}>
                {t('Katso')}
              </Link>
            </p>
          </Col>

          <Col span={4} sm={6} xs={12}>
            <div className={styles.iconContainer}>
              <Icon name={'Archive'} />
            </div>
            <h2 className={styles.centerText}>
              {t('Tilastoja muusta kunnan toissijaisesta jätehuoltopalvelusta')}
            </h2>
            <p className={styles.centerText}>
              {t(
                'Tarkastele tietoja Materiaalitorin käyttövelvoitteen ulkopuolelle jäävästä kunnan toissijaisesta palvelusta. Tiedot täydentyvät vuosittain.'
              )}
            </p>
            <p className={styles.centerText}>
              <Link className={'buttonStyle'} to={KOKOOMATIEDOT_PIENERAT}>
                {t('Katso')}
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default withNamespaces()(Summary);
