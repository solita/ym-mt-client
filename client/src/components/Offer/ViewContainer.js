import cx from 'classnames';
import { compose, path } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { putJson } from '../../services/ApiService';
import { ACCEPT_DECLINE_OFFER } from '../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { offerOperations } from '../../state/ducks/offer';
import { rfoOperations } from '../../state/ducks/rfo';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';
import { acceptDeclinePayload } from './offer-utils';
import styles from './Offer.module.css';
import { OFFER_REJECT_REASON_OTHER } from './types';
import View from './View';

class ViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: undefined,
      loadingReaction: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOfferToView(id);
  }

  cleanState() {
    this.props.clearOfferFromView();
    this.props.setOfferNotFound(false);
  }

  acceptOffer = (id, rfoId) => () => {
    const { viewForm } = this.props;
    const reasonOfAccept = viewForm.reasonOfAccept;
    const payload = acceptDeclinePayload(true, id, reasonOfAccept);
    const putUrl = ACCEPT_DECLINE_OFFER + '/' + id;
    const redirectUrl = '/ilmoitukset/' + rfoId;

    this.setState({ loadingReaction: true });

    putJson(putUrl, payload)
      .then(res => {
        addToastNotification(this.props.t('Tarjous hyväksytty.'), ToastTypes.SUCCESS);

        this.setState({ loadingReaction: false, redirectTo: redirectUrl });
      })
      .catch(err => {
        addToastNotification(
          this.props.t('Tarjouksen hyväksyminen epäonnistui.'),
          ToastTypes.WARNING
        );

        this.setState({ loadingReaction: false });
      });
  };

  handleViewFormChange = event => {
    this.props.handleViewFormChange(event.target.name, event.target.value);
  };

  declineOffer = (id, rfoId) => () => {
    const { viewForm } = this.props;
    const otherResonText = viewForm.otherReasonOfDecline;
    const reason = viewForm.reasonOfDeclineOption;
    const payload = acceptDeclinePayload(
      false,
      id,
      reason === OFFER_REJECT_REASON_OTHER ? otherResonText : '',
      reason
    );
    const putUrl = ACCEPT_DECLINE_OFFER + '/' + id;
    const redirectUrl = '/ilmoitukset/' + rfoId;

    this.setState({ loadingReaction: true });

    putJson(putUrl, payload)
      .then(res => {
        addToastNotification(this.props.t('Tarjous hylätty.'), ToastTypes.SUCCESS);

        this.props.clearRfoFromView(); // Clear the rfo from view since we will direct to the view and we want to see the updated tsv state

        this.setState({ loadingReaction: false, redirectTo: redirectUrl });
      })
      .catch(err => {
        addToastNotification(
          this.props.t('Tarjouksen hylkääminen epäonnistui.'),
          ToastTypes.WARNING
        );

        this.setState({ loadingReaction: false });
      });
  };

  componentWillUnmount() {
    this.cleanState();
  }

  render() {
    const { offer, viewForm, loadingOffer, offerNotFound, t } = this.props;
    const { loadingReaction, redirectTo } = this.state;
    const rfoId = path(['rfoId'])(offer);

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row options={{ center: true }}>
            <Col span={8} sm={10} xs={12} className={styles.container}>
              {(loadingOffer || !offer) && (
                <>
                  {loadingOffer && (
                    <Loader loading={loadingOffer}>
                      <h1>{t('Ladataan tarjousta')}</h1>
                    </Loader>
                  )}
                  {offerNotFound && <h1>{t('Tarjousta ei ole olemassa')}</h1>}
                </>
              )}
              {!loadingOffer && offer && (
                <View
                  offer={offer}
                  viewForm={viewForm}
                  handleViewFormChange={this.handleViewFormChange}
                  acceptOffer={this.acceptOffer(this.props.match.params.id, rfoId)}
                  declineOffer={this.declineOffer(this.props.match.params.id, rfoId)}
                  loadingReaction={loadingReaction}
                />
              )}
            </Col>
          </Row>
        </Container>
        <Footer />
        {redirectTo && <Redirect to={redirectTo} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  offer: state.offerState.view.payload,
  viewForm: state.offerState.view.form,
  loadingOffer: state.offerState.status.loadingOffer,
  offerNotFound: state.offerState.status.offerNotFound
});

const mapDispatchToProps = dispatch => ({
  fetchOfferToView: id => dispatch(offerOperations.fetchOfferToView(id)),
  clearOfferFromView: () => dispatch(offerOperations.clearOfferView()),
  setOfferNotFound: status => dispatch(offerOperations.offerNotFound(status)),
  handleViewFormChange: (key, value) => dispatch(offerOperations.handleViewFormChange(key, value)),
  clearRfoFromView: () => dispatch(rfoOperations.clearRfoView())
});

export default compose(
  withNamespaces(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ViewContainer);
