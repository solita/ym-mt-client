import cx from 'classnames';
import { compose } from 'ramda';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminCompany from './components/Admin/Company';
import AppWrapper from './components/AppWrapper/AppWrapper';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import OidcProvider from './components/Auth/OidcProvider';
import PrivateRoute from './components/Auth/PrivateRoute';
import Silent from './components/Auth/Silent';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './components/Home/Home';
import MyDetails from './components/MyPage/MyDetails';
import MyEvents from './components/MyPage/MyEvents';
import MyPage from './components/MyPage/MyPage';
import MyRfos from './components/MyPage/MyRfos';
import NotFound from './components/NotFound/NotFound';
import EditOfferContainer from './components/Offer/EditContainer';
import ViewOfferContainer from './components/Offer/ViewContainer';
import EditRequestForOffer from './components/RequestForOffer/Edit';
import ListAllRfos from './components/RequestForOffer/ListAllRfos';
import ViewRfoAsPage from './components/RequestForOffer/ViewAsPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import RfoSummary from './components/Summary/RfoSummary';
import Summary from './components/Summary/Summary';
import TsvSummary from './components/Summary/TsvSummary';
import WasteBatchSummary from './components/Summary/WasteBatchSummary';
import ToastContainer from './components/Toast/ToastContainer';
import CreateTsv from './components/TSV/CreateContainer';
import {
  getContractStates,
  getPublicOfficerStates,
  getStatesBeforeContract
} from './components/TSV/tsv-utils';
import TsvAgreementDraft from './components/TSV/TsvAgreementDraftContainer';
import TsvArchivePage from './components/TSV/TsvArchivePage';
import TsvPublicOfficer from './components/TSV/TsvPublicOfficer';
import TsvRequestsPage from './components/TSV/TsvRequestsPage';
import TsvSearch from './components/TSV/TsvSearch';
import ViewTsvContainer from './components/TSV/ViewContainer';
import WasteBatchReportPage from './components/WasteBatchReport/WasteBatchReportPage';
import Page from './pages/Page';
import {
  LISAA_ILMOITUS,
  LISAA_ILMOITUS_JATE,
  MUOKKAA_ILMOITUS,
  TARJOUKSET,
  TSV_PYYNNOT
} from './routes';

class App extends Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <Helmet>
          <title>
            {t('Jätteiden ja sivuvirtojen tietoalusta')} - {t('Materiaalitori')}
          </title>
        </Helmet>

        <OidcProvider>
          <AppWrapper className={cx('flex', 'flex-column', 'fullHeight', 'appRoot')}>
            <Router>
              <ScrollToTop>
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Home {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/ilmoitukset"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <ListAllRfos {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <PrivateRoute path={LISAA_ILMOITUS_JATE} exact component={EditRequestForOffer} />
                  <PrivateRoute
                    path={LISAA_ILMOITUS + '/:id'}
                    exact
                    component={EditRequestForOffer}
                  />
                  <PrivateRoute path={LISAA_ILMOITUS} exact component={EditRequestForOffer} />
                  <PrivateRoute
                    path={MUOKKAA_ILMOITUS + '/:id'}
                    exact
                    component={EditRequestForOffer}
                  />
                  <PrivateRoute path="/ilmoitukset/:id/teetsv" exact component={CreateTsv} />
                  <PrivateRoute
                    path="/ilmoitukset/:id/teetarjous"
                    exact
                    component={EditOfferContainer}
                  />
                  <Route
                    path="/ilmoitukset/:id"
                    render={props => (
                      <ErrorBoundary>
                        <ViewRfoAsPage {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/kokoomatiedot"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Summary {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/kokoomatiedot/ilmoitukset"
                    render={props => (
                      <ErrorBoundary>
                        <RfoSummary {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/kokoomatiedot/tsv"
                    render={props => (
                      <ErrorBoundary>
                        <TsvSummary {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/kokoomatiedot/pienerat"
                    render={props => (
                      <ErrorBoundary>
                        <WasteBatchSummary {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <PrivateRoute
                    path="/pienerat"
                    exact
                    component={WasteBatchReportPage}
                    isMunicipalWasteManagement
                  />
                  <PrivateRoute path={TARJOUKSET + '/:id'} exact component={ViewOfferContainer} />
                  <PrivateRoute
                    path={TSV_PYYNNOT}
                    exact
                    component={TsvSearch}
                    componentProps={{
                      renderComponent: TsvRequestsPage,
                      contractStatuses: getStatesBeforeContract(),
                      onlyContractStatuses: false
                    }}
                  />
                  <PrivateRoute path={TSV_PYYNNOT + '/:id'} exact component={ViewTsvContainer} />
                  <PrivateRoute
                    path="/tsv/sopimusarkisto"
                    exact
                    component={TsvSearch}
                    componentProps={{
                      renderComponent: TsvArchivePage,
                      contractStatuses: getContractStates(),
                      onlyContractStatuses: true
                    }}
                  />
                  <PrivateRoute
                    path="/tsv/viranomaiset"
                    exact
                    component={TsvSearch}
                    componentProps={{
                      renderComponent: TsvPublicOfficer,
                      contractStatuses: getPublicOfficerStates()
                    }}
                  />
                  <PrivateRoute path="/omasivu" exact component={MyPage} />
                  <PrivateRoute path="/omasivu/viestit" exact component={MyEvents} />
                  <PrivateRoute path="/omasivu/ilmoitukset" exact component={MyRfos} />
                  <PrivateRoute path="/omasivu/omattiedot" exact component={MyDetails} />
                  <PrivateRoute
                    path="/tsv/sopimusluonnokset/:id/teeluonnos"
                    exact
                    component={TsvAgreementDraft}
                  />
                  <PrivateRoute path="/tsv/sopimukset/:id" exact component={ViewTsvContainer} />
                  <Route path="/callback" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/silent" component={Silent} />
                  <Route
                    path="/ohjeet"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Page {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/tietoa-palvelusta"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Page {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/ukk"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Page {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/yhteystiedot"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Page {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/kayttoehdot"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Page {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/tietosuoja"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Page {...props} />
                      </ErrorBoundary>
                    )}
                  />
                  <Route
                    path="/saavutettavuusseloste"
                    exact
                    render={props => (
                      <ErrorBoundary>
                        <Page {...props} />
                      </ErrorBoundary>
                    )}
                  />

                  <PrivateRoute path="/admin/company/:id" exact component={AdminCompany} isAdmin />
                  <Route
                    path="*"
                    render={props => (
                      <ErrorBoundary>
                        <NotFound {...props} />
                      </ErrorBoundary>
                    )}
                  />
                </Switch>
              </ScrollToTop>
            </Router>
            <ToastContainer />
          </AppWrapper>
        </OidcProvider>
      </>
    );
  }
}

export default compose(connect(), withNamespaces())(App);
