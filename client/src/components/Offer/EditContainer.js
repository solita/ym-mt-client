import { compose, path, replace } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { TARJOUKSET } from '../../routes';
import { postJson } from '../../services/ApiService';
import { CREATE_OFFER } from '../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { offerOperations } from '../../state/ducks/offer';
import { rfoOperations } from '../../state/ducks/rfo';
import { handlePrefills } from '../../utils/user-utils';
import PrivateComponent from '../Auth/PrivateComponent';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Navigation from '../Navigation/Navigation';
import { getCurrentSubServices, idEquals, isTsv, isWaste } from '../RequestForOffer/rfo-utils';
import ViewRfoContainer from '../RequestForOffer/ViewContainer';
import Edit from './Edit';
import { offerStateToOfferPayload } from './offer-utils';
import styles from './Offer.module.css';

class EditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: undefined,
      loading: false
    };
  }

  fetchRfoData = id => {
    this.props.fetchRfoToView(id);
  };

  fetchRfoIfNeeded = rfo => {
    if (!idEquals(rfo, this.props.match.params.id)) {
      this.fetchRfoData(this.props.match.params.id);
    }
  };

  componentDidMount() {
    this.fetchRfoIfNeeded(this.props.rfo);
    handlePrefills(this.props.offer, this.props.user, this.props.handleChange);
  }

  addSubService = service => {
    this.props.addSubService(service);
  };

  deleteSubService = service => {
    this.props.deleteSubService(service);
  };

  // Handles input field changes:
  handleChangeEvent = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.handleChange(name, value);

    if (!this.props.formHasChanges) {
      this.props.setOfferHasChanges();
    }
  };

  // Handles the service dropdown changes:
  handleServiceChangeEvent = event => {
    this.handleChangeEvent(event);
    if (event.target.name === 'serviceName') {
      this.props.deleteAllSubServices();
    }
  };

  handleMunicipalityChange = municipality => {
    if (municipality) {
      this.props.handleChange('locationCity', municipality);
    } else {
      this.props.handleChange('locationCity', undefined);
    }

    if (!this.props.formHasChanges) {
      this.props.setOfferHasChanges();
    }
  };

  handleMapLocation = location => {
    this.props.handleChange('mapLocation', location);
  };

  handleFileAddChange = fileAddFunction => data => {
    fileAddFunction(data);

    if (!this.props.formHasChanges) {
      this.props.setOfferHasChanges();
    }
  };

  submit = () => {
    this.setState({ loading: true });
    const isWasteRfo = isWaste(this.props.rfo);

    const postUrl = replace('{0}', this.props.match.params.id, CREATE_OFFER);
    const payload = offerStateToOfferPayload(
      this.props.match.params.id,
      this.props.offer,
      isWasteRfo
    );

    postJson(postUrl, payload)
      .then(res => {
        const offerGuid = res.data.id;

        addToastNotification(this.props.t('Lähetys onnistui.'), ToastTypes.SUCCESS);

        this.clearState();

        this.setState({ redirectTo: `${TARJOUKSET}/${offerGuid}`, loading: false });
      })
      .catch(err => {
        addToastNotification(this.props.t('Lähetys epäonnistui.'), ToastTypes.WARNING);
        this.setState({ loading: false });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    return this.submit();
  };

  clearState = () => {
    this.props.clearOfferForm();
    this.props.setOfferHasNotChanges();
  };

  componentWillUnmount = () => {
    this.clearState();
  };

  render() {
    const {
      rfo,
      addFiles,
      deleteFile,
      offer,
      services,
      isTouchDevice,
      formHasChanges,
      t
    } = this.props;
    const { redirectTo, loading } = this.state;

    const renderOwnRfoMessage = rfo => {
      return isWaste(rfo) ? (
        <h2>{t('Et voi tehdä tarjousta omaan ilmoitukseesi.')}</h2>
      ) : (
        <h2>{t('Et voi vastata omaan ilmoitukseesi.')}</h2>
      );
    };

    return (
      <>
        <Prompt
          when={formHasChanges}
          message={t(
            'Lomakkeen täyttö on kesken. Haluatko varmasti poistua lomakesivulta ja hukata täyttämäsi tiedot?'
          )}
        />

        <Header />
        <Navigation />

        <Container className={'flex-grow-1'}>
          <Row options={{ center: true }}>
            <Col span={8} sm={10} xs={12} className={styles.container}>
              {rfo && (
                <>
                  <PrivateComponent
                    doesNotBelongToBusiness={path(['company', 'businessId'], rfo)}
                    renderInstead={() => renderOwnRfoMessage(rfo)}
                  >
                    <Edit
                      isWasteRfo={isWaste(rfo)}
                      isTsvRfo={isTsv(rfo)}
                      offer={offer}
                      handleChange={this.handleChangeEvent}
                      handleServiceChange={this.handleServiceChangeEvent}
                      handleMunicipalityChange={this.handleMunicipalityChange}
                      handleMapLocation={this.handleMapLocation}
                      addFiles={this.handleFileAddChange(addFiles)}
                      deleteFile={deleteFile}
                      isTouchDevice={isTouchDevice}
                      rfoId={this.props.match.params.id}
                      handleSubmit={this.handleSubmit}
                      onSubServiceAdd={this.addSubService}
                      onSubServiceRemove={this.deleteSubService}
                      services={services}
                      getCurrentSubServices={getCurrentSubServices}
                      redirectTo={redirectTo}
                      loading={loading}
                    />

                    <ViewRfoContainer id={this.props.match.params.id} viewOnly={true} />
                  </PrivateComponent>
                </>
              )}
            </Col>
          </Row>
        </Container>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  rfo: state.rfoState.view.single.payload,
  loadingRfo: state.rfoState.status.loadingRfo,
  offer: state.offerState.form,
  user: state.userState.user,
  services: state.generalState.configurations.services,
  isTouchDevice: state.generalState.isTouchDevice,
  formHasChanges: state.offerState.status.formHasChanges
});

const mapDispatchToProps = dispatch => ({
  fetchRfoToView: id => dispatch(rfoOperations.fetchRfoToView(id)),
  handleChange: (key, value) => dispatch(offerOperations.handleOfferFormChange(key, value)),
  clearOfferForm: () => dispatch(offerOperations.clearOfferForm()),
  addSubService: service => dispatch(offerOperations.addSubService(service)),
  deleteSubService: service => dispatch(offerOperations.deleteSubService(service)),
  deleteAllSubServices: () => dispatch(offerOperations.deleteAllSubServices()),
  addFiles: files => dispatch(offerOperations.addFiles(files)),
  deleteFile: fileId => dispatch(offerOperations.deleteFile(fileId)),
  setOfferHasChanges: () => dispatch(offerOperations.setOfferHasChanges(true)),
  setOfferHasNotChanges: () => dispatch(offerOperations.setOfferHasChanges(false))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces()
)(EditContainer);
