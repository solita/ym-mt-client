import React, { Component } from 'react';
import { compose } from 'ramda';
import styles from './Search.module.css';
import formStyles from '../Layout/Form.module.css';
import cx from 'classnames';
import { withNamespaces } from 'react-i18next';
import { flattenServices } from '../../utils/service-utils';
import RegionSelect from '../RegionSelect/RegionSelect';
import { connect } from 'react-redux';
import { searchOperations } from '../../state/ducks/search';
import { rfoOperations } from '../../state/ducks/rfo';
import MaterialOptionList from '../Material/MaterialOptionList';
import AddSavedSearch from './AddSavedSearch';
import SavedSearches from './SavedSearches';
import PrivateComponent from '../Auth/PrivateComponent';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSaveSearchForm: false
    };
  }

  fetchRfos = () => {
    const params = {
      text: this.props.searchState.text,
      location: this.props.searchState.location.map(f => f.id || f.regionId),
      rfoType: this.props.searchState.rfoType,
      service: this.props.searchState.service,
      classification: this.props.searchState.classification
    };
    this.props.fetchRfosWithParamas(params);
  };

  componentDidMount() {
    this.fetchRfos();
  }

  handleTextSearch = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.handleGenericChange(name, value);
  };

  addRegion = region => {
    this.props.toggleSearchTerm('location', region);
  };

  deleteRegion = region => {
    this.props.deleteSearchTerm('location', region);
  };

  deleteSearchTerm = (term, value) => {
    this.props.deleteSearchTerm(term, value);
  };

  isSelected = (term, value) => this.props.searchState[term].indexOf(value) > -1;

  toggleSearchTerm = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.toggleSearchTerm(name, value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchRfos();
  };

  hasSearchTerms = () => {
    return (
      this.props.searchState.text ||
      (Array.isArray(this.props.searchState.rfoType) && this.props.searchState.rfoType.length) ||
      (Array.isArray(this.props.searchState.classification) &&
        this.props.searchState.classification.length) ||
      (Array.isArray(this.props.searchState.service) && this.props.searchState.service.length) ||
      (Array.isArray(this.props.searchState.location) && this.props.searchState.location.length)
    );
  };

  showSaveSearchFrom = () => {
    this.setState({ showSaveSearchForm: true });
  };

  handleSavedSearchDone = res => {
    this.setState({ showSaveSearchForm: false });
  };

  render() {
    const { t, searchState, services } = this.props;

    return (
      <div className={styles.searchContainer}>
        <form className={styles.searchForm}>
          <div>
            <div className={styles.searchBar}>
              <label>
                <h3>{t('Hae ilmoituksia')}</h3>
                <input
                  className={styles.searchBar__input}
                  type="text"
                  onChange={this.handleTextSearch}
                  name="text"
                  value={searchState.text}
                  placeholder={t('Hae ilmoituksia')}
                />
              </label>
            </div>
          </div>
          <div>
            <h3>{t('Hae ilmoituksia joissa...')}</h3>
            <div className={formStyles.formRowHorizontal}>
              <div className={cx(formStyles.formInputContainer, formStyles.widthQuarter)}>
                <input
                  className="checkboxInput"
                  type="checkbox"
                  name="rfoType"
                  id="offeringWaste"
                  value="offeringWaste"
                  checked={this.isSelected('rfoType', 'offeringWaste')}
                  onChange={this.toggleSearchTerm}
                />
                <label className="checkboxLabel" htmlFor="offeringWaste">
                  {t('offeringWaste-title')}
                </label>
              </div>
              <div className={cx(formStyles.formInputContainer, formStyles.widthQuarter)}>
                <input
                  className="checkboxInput"
                  type="checkbox"
                  name="rfoType"
                  id="offeringMaterial"
                  value="offeringMaterial"
                  checked={this.isSelected('rfoType', 'offeringMaterial')}
                  onChange={this.toggleSearchTerm}
                />
                <label className="checkboxLabel" htmlFor="offeringMaterial">
                  {t('tarjotaan sivuvirtaa')}
                </label>
              </div>
              <div className={cx(formStyles.formInputContainer, formStyles.widthQuarter)}>
                <input
                  className="checkboxInput"
                  type="checkbox"
                  name="rfoType"
                  id="receivingMaterial"
                  value="receivingMaterial"
                  checked={this.isSelected('rfoType', 'receivingMaterial')}
                  onChange={this.toggleSearchTerm}
                />
                <label className="checkboxLabel" htmlFor="receivingMaterial">
                  {t('receivingMaterial-title')}
                </label>
              </div>
              <div className={cx(formStyles.formInputContainer, formStyles.widthQuarter)}>
                <input
                  className="checkboxInput"
                  type="checkbox"
                  name="rfoType"
                  id="offeringServices"
                  value="offeringServices"
                  checked={this.isSelected('rfoType', 'offeringServices')}
                  onChange={this.toggleSearchTerm}
                />
                <label className="checkboxLabel" htmlFor="offeringServices">
                  {t('offeringServices-title')}
                </label>
              </div>
            </div>
          </div>
          <div className={formStyles.formRowHorizontal}>
            <div className={cx(formStyles.formInputContainer, formStyles.widthOneThird)}>
              <div>
                <label>
                  <strong className={styles.selectLabel}>{t('Materiaali')}</strong>
                  <select name="classification" value="" onChange={this.toggleSearchTerm}>
                    <option value="" disabled hidden>
                      {t('Valitse materiaali')}
                    </option>
                    <MaterialOptionList includeWaste={true} includeMaterials={true} />
                  </select>
                </label>
              </div>
              <div className={styles.searchTerms__Container}>
                {searchState.classification.map(classification => {
                  return (
                    <button
                      key={classification}
                      type="button"
                      className={'searchTerms__Button'}
                      onClick={() => this.deleteSearchTerm('classification', classification)}
                    >
                      {t(classification)}
                      <span className={'searchTerms__Button__x'} aria-label={t('Poista hakuehto')}>
                        &times;
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={cx(formStyles.formInputContainer, formStyles.widthOneThird)}>
              <div>
                <label>
                  <strong className={styles.selectLabel}>{t('Palvelu')}</strong>
                  <select onChange={this.toggleSearchTerm} name="service" value="">
                    <option value="" disabled hidden>
                      {t('Valitse palvelu')}
                    </option>

                    {flattenServices(services).map((serviceGroup, i) => {
                      return (
                        <optgroup key={`serviceGroup-${i}`} label="---">
                          {serviceGroup.map((service, idx) => {
                            return (
                              <option key={service.id} value={service.id}>
                                {t(service.id)}
                              </option>
                            );
                          })}
                        </optgroup>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className={styles.searchTerms__Container}>
                {searchState.service.map(service => {
                  return (
                    <button
                      key={service}
                      type="button"
                      className={'searchTerms__Button'}
                      onClick={() => this.deleteSearchTerm('service', service)}
                    >
                      {t(service)}
                      <span className={'searchTerms__Button__x'} aria-label={t('Poista hakuehto')}>
                        &times;
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={cx(formStyles.formInputContainer, formStyles.widthOneThird)}>
              <div>
                <label>
                  <strong className={styles.selectLabel}>{t('Sijainti')}</strong>
                  <RegionSelect
                    handleChange={this.addRegion}
                    onRemove={this.deleteRegion}
                    value={searchState.location}
                  />
                </label>
              </div>
              {/* <div className={styles.searchTerms__Container}>
                {searchState.location.map(location => {
                  return (
                    <button
                      key={location}
                      type="button"
                      className={styles.searchTerms__Button}
                      onClick={() => this.deleteSearchTerm('location', location)}
                    >
                      {location}
                      <span
                        className={styles.searchTerms__Button__x}
                        aria-label={t('Poista hakuehto')}
                      >
                        &times;
                      </span>
                    </button>
                  );
                })}
              </div> */}
            </div>
            <PrivateComponent>
              <SavedSearches t={t} />
            </PrivateComponent>
          </div>

          <div className={'divider'} />
          <div className={styles.searchContainer__controls}>
            <PrivateComponent>
              <button
                className={styles.searchControls__saveSearch}
                type="button"
                disabled={!this.hasSearchTerms()}
                onClick={this.showSaveSearchFrom}
              >
                {t('Tallenna hakuvahdiksi')}
              </button>
            </PrivateComponent>
            <button
              className={styles.searchControls__search}
              type="submit"
              onClick={this.handleSubmit}
            >
              {t('Hae ilmoituksia')}
            </button>
          </div>
        </form>
        <div>
          {this.props.searchState && this.state.showSaveSearchForm && (
            <AddSavedSearch
              search={this.props.searchState}
              t={t}
              done={this.handleSavedSearchDone}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchState: state.searchState,
  services: state.generalState.configurations.services
});
const mapDispatchToProps = dispatch => ({
  addSearchTerm: (term, value) => dispatch(searchOperations.addSearchTerm(term, value)),
  deleteSearchTerm: (term, value) => dispatch(searchOperations.deleteSearchTerm(term, value)),
  toggleSearchTerm: (term, value) => dispatch(searchOperations.toggleSearchTerm(term, value)),
  handleGenericChange: (key, value) => dispatch(searchOperations.handleGenericChange(key, value)),
  fetchRfosWithParamas: params => dispatch(rfoOperations.fetchRfos(params))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(Search);
