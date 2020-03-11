import cx from 'classnames';
import { compose, path, replace } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { putJson } from '../../services/ApiService';
import { CANCEL_TSV_REQUEST, REJECT_TSV_REQUEST } from '../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { tsvOperations } from '../../state/ducks/tsv';
import { userSelectors } from '../../state/ducks/user';
import Accordion from '../Accordion/Accordion';
import PrivateComponent from '../Auth/PrivateComponent';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';
import ViewRfoContainer from '../RequestForOffer/ViewContainer';
import styles from './Tsv.module.css';
import TsvAgreementDraftView from './TsvAgreementDraftView';
import View from './View';

class ViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: undefined,
      loading: false
    };
  }

  componentDidMount() {
    this.props.fetchTsvRequest(this.props.match.params.id);
  }

  // Handles input field changes:
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.handleTsvViewFormChange(name, value);
  };

  cancelTsv = () => {
    const { tsvRequest } = this.props;
    this.setState({ loading: true });
    const putUrl = replace('{0}', this.props.match.params.id, CANCEL_TSV_REQUEST);
    const rfoId = path(['rfo', 'id'], tsvRequest);
    const redirectUrl = '/ilmoitukset/' + rfoId;
    const payload = {
      tsvId: this.props.match.params.id
    };
    putJson(putUrl, payload)
      .then(res => {
        addToastNotification(this.props.t('Pyyntö peruttu.'), ToastTypes.SUCCESS);

        this.setState({ loading: false, redirectTo: redirectUrl });
      })
      .catch(err => {
        addToastNotification(this.props.t('Pyynnön peruminen epäonnistui.'), ToastTypes.WARNING);

        this.setState({ loading: false });
      });
  };

  rejectTsv = () => {
    this.setState({ loading: true });

    const { tsvRequest, viewForm } = this.props;

    const rfoId = path(['rfo', 'id'], tsvRequest);
    const putUrl = replace('{0}', this.props.match.params.id, REJECT_TSV_REQUEST);
    const redirectUrl = '/ilmoitukset/' + rfoId;
    const payload = {
      tsvId: this.props.match.params.id,
      rejectionCode: viewForm.reasonOfRejectOption,
      rejectionText: viewForm.otherReasonOfRejectText
    };

    putJson(putUrl, payload)
      .then(res => {
        addToastNotification(this.props.t('Pyyntö hylätty.'), ToastTypes.SUCCESS);

        this.setState({ loading: false, redirectTo: redirectUrl });
      })
      .catch(err => {
        addToastNotification(this.props.t('Pyynnön hylkääminen epäonnistui.'), ToastTypes.WARNING);

        this.setState({ loading: false });
      });
  };

  componentWillUnmount = () => {
    this.props.clearTsvView();
  };

  render() {
    const { tsvRequest, viewForm, loadingDataFetch, user, t } = this.props;
    const { loading, redirectTo } = this.state;
    const isMunicipalWasteManager = userSelectors.isMunicipalWasteManagement(user);
    if (!tsvRequest) {
      return null;
    }
    return (
      <PrivateComponent>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row options={{ center: true }}>
            <Col span={8} sm={10} xs={12} className={styles.container}>
              <Loader loading={loadingDataFetch}>
                {tsvRequest.contract ? (
                  <>
                    <TsvAgreementDraftView tsv={tsvRequest} />
                  </>
                ) : (
                  <View
                    tsvRequest={tsvRequest}
                    loading={loading}
                    cancelTsv={this.cancelTsv}
                    viewForm={viewForm}
                    handleTsvViewFormChange={this.handleChange}
                    rejectTsv={this.rejectTsv}
                    isMunicipalWasteManager={isMunicipalWasteManager}
                  />
                )}
                {this.state.redirectTo && <Redirect to={this.state.redirectTo} />}
              </Loader>
            </Col>
          </Row>
          {tsvRequest.contract && (
            <Row options={{ center: true }}>
              <Col span={8} sm={10} xs={12} className={styles.container}>
                <div className="divider" />
                <div className={'embeddedLiftup'}>
                  <Accordion
                    showText={t('Näytä alkuperäinen pyyntö')}
                    hideText={t('Pienennä alkuperäinen pyyntö')}
                    viewOnly={true}
                    hideByDefault={true}
                  >
                    <View
                      tsvRequest={tsvRequest}
                      loading={loading}
                      cancelTsv={this.cancelTsv}
                      viewForm={viewForm}
                      handleTsvViewFormChange={this.handleChange}
                      rejectTsv={this.rejectTsv}
                      isMunicipalWasteManager={isMunicipalWasteManager}
                    />
                  </Accordion>
                </div>
              </Col>
            </Row>
          )}
          {tsvRequest && (
            <Row options={{ center: true }}>
              <Col span={8} sm={10} xs={12} className={styles.container}>
                <div className="divider" />
                <ViewRfoContainer
                  rfoToShow={tsvRequest.rfo}
                  id={tsvRequest.rfo.id}
                  viewOnly={true}
                />
              </Col>
            </Row>
          )}
        </Container>
        <Footer />
        {redirectTo && <Redirect to={redirectTo} />}
      </PrivateComponent>
    );
  }
}

const mapStateToProps = state => ({
  tsvRequest: state.tsvState.requestView.payload,
  viewForm: state.tsvState.requestView.form,
  loadingDataFetch: state.tsvState.general.loadingTsv,
  user: state.userState.user
});

const mapDispatchToProps = dispatch => ({
  fetchTsvRequest: tsvId => dispatch(tsvOperations.fetchTsvRequest(tsvId)),
  handleTsvViewFormChange: (key, value) =>
    dispatch(tsvOperations.handleTsvViewFormChange(key, value)),
  clearTsvView: () => dispatch(tsvOperations.clearTsvView())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(ViewContainer);
