import cx from 'classnames';
import { compose } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { OMAT_ILMOITUKSET, PIENERAT, TSV_PYYNNOT, TSV_VIRANOMAISET } from '../../routes';
import { eventOperations } from '../../state/ducks/event';
import { userSelectors } from '../../state/ducks/user';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Icon from '../Icon/Icon';
import { Col, Container, Row } from '../Layout/Layout';
import Navigation from '../Navigation/Navigation';
import FetchRfos from '../RequestForOffer/FetchRfos';
import SimpleListView from '../RequestForOffer/SimpleListView';
import SavedSearchList from '../Search/SavedSearchList';
import TsvRequestsList from '../TSV/TsvRequestsList';
import TsvSearch from '../TSV/TsvSearch';
import SimpleCompanyView from './../Company/SimpleView';
import CompanyView from './../Company/View';
import ContractArchive from './ContractArchive.js';
import { NewEvents } from './Events';
import styles from './MyPage.module.css';

const subtitle = (t, user) => {
  const forCompanyUser = t(
    'Oma sivu -osiossa näet kootusti kaikki sinuun ja organisaatioosi liittyvät tiedot, ilmoitukset ja hakuvahdit.'
  );
  const forMunicipalWasteManagement = t(
    'Oma sivu -osiossa näet kootusti kaikki sinuun ja organisaatioosi liittyvät tiedot, mahdolliset ilmoitukset, hakuvahdit, tulleet TSV-pyynnöt ja tiedot TSV-sopimuksista. Lisäksi voit tuoda ja katsella tietoja muusta kuin sopimuksiin liittyvästä TSV-palvelusta.'
  );
  const forPublicOfficer = t(
    'Oma sivu -osiossa näet kootusti kaikki sinuun ja organisaatioosi liittyvät tiedot, seuraamiesi tai valvomiesi jätelaitosten TSV-sopimustiedot, niihin liittyvät palvelupyynnöt ja ilmoitukset sekä jätelaitosten hylkäämät pyynnöt TSV-palvelusta. "Tilastot"-kohdasta löydät kootusti muusta TSV-palvelusta toimitetut tiedot.'
  );

  return (
    <p className={'textCenter'}>
      {userSelectors.isPublicOfficer(user)
        ? forPublicOfficer
        : userSelectors.isMunicipalWasteManagement(user)
        ? forMunicipalWasteManagement
        : forCompanyUser}
    </p>
  );
};

class MyPage extends Component {
  rfoFetchParameters = user => {
    const businessId = userSelectors.getOwnBusinessId(user);
    return {
      CreatedByBusinessId: businessId,
      PageSize: 5
    };
  };

  getNewEventsData = () => {
    this.props.fetchNewEvents();
  };

  componentDidMount() {
    this.getNewEventsData();
  }

  render() {
    const { t, user } = this.props;
    const ownCompany = userSelectors.getOwnCompany(user);
    const listHeading = (title, name) => {
      return (
        <div className={styles['listingTitleContainer']}>
          <Icon name={name} size={64} color="#000" title={title} />
          <span className={styles['listingTitle']}>{title}</span>
        </div>
      );
    };
    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row className={styles.container}>
            <Col span={12}>
              <h1 className={'textCenter'}>{t('Oma sivu')}</h1>
              {subtitle(t, user)}
              <div className={'divider'} />
            </Col>
            <Col span={12}>
              <NewEvents />
              <div className={'divider'} />
            </Col>
          </Row>
          <Row>
            {!userSelectors.isPublicOfficer(user) && (
              <Col span={4} xs={12} className={styles.container}>
                {listHeading(t('Organisaation ilmoitukset'), 'RfoOutline')}
                {user.loggedIn && (
                  <>
                    <FetchRfos
                      rfosParams={this.rfoFetchParameters(user)}
                      renderRfos={rfos => <SimpleListView rfos={rfos} />}
                      customNoResultsText={t('Ei aktiivisia ilmoituksia.')}
                    />
                    <div className={styles.buttonWrap}>
                      <Link className={'buttonStyle'} to={OMAT_ILMOITUKSET}>
                        {t('Kaikki ilmoitukset')}
                      </Link>
                    </div>
                  </>
                )}
              </Col>
            )}
            <Col span={4} xs={12} className={styles.container}>
              {listHeading(t('Omat / Organisaation tiedot'), 'UserOutline')}
              <CompanyView
                user={user}
                company={ownCompany}
                render={(user, company) => (
                  <SimpleCompanyView user={user} company={company} t={t} />
                )}
              />
            </Col>
            <Col span={4} xs={12} className={styles.container}>
              {listHeading(t('Omat hakuvahdit'), 'BellOutline')}
              <SavedSearchList t={t} />
            </Col>
            {!userSelectors.isPublicOfficer(user) && (
              <Col span={4} xs={12} className={styles.container}>
                {listHeading(
                  t('Sopimukset kunnan toissijaisesta jätehuoltopalvelusta'),
                  'BriefcaseOutline'
                )}
                <TsvSearch
                  renderComponent={ContractArchive}
                  searchParamsOverride={{ pagesize: 5 }}
                  onlyContractStatuses={true}
                />
              </Col>
            )}
            {!userSelectors.isPublicOfficer(user) && (
              <Col span={4} xs={12} className={styles.container}>
                {listHeading(t('Pyynnöt kunnan toissijaisesta jätehuoltopalvelusta'), 'Pennant')}
                <TsvSearch
                  renderComponent={TsvRequestsList}
                  searchParamsOverride={{ pagesize: 5 }}
                  onlyContractStatuses={false}
                />
                <div className={cx(styles.buttonWrap)}>
                  <Link className={'buttonStyle'} to={TSV_PYYNNOT}>
                    {t('Kaikki pyynnöt')}
                  </Link>
                </div>
              </Col>
            )}
            {userSelectors.isMunicipalWasteManagement(user) && (
              <Col span={4} xs={12} className={styles.container}>
                {listHeading(
                  t('Tiedot muusta kunnan toissijaisesta jätehuoltopalvelusta'),
                  'RfoOutline'
                )}
                <div className={styles.buttonWrap}>
                  <Link className={'buttonStyle'} to={PIENERAT}>
                    {t('Ilmoita ja katsele tietoja')}
                  </Link>
                </div>
              </Col>
            )}
            {userSelectors.isPublicOfficer(user) && (
              <Col span={4} xs={12} className={styles.container}>
                {listHeading(
                  t('Tiedot kunnan toissijaisesta jätehuoltopalvelusta'),
                  'BriefcaseOutline'
                )}
                <TsvSearch
                  renderComponent={TsvRequestsList}
                  searchParamsOverride={{ pagesize: 5 }}
                />
                <div className={styles.buttonWrap}>
                  <Link className={'buttonStyle'} to={TSV_VIRANOMAISET}>
                    {t('Katsele tietoja')}
                  </Link>
                </div>
              </Col>
            )}
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user
});

const mapDispatchToProps = dispatch => ({
  fetchNewEvents: () => dispatch(eventOperations.fetchNewEvents())
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withNamespaces())(MyPage);
