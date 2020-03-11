import cx from 'classnames';
import React, { Component } from 'react';
import { Trans, withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ILMOITUKSET, LISAA_ILMOITUS, LISAA_ILMOITUS_JATE } from '../../routes';
import * as AuthService from '../../services/AuthService';
import '../../state/store.js';
import commonStyles from '../../styles/common.module.css';
import { getAuthServerUrl, getFeedbackUrl } from '../../utils/config-utils';
import PrivateComponent from '../Auth/PrivateComponent';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import InfoBanner from '../InfoBanner/InfoBanner';
import { Col, Container, Row } from '../Layout/Layout';
import Navigation from '../Navigation/Navigation';
import FetchRfos from '../RequestForOffer/FetchRfos';
import SimpleListView from '../RequestForOffer/SimpleListView';
import BasicStatistics from './BasicStatistics';
import styles from './Home.module.css';

const bannerHeading = t => {
  return t(
    'Jätelain muutos voimaan 1.1.2020 – Jätteen haltija, etsi jätehuoltopalvelua Materiaalitorista!'
  );
};

const bannerContent = t => {
  return (
    <>
      <p>
        {t(
          'Vuoden 2020 alusta alkaen jätteen haltijan on etsittävä Materiaalitorissa jätteelleen markkinaehtoista jätehuoltopalvelua, ennen kuin voi pyytää palvelua kunnalta markkinapuutteen vuoksi.'
        )}
      </p>
      <p>
        {t(
          'Yksityisen palvelutarjonnan puute on edellytys kunnan toissijaiselle jätehuoltopalvelulle ja sen selvittämiseksi jätteen haltijan on tehtävä ilmoitus tarvitsemastaan jätehuoltopalvelusta Materiaalitoriin. Toissijaista palvelua voi pyytää kunnan jätelaitokselta, jos kohtuullista markkinaehtoista palvelua ei löydy 14 vuorokauden kuluessa ilmoituksen jättämisestä.'
        )}
      </p>
      <p>
        <Trans i18nKey="etusivu_summer_banner">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://auth.materiaalitori.fi/Account/Login"
          >
            Kirjaudu
          </a>{' '}
          Materiaalitoriin tehdäksesi{' '}
          <Link to={LISAA_ILMOITUS_JATE} target="_blank">
            ilmoituksen tarvitsemastasi jätehuoltopalvelusta
          </Link>
          .
        </Trans>
      </p>
      <p>
        {t(
          'Materiaalitorin käyttövelvoite ei koske vuotuista alle 2 000 euron arvoista kunnan toissijaista jätehuoltopalvelua tai tilanteita, joissa jätehuoltopalvelua tarvitaan nopeasti ennalta arvaamattoman kiireen vuoksi. Julkiset jätteen haltijat eli hankintayksiköt tulevat velvoitteen piiriin vuoden 2021 alusta.'
        )}
      </p>
    </>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  login = () => {
    this.setState({ loading: true });
    return AuthService.login(AuthService.userManager, {
      redirectTo: this.props.location.pathname
    })
      .catch(err => {
        console.error(err);
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { t } = this.props;

    const registrationUrl = getAuthServerUrl();

    const feedbackUrl = getFeedbackUrl();

    const demandParams = {
      PageSize: 3,
      rfoType: ['offeringWaste', 'offeringMaterial']
    };
    const offerParams = {
      PageSize: 3,
      rfoType: ['receivingMaterial']
    };
    const serviceParams = {
      PageSize: 3,
      rfoType: ['offeringServices']
    };

    return (
      <>
        <Header />
        <Navigation />
        <div className="flex-grow-1">
          <Container className={cx('flex-grow-1', styles.heroContainer)}>
            <Row>
              <Col span={12}>
                <div className={cx(styles.hero)}>
                  <h1>
                    <span className={styles.mainHeading__lift}>{t('Materiaalit kiertoon!')}</span>
                  </h1>

                  <h2>
                    {t(
                      'Materiaalitori on kohtaamispaikka jätteiden ja sivuvirtojen tuottajille ja hyödyntäjille.'
                    )}
                  </h2>
                  <h2>{t('Ilmoita materiaaleista ja palveluista maksuttomasti!')}</h2>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <InfoBanner content={bannerContent(t)} heading={bannerHeading(t)} />
          </Container>
          <Container>
            <h1 className={'textCenter'}>{t('Uusimmat ilmoitukset')}</h1>
            <Row>
              <Col span={4} xs={12}>
                <div className={commonStyles.largeHorizontalPadding}>
                  <FetchRfos
                    title={t('Etsityt materiaalit')}
                    rfosParams={offerParams}
                    renderRfos={rfos => <SimpleListView rfos={rfos} />}
                  />
                </div>
              </Col>
              <Col span={4} xs={12}>
                <div className={commonStyles.largeHorizontalPadding}>
                  <FetchRfos
                    title={t('Tarjotut materiaalit')}
                    rfosParams={demandParams}
                    renderRfos={rfos => <SimpleListView rfos={rfos} />}
                  />
                </div>
              </Col>
              <Col span={4} xs={12}>
                <div className={commonStyles.largeHorizontalPadding}>
                  <FetchRfos
                    title={t('Tarjotut palvelut')}
                    rfosParams={serviceParams}
                    renderRfos={rfos => <SimpleListView rfos={rfos} />}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className={'textCenter'}>
                  <PrivateComponent>
                    <Link className={cx('buttonStyle', styles.buttonMargin)} to={LISAA_ILMOITUS}>
                      {t('+Lisää ilmoitus')}
                    </Link>
                  </PrivateComponent>
                  <Link className={cx('buttonStyle', styles.buttonMargin)} to={ILMOITUKSET}>
                    {t('Hae ilmoituksia')}
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
          <Container className={cx('flex-grow-1', styles.backgroundLightBlue)}>
            <Row>
              <Col span={4} xs={12}>
                <div className={cx(styles.liftElement)}>
                  <h2>{t('Vauhtia kiertotalouteen')}</h2>
                  <p className={styles.liftElement__bodyText}>
                    {t(
                      'Materiaalitori edistää jätteiden ja sivuvirtojen hyötykäyttöä tarjoamalla kohtaamispaikan, jossa kierrätysmateriaalien tarjoajat ja tarvitsijat voivat löytää toisensa. Kierrätysmateriaaleja käyttämällä voidaan vähentää luonnonvarojen kulutusta.  Materiaalitorin avulla pyritään keräämään Suomessa syntyvät materiaalivirrat näkyvämmiksi yhteen paikkaan, jotta niiden ympärille syntyisi uusia hyödyntämistapoja ja materiaalit päätyisivät yhä enemmän hyötykäyttöön.'
                    )}
                  </p>
                </div>
              </Col>
              <Col span={4} xs={12}>
                <div className={cx(styles.liftElement)}>
                  <h2>{t('Läpinäkyvyyttä kunnan toissijaiseen jätehuoltopalveluun (TSV)')}</h2>
                  <p className={styles.liftElement__bodyText}>
                    {t(
                      'Materiaalitori tuo läpinäkyvyyttä kunnan toissijaisen jätehuoltopalvelun käyttöön ja sen edellytyksenä olevan muun palvelutarjonnan puutteen osoittamiseen. 1.1.2020 voimaan tuleva jätelain uudistus velvoittaa Materiaalitorin käyttöön jätteen haltijat, jotka tarvitsevat kunnan toissijaista jätehuoltopalvelua vuodessa yli 2000 euron arvosta. Julkisia jätteen haltijoita eli hankintayksiköitä velvollisuus koskee 1.1.2021 alkaen.'
                    )}
                  </p>
                </div>
              </Col>
              <Col span={4} xs={12}>
                <div className={cx(styles.liftElement)}>
                  <h2>{t('Pilottikäyttö alkoi')}</h2>
                  <p className={styles.liftElement__bodyText}>
                    {t(
                      'Materiaalitori avattiin 8.4.2019 ja se on tarkoitettu kaikille yrityksille ja julkisille organisaatioille. Pilottikäytön ajan käyttäjiltä kerätään tehostetusti palautetta ja palvelua kehitetään edelleen. Joitakin uusia toiminnallisuuksia lisätään palveluun matkan varrella. Palveluun tehtyjen ilmoitusten tulee olla aitoja, jolloin ne mahdollistavat oikean vaihdannan kehittymisen.'
                    )}
                  </p>
                  <a href={feedbackUrl} rel="noopener noreferrer" target="_blank">
                    {t('Anna palautetta.')}
                  </a>
                </div>
              </Col>
              {/* <Col span={12}>
                <div className={cx(styles.liftElement, 'textCenter')}>
                  <h1>{t('Materiaalitorilla jätteet ja sivuvirrat kiertämään')}</h1>
                  <p className={styles.liftElement__bodyText}>
                    {t(
                      'Materiaalitorilla jätteet ja sivuvirrat kiertämäänMateriaalitori on tarkoitettu yritysten ja organisaatioiden jätteiden ja tuotannon sivuvirtojen ammattimaiseen vaihdantaa. Materiaalitorissa voi myös etsiä ja tarjota näihin liittyviä palveluja, kuten jätehuolto- ja asiantuntijapalveluja. Materiaalitorin käyttäminen on maksutonta ja avointa alan toimijoille.'
                    )}
                  </p>
                </div>
              </Col> */}
            </Row>
          </Container>
          <Container className={cx('flex-grow-1', styles.backgroundDarkBlue)}>
            <Row>
              <Col span={4} xs={12}>
                <div className={cx(styles.liftElement)}>
                  <h2>{t('Kysymyksiä ja vastauksia - FAQ')}</h2>
                  <ul className={styles.liftElement__bodyText}>
                    <li>{t('Miksi palveluun pitää tunnistautua vahvasti?')}</li>
                    <li>{t('Voiko palvelua käyttää ilman y-tunnusta?')}</li>
                    <li>{t('Mistä tietää onko hallussa oleva materiaali jätettä?')}</li>
                    <li>{t('Mikä on TSV?')}</li>
                  </ul>
                  <p className={styles.liftElement__bodyText}>
                    <Trans i18nKey="etusivu_faq_kehote">
                      Katso nämä ja monet muut keskeiset kysymykset ja vastaukset{' '}
                      <Link to="/ukk">Kysymyksiä ja vastauksia</Link> -sivulta.
                    </Trans>
                  </p>
                </div>
              </Col>
              <Col span={4} xs={12}>
                <div className={cx(styles.liftElement)}>
                  <h2>{t('Ohjeet - näin käytät Materiaalitoria')}</h2>
                  <p className={styles.liftElement__bodyText}>
                    {t(
                      'Kirjautuminen ja rekisteröityminen, organisaation tietojen tarkistaminen, ilmoitusten selailu ja tekeminen ja niihin vastaaminen, aluekoordinaattorin ohjeet...'
                    )}
                  </p>
                  <p className={styles.liftElement__bodyText}>
                    <Trans i18nKey="etusivu_ohjeet_kehote">
                      Katso <Link to="/ohjeet">Materiaalitorin ohjeet</Link>.
                    </Trans>
                  </p>
                </div>
              </Col>
              <Col span={4} xs={12}>
                <div className={cx(styles.liftElement)}>
                  <h2>{t('Rekisteröidy ja aloita Materiaalitorin käyttö heti')}</h2>
                  <p className={styles.liftElement__bodyText}>
                    {t(
                      'Ilmoitusten lisääminen ja niihin vastaaminen edellyttää palveluun rekisteröitymistä. Rekisteröityminen on avoin kaikille ja se tapahtuu Suomi.fi-tunnistautumisen kautta. Tunnistautumiseen tarvitset verkkopankkitunnukset tai mobiilivarmenteen.'
                    )}
                  </p>
                  <a href={`${registrationUrl}/Account/Login`}>
                    {t('Rekisteröidy Materiaalitoriin.')}
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
          <BasicStatistics />
        </div>
        <Footer />
      </>
    );
  }
}

export default withNamespaces()(Home);
