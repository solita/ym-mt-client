import React from 'react';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import Ohjeet from './Ohjeet';
import Faq from './Faq';
import TietoaPalvelusta from './TietoaPalvelusta';
import Yhteystiedot from './Yhteystiedot';
import Tietosuoja from './Tietosuoja';
import Kayttoehdot from './Kayttoehdot';
import Saavutettavuusseloste from './Saavutettavuusseloste';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { Row, Container, Col } from '../components/Layout/Layout';
import i18n from '../i18n';

const PagePathMap = t => {
  return {
    '/ohjeet': {
      component: Ohjeet,
      title: t('Ohjeet')
    },
    '/tietoa-palvelusta': {
      component: TietoaPalvelusta,
      title: t('Tietoa palvelusta')
    },
    '/ukk': {
      component: Faq,
      title: t('Kysymykset ja vastaukset')
    },
    '/yhteystiedot': {
      component: Yhteystiedot,
      title: t('Yhteystiedot ja tuki')
    },
    '/tietosuoja': {
      component: Tietosuoja,
      title: t('Tietosuoja')
    },
    '/kayttoehdot': {
      component: Kayttoehdot,
      title: t('Käyttöehdot')
    },
    '/saavutettavuusseloste': {
      component: Saavutettavuusseloste,
      title: t('Saavutettavuusseloste')
    }
  };
};

const Page = ({ location, t }) => {
  const language = i18n.language;
  const { component, title } = PagePathMap(t)[location.pathname];

  return (
    <>
      <Helmet>
        <title>
          {title} - {t('Materiaalitori')}
        </title>
      </Helmet>
      <Header />
      <Navigation />
      <Container className="flex-grow-1 contentPage">
        <Row options={{ center: true }}>
          <Col span={9} sm={10} xs={12}>
            {component({ title, lang: language })}
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default withNamespaces()(Page);
