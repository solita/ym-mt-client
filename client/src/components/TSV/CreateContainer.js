import cx from 'classnames';
import { compose, path } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getJsonData, postJson } from '../../services/ApiService';
import { SUBMIT_TSV_REQUEST } from '../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { tsvOperations } from '../../state/ducks/tsv';
import { countDistance } from '../../utils/map-utils';
import { handlePrefills } from '../../utils/user-utils';
import PrivateComponent from '../Auth/PrivateComponent';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Navigation from '../Navigation/Navigation';
import ViewRfoContainer from '../RequestForOffer/ViewContainer';
import Loader from './../Loader/Loader';
import Create from './Create';
import styles from './Tsv.module.css';
import { TSV_PYYNNOT } from '../../routes';

const succesfulReceiveMessage = (t, styles) => (
  <h1 className={styles.mainHeading}>{t('TSV-pyyntö vastaanotettu!')}</h1>
);

export const sortFacilities = (facilities, order) => {
  switch (order) {
    case 'facility_name':
      return facilities.sort(sortByFacilityName);
    case 'municipality_name':
      return facilities.sort(sortByMunicipalityName);
    case 'distance':
      return facilities.sort(sortByDistance);
    default:
      return;
  }
};

const sortByDistance = (a, b) => {
  if (Number.isInteger(a.distance) && Number.isInteger(b.distance)) {
    return a.distance - b.distance;
  } else if (!Number.isInteger(a.distance) && Number.isInteger(b.distance)) {
    return 1;
  } else if (Number.isInteger(a.distance) && !Number.isInteger(b.distance)) {
    return -1;
  } else {
    return 0;
  }
};

const sortByMunicipalityName = (a, b) => {
  if (a.address.city < b.address.city) {
    return -1;
  }
  if (a.address.city > b.address.city) {
    return 1;
  }
  return 0;
};

const sortByFacilityName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const showRfo = rfoAndOffers => (
  <>
    <div className="divider" />
    <ViewRfoContainer rfoToShow={rfoAndOffers.rfo} id={rfoAndOffers.rfo.id} viewOnly={true} />
  </>
);

class CreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: undefined,
      submitted: false,
      loading: false,
      facilitySortOrder: 'distance',
      facilitiesWithDistance: []
    };
  }

  getFacilityData = () => {
    const fetchUrl = `/api/tsv/facilities`;
    return getJsonData(fetchUrl);
  };

  prepareFacilitiesData = rfoData => {
    const rfoLocations = path(
      ['payload', 'rfo', 'materials', 0, 'location', 'coordinates'],
      rfoData
    );
    const rfoLocation =
      rfoLocations && rfoLocations.filter(coordinates => coordinates.type === 'WGS84');
    const rfoLon = path([0, 'lon'], rfoLocation);
    const rfoLat = path([0, 'lat'], rfoLocation);

    this.setState({
      facilitiesWithDistance: this.props.facilities
        .map(this.countDistanceForFacilities(rfoLat, rfoLon))
        .sort(sortFacilities)
    });
  };

  componentDidMount() {
    Promise.all([
      this.getFacilityData(),
      this.props.fetchTsvNeededData(this.props.match.params.id)
    ]).then(data => {
      this.props.populateFacilities(data[0]);
      this.prepareFacilitiesData(data[1]);
    });

    handlePrefills(this.props.form, this.props.user, this.props.handleChange);
  }

  // Handles input field changes:
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.handleChange(name, value);

    if (!this.props.formHasChanges) {
      this.props.setTsvHasChanges();
    }
  };

  handleFacilitySortChange = changeEvent => {
    changeEvent.preventDefault();
    this.setState({
      facilitySortOrder: changeEvent.target.id
    });
  };

  countDistanceForFacilities = (rfoLat, rfoLon) => {
    return facility => {
      const companyLocations = path(['address', 'coordinates'], facility);
      const companyLocation = companyLocations.filter(company => company.type === 'WGS84');
      const companyLat = path([0, 'lat'], companyLocation);
      const companyLon = path([0, 'lon'], companyLocation);
      facility.distance = countDistance(companyLat, companyLon, rfoLat, rfoLon);
      return facility;
    };
  };

  submit = () => {
    const postUrl = SUBMIT_TSV_REQUEST;
    const payload = {
      rfoId: this.props.match.params.id,
      facilityId: this.props.form.facility,
      requestText: this.props.form.requestText,
      requestContactName: this.props.form.contact_name,
      requestContactTitle: this.props.form.contact_title,
      requestContactPhone: this.props.form.contact_phone,
      requestContactEmail: this.props.form.contact_email
    };

    postJson(postUrl, payload)
      .then(res => {
        const redirectUrl = TSV_PYYNNOT + '/' + res.data.id;

        addToastNotification(this.props.t('Pyyntö lähetetty.'), ToastTypes.SUCCESS);

        this.props.clearTsv();

        this.setState({ loading: false, submitted: true, redirectTo: redirectUrl });
      })
      .catch(err => {
        addToastNotification(this.props.t('Pyynnön lähetys epäonnistui.'), ToastTypes.WARNING);

        this.setState({ loading: false });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    return this.submit();
  };

  componentWillUnmount = () => {
    this.props.clearTsv();
  };

  render() {
    const { t, form, rfoAndOffers, formHasChanges } = this.props;
    const { submitted, redirectTo, facilitySortOrder, loading } = this.state;

    const sortButtons = [
      { id: 'distance', name: t('Lähin ensin') },
      { id: 'facility_name', name: t('Jätelaitoksen nimi A-Ö') },
      { id: 'municipality_name', name: t('Kunnan nimi A-Ö') }
    ];

    const facilitiesWithDistance = sortFacilities(
      this.state.facilitiesWithDistance,
      this.state.facilitySortOrder
    );

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
        <Container className={cx('flex-grow-1')}>
          <Row options={{ center: true }}>
            <Col span={8} sm={10} xs={12} className={styles.container}>
              {!path(['rfo'])(rfoAndOffers) ? (
                <Loader loading={true} />
              ) : (
                <>
                  <PrivateComponent
                    belongsToBusiness={path(['rfo', 'company', 'businessId'])(rfoAndOffers)}
                    renderInstead={() => <h1>{t('Ei oikeuksia nähdä tätä sivua.')}</h1>}
                  >
                    {!submitted && rfoAndOffers && (
                      <Create
                        tsv={form}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        handleFacilitySortChange={this.handleFacilitySortChange}
                        facilitiesWithDistance={facilitiesWithDistance}
                        facilitySortOrder={facilitySortOrder}
                        sortButtons={sortButtons}
                        rfoId={this.props.match.params.id}
                        rfoAndOffers={rfoAndOffers}
                        loading={loading}
                      />
                    )}

                    {submitted && succesfulReceiveMessage(t, styles)}

                    {showRfo(rfoAndOffers)}
                  </PrivateComponent>
                </>
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
  form: state.tsvState.form,
  user: state.userState.user,
  rfoAndOffers: state.tsvState.general.data,
  facilities: state.tsvState.general.facilities,
  formHasChanges: state.tsvState.status.formHasChanges
});

const mapDispatchToProps = dispatch => ({
  handleChange: (key, value) => dispatch(tsvOperations.handleTsvFormChange(key, value)),
  clearTsv: () => dispatch(tsvOperations.clearTsv()),
  populateFacilities: fs => dispatch(tsvOperations.populateFacilities(fs)),
  fetchTsvNeededData: rfoId => dispatch(tsvOperations.fetchTsvNeededData(rfoId)),
  setTsvHasChanges: () => dispatch(tsvOperations.setTsvHasChanges(true)),
  setTsvHasNotChanges: () => dispatch(tsvOperations.setTsvHasChanges(false))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(CreateContainer);
