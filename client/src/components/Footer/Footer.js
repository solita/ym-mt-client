import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '../Layout/Layout';
import { withNamespaces } from 'react-i18next';
import styles from './Footer.module.css';
import cx from 'classnames';
import MotivaLogo from './motiva.png';
import YmLogo from './ymparistoministerio.png';

const Footer = React.memo(({ t }) => (
  <footer>
    <Container className={cx(styles.menuContainer)}>
      <Row>
        <Col span={3} xs={12}>
          <h3 className={styles.heading}>{t('Yhteystiedot ja tuki')}</h3>
          <h4 className={styles.heading__subHeading}>{t('Puhelin')} (09) 6122 5080</h4>
          <p className={styles.paragraph}>
            {t('tiistaisin')} 9-11
            <br />
            {t('torstaisin')} 13-15
          </p>

          <h4 className={styles.heading__subHeading}>{t('Sähköposti')}:</h4>
          <a className={styles.paragraph} href="mailto:materiaalitori@motiva.fi">
            materiaalitori@motiva.fi
          </a>
        </Col>
        <Col span={3} xs={12}>
          <h3 className={styles.heading}>{t('Tietoa palvelusta')}</h3>
          <Link className={styles.paragraph} to="/tietoa-palvelusta">
            {t('Tietoa palvelusta')}
          </Link>
          <Link className={styles.paragraph} to="/ohjeet">
            {t('Ohjeet')}
          </Link>
          <Link to="/ukk" className={styles.paragraph}>
            {t('Usein kysytyt kysymykset')}
          </Link>
          <Link to="/kayttoehdot" className={styles.paragraph}>
            {t('Käyttöehdot')}
          </Link>
          <Link to="/tietosuoja" className={styles.paragraph}>
            {t('Tietosuoja')}
          </Link>
          <Link to="/saavutettavuusseloste" className={styles.paragraph}>
            {t('Saavutettavuusseloste')}
          </Link>
        </Col>
        <Col span={3} xs={12}>
          <h3 className={styles.heading}>{t('Palvelun tuottaja')}</h3>
          <p className={styles.paragraph}>
            {t('Ympäristöministeriö')}
            <br />
            {t('Aleksanterinkatu')} 7<br />
            PL 35, 00023
            <br />
            {t('VALTIONEUVOSTO')}
            <br />
            {t('Vaihde')}: 0295 16001 ({t('valtioneuvoston vaihde')})
            <br />
            {t('Kirjaamo')}: 02952 50300
            <br />
            {t('Faksi')}: (09) 1603 9320
            <br />
            <a target="_blank" rel="noopener noreferrer" href="https://ym.fi">
              www.ym.fi
            </a>
          </p>
        </Col>
        <Col span={3} xs={12}>
          <h3 className={styles.heading}>{t('Palvelun ylläpitäjä')}</h3>
          <p className={styles.paragraph}>
            Motiva Oy
            <br />
            PL 489, 00101 HELSINKI
            <br />
            {t('Puhelin')} (09) 6122 5000
            <br />
            <a target="_blank" rel="noopener noreferrer" href="https://motiva.fi">
              www.motiva.fi
            </a>
          </p>
        </Col>
      </Row>
    </Container>
    <Container className={styles.logoContainer}>
      <Row className={styles.centerContent}>
        <Col span={4} xs={12}>
          <div className={styles.logoImageContainer}>
            <img
              className={styles.logoImageContainer__image}
              src={YmLogo}
              alt={t('Ympäristöministeriön logo')}
            />
          </div>
        </Col>
        <Col span={4} xs={12}>
          <div className={styles.logoImageContainer}>
            <img
              className={styles.logoImageContainer__image}
              src={MotivaLogo}
              alt={t('Motivan logo')}
            />
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
));

export default withNamespaces()(Footer);
