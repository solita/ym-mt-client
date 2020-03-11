import React, { PureComponent } from 'react';
import RegionSelect from '../RegionSelect/RegionSelect';
import Map from '../Map/Map';
import cx from 'classnames';
import formStyles from '../Layout/Form.module.css';
import { Row, Col } from '../Layout/Layout';
import { withNamespaces } from 'react-i18next';
import { assocPath, path, assoc, head } from 'ramda';

class Location extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapState: {
        searchTerm: '',
        markers: []
      },
      possibleLocations: [],
      mapActive: false
    };
  }

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    const prevCity = path(['rfo', 'locationCity', 'nameFi'])(prevProps);
    const currentCity = path(['rfo', 'locationCity', 'nameFi'])(this.props);
    if (prevCity !== currentCity) {
      this.search();
    }
  }

  onSearchResult = ({ result }) => {
    if (result && Array.isArray(result.locations)) {
      const { locations } = result;
      this.setSearchResult(head(locations));
      this.setState({ possibleLocations: locations });
    }
  };

  setSearchResult = location => {
    let locationWithId, newLocations;
    if (location) {
      locationWithId = assoc('id', 'createIlmoitusMap', location);
      newLocations = [locationWithId];
    } else {
      newLocations = [];
    }
    const newState = assocPath(['mapState', 'markers'], newLocations, this.state);
    newState.possibleLocations = [];
    newState.currentMapLocation = location;

    this.setState(newState);
    this.props.handleMapLocation(location);
  };

  onMarkerDraw = result => {
    const newState = assocPath(['mapState', 'markerIds'], result, this.state);
    this.setState(newState);
  };

  handleMunicipalityLocally = municipality => {
    this.props.handleMunicipality(municipality);
  };

  handleStreetAddressBlur = () => {
    this.search();
  };

  search = () => {
    const { rfo } = this.props;
    const streetAddress = rfo.locationStreetAddress || '';
    const city = path(['locationCity', 'nameFi'])(rfo) || '';

    let newState = { ...this.state };
    if (streetAddress || city) {
      newState = assocPath(['mapState', 'searchTerm'], `${streetAddress} ${city}`)(newState);
      newState = assoc('mapActive', true)(newState);
    }

    if (!streetAddress && !city) {
      newState = assocPath(['mapState', 'searchTerm'], '')(newState);
      newState = assocPath(['mapState', 'markers'], [])(newState);
      newState = assoc('possibleLocations', [])(newState);
      newState = assoc('mapActive', false)(newState);
      this.props.handleMapLocation(undefined);
    }

    this.setState(newState);
  };

  render() {
    const { handleChange, rfo, t } = this.props;

    return (
      <div className={'qa-location-selector'}>
        <Row className={cx(formStyles.formRow)}>
          <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
            <label>
              <span className={formStyles.defaultLabelSpan}>{t('Katuosoite')}</span>
              <input
                type="text"
                name="locationStreetAddress"
                onBlur={this.handleStreetAddressBlur}
                autoComplete="materiaaliTori-loc-add"
                value={rfo.locationStreetAddress || ''}
                onChange={handleChange}
              />
            </label>
          </Col>
        </Row>
        <Row className={formStyles.formRow}>
          <Col span={4} sm={4} xs={4} className={cx(formStyles.formInputContainer)}>
            <label>
              <span className={formStyles.defaultLabelSpan}>{t('Postinumero')}</span>
              <input
                type="text"
                name="locationPostalCode"
                autoComplete="materiaaliTori-loc-pc"
                value={rfo.locationPostalCode || ''}
                onChange={handleChange}
              />
            </label>
          </Col>
          <Col span={8} sm={8} xs={8} className={cx(formStyles.formInputContainer)}>
            <label>
              <span className={formStyles.defaultLabelSpan}>{t('Kunta')}</span>{' '}
              <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
              <RegionSelect
                handleChange={this.handleMunicipalityLocally}
                single={true}
                municipalitiesOnly={true}
                value={rfo.locationCity ? [rfo.locationCity] : []}
                onRemove={() => this.handleMunicipalityLocally(undefined)}
              />
            </label>
          </Col>
        </Row>

        <Row className={formStyles.formRow}>
          <Col span={4} sm={4} xs={12} className={formStyles.formInputContainer}>
            <button onClick={this.search} type="button">
              {t('Hae osoite kartalle')}
            </button>
          </Col>
        </Row>
        <Row className={formStyles.formRow}>
          <Col span={12} sm={12} xs={12}>
            {this.state.mapActive && this.state.possibleLocations.length === 0 && (
              <div className={cx(formStyles.formWarning)}>
                <span>
                  {t(
                    'Antamallasi osoitteella ei löydy sijaintia. Tarkenna osoitetietoja ja tarkista että esimerkiksi kadunnimi on kirjoitettu täsmälleen oikein. Laita katuosoitteeseen kadun nimen lisäksi vain katunumero - älä laita talon/rapun kirjaintunnuksia ym.'
                  )}{' '}
                </span>
              </div>
            )}
            {this.state.mapActive && this.state.possibleLocations.length > 1 && (
              <div className={cx(formStyles.formWarning)}>
                <span>{t('Hakusi antoi useita sijainteja ja nyt näytetään osoite:')} </span>
                <span>
                  <strong>
                    {this.state.currentMapLocation.name}, {this.state.currentMapLocation.village}
                  </strong>
                  {'. '}
                </span>
                <span>
                  {t(
                    'Jos tämä sijainti ei vastaa hakuasi: tarkenna osoitetietoa lisäämällä esimerkiksi kadun numero ja varmista että kadun nimi on kirjoitetty täsmälleen oikein. Laita katuosoitteeseen kadun nimen lisäksi vain katunumero - älä laita talon/rapun kirjaintunnuksia ym.'
                  )}
                </span>
              </div>
            )}

            {this.state.mapActive && this.state.possibleLocations.length === 1 && (
              <div className={cx(formStyles.formWarning)}>
                <span>{t('Kartalle valittu osoite:')} </span>
                <span>
                  <strong>
                    {this.state.currentMapLocation.name}, {this.state.currentMapLocation.village}{' '}
                  </strong>
                </span>
              </div>
            )}
          </Col>
        </Row>
        <Row
          className={cx(formStyles.formRow)}
          style={
            this.state.mapActive
              ? { width: '100%', height: '20em' }
              : { display: 'block', width: '0px', height: '0px' }
          }
        >
          <Map
            mapState={this.state.mapState}
            onSearchResult={this.onSearchResult}
            onMarkerDraw={this.onMarkerDraw}
          />
        </Row>
      </div>
    );
  }
}

export default withNamespaces()(Location);
