import React, { Component } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import cx from 'classnames';
import { Container, Row, Col } from '../Layout/Layout';
import { withNamespaces } from 'react-i18next';
import styles from './RfoSummary.module.css';
import MaterialOptionList from '../Material/MaterialOptionList';
import RegionSelect from '../RegionSelect/RegionSelect';
import { compose, without, prop, either, map } from 'ramda';
import { connect } from 'react-redux';
import { flattenServices } from '../../utils/service-utils';
import { getYearRange } from '../../utils/date-utils';
import qs from 'qs';
import { getJsonData } from '../../services/ApiService';
import { FETCH_RFO_SUMMARY } from '../../services/endpoints';
import Loader from '../Loader/Loader';
import { SEARCH_TYPES, MATERIAL_TYPES, CONTINUITY_TYPES } from './types';
import ResultView from './RfoSummaryResultView';
import withCancelToken from '../CancelToken/withCancelToken';

const initialSearchState = {
  materialType: MATERIAL_TYPES.WASTE,
  classifications: [],
  service: [],
  continuityType: CONTINUITY_TYPES.ALL,
  timePeriod: '',
  regions: []
};

class RfoSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: SEARCH_TYPES.OFFERING_MATERIALS,
      ...initialSearchState,
      results: {
        searchType: undefined,
        resultSet: []
      },
      loading: false
    };
  }

  onSubmit = () => {
    let queryParams = {
      searchType: this.state.searchType,
      year: this.state.timePeriod,
      locations: map(either(prop('id'), prop('regionId')), this.state.regions)
    };

    if (this.state.searchType === SEARCH_TYPES.OFFERING_MATERIALS) {
      queryParams = {
        ...queryParams,
        materialType: this.state.materialType,
        classifications: this.state.classifications,
        continuityType: this.state.continuityType
      };
    }

    if (
      (this.state.searchType === SEARCH_TYPES.OFFERING_MATERIALS &&
        this.state.materialType === MATERIAL_TYPES.WASTE) ||
      this.state.searchType === SEARCH_TYPES.OFFERING_SERVICES
    ) {
      queryParams = {
        ...queryParams,
        service: this.state.service
      };
    }

    if (this.state.searchType === SEARCH_TYPES.RECEIVING_MATERIALS) {
      queryParams = {
        ...queryParams,
        classifications: this.state.classifications
      };
    }

    this.setState({
      loading: true,
      results: {
        resultSet: [],
        searchType: this.state.searchType
      }
    });

    const config = {
      params: queryParams,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
      cancelToken: this.props.cancelTokenSource.token
    };

    getJsonData(FETCH_RFO_SUMMARY, config)
      .then(res => {
        this.setState({
          loading: false,
          results: {
            ...this.state.results,
            resultSet: res
          }
        });
      })
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          this.setState({ loading: false });
        }
      });
  };

  updateSearchTerm = (name, value) => {
    if (this.state[name].indexOf(value) > -1) {
      this.setState({ [name]: without([value], this.state[name]) });
    } else {
      this.setState({
        [name]: this.state[name].concat([value])
      });
    }
  };

  handleSearchTypeChange = event => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
      ...initialSearchState
    });
  };

  toggleSearchTerm = event => {
    const { target } = event;
    const { name, value } = target;
    this.updateSearchTerm(name, value);
  };

  deleteSearchTerm = name => value => {
    this.updateSearchTerm(name, value);
  };

  toggleRegion = region => {
    if (!region) {
      this.setState({
        regions: []
      });
    } else {
      this.updateSearchTerm('regions', region);
    }
  };

  handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  searchTermsView = (name, terms) =>
    terms.map(term => {
      return (
        <button
          key={term}
          type="button"
          className={'searchTerms__Button'}
          onClick={() => this.deleteSearchTerm(name)(term)}
        >
          {this.props.t(term)}
          <span className={'searchTerms__Button__x'} aria-label={this.props.t('Poista hakuehto')}>
            &times;
          </span>
        </button>
      );
    });

  render() {
    const { t, services } = this.props;
    const {
      regions,
      classifications,
      service,
      searchType,
      materialType,
      continuityType
    } = this.state;
    const yearRange = getYearRange(2019, new Date());

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row options={{ center: true }}>
            <Col span={10} sm={12} xs={12}>
              <h1 className={cx('textCenter')}>{t('Tilastoja ilmoituksista ja materiaaleista')}</h1>
              <div className={cx('divider')} />
            </Col>
          </Row>

          <Row options={{ center: true }}>
            <Col span={10} sm={12} xs={12}>
              <div className={cx(styles.searchContainer)}>
                <Row className={cx(styles.verticalMargin1em)}>
                  <Col span={12} sm={12} xs={12}>
                    <h2 className={'textCenter'}>{t('Hae ilmoitustyypin perusteella')}</h2>
                  </Col>
                </Row>
                <form className={cx(styles.searchForm)}>
                  <Row className={cx(styles.verticalMargin1em)}>
                    <Col span={4} sm={4} xs={12}>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="searchType"
                            value={SEARCH_TYPES.OFFERING_MATERIALS}
                            onChange={this.handleSearchTypeChange}
                            checked={searchType === SEARCH_TYPES.OFFERING_MATERIALS}
                          />
                          <span className={cx(styles.labelSpanAfterCheckbox)}>
                            {t('Tarjotut materiaalit')}
                          </span>
                        </label>
                      </div>
                      {searchType === SEARCH_TYPES.OFFERING_MATERIALS && (
                        <div className={styles.subRadioSelection}>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="materialType"
                                value={MATERIAL_TYPES.WASTE}
                                onChange={this.handleChange}
                                checked={materialType === MATERIAL_TYPES.WASTE}
                              />
                              <span className={cx(styles.labelSpanAfterCheckbox)}>
                                {t('Vain jätteet')}
                              </span>
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="materialType"
                                value={MATERIAL_TYPES.MATERIAL}
                                onChange={this.handleChange}
                                checked={materialType === MATERIAL_TYPES.MATERIAL}
                              />
                              <span className={cx(styles.labelSpanAfterCheckbox)}>
                                {t('Vain muut materiaalit ja sivuvirrat')}
                              </span>
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="materialType"
                                value={MATERIAL_TYPES.ALL}
                                onChange={this.handleChange}
                                checked={materialType === MATERIAL_TYPES.ALL}
                              />
                              <span className={cx(styles.labelSpanAfterCheckbox)}>
                                {t('Kaikki')}
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col span={4} sm={4} xs={12}>
                      <label>
                        <input
                          type="radio"
                          name="searchType"
                          value={SEARCH_TYPES.RECEIVING_MATERIALS}
                          onChange={this.handleSearchTypeChange}
                          checked={searchType === SEARCH_TYPES.RECEIVING_MATERIALS}
                        />
                        <span className={cx(styles.labelSpanAfterCheckbox)}>
                          {t('Etsityt materiaalit')}
                        </span>
                      </label>
                    </Col>
                    <Col span={4} sm={4} xs={12}>
                      <label>
                        <input
                          type="radio"
                          name="searchType"
                          value={SEARCH_TYPES.OFFERING_SERVICES}
                          onChange={this.handleSearchTypeChange}
                          checked={searchType === SEARCH_TYPES.OFFERING_SERVICES}
                        />
                        <span className={cx(styles.labelSpanAfterCheckbox)}>
                          {t('Tarjotut palvelut')}
                        </span>
                      </label>
                    </Col>
                  </Row>

                  <Row className={cx(styles.verticalMargin1em)}>
                    <Col span={6} sm={6} xs={12}>
                      {searchType !== SEARCH_TYPES.OFFERING_SERVICES && (
                        <>
                          <label>
                            <span className={styles.defaultLabelSpan}>
                              <strong>{t('Materiaali')}</strong>
                            </span>
                            <select
                              name="classifications"
                              value=""
                              onChange={this.toggleSearchTerm}
                            >
                              <option value="" disabled hidden>
                                {t('Valitse materiaali')}
                              </option>
                              <MaterialOptionList includeWaste={true} includeMaterials={true} />
                            </select>
                          </label>
                          <div className={styles.searchTerms__Container}>
                            {this.searchTermsView('classifications', classifications)}
                          </div>
                        </>
                      )}
                    </Col>

                    <Col span={6} sm={6} xs={12}>
                      {((searchType === SEARCH_TYPES.OFFERING_MATERIALS &&
                        materialType === MATERIAL_TYPES.WASTE) ||
                        searchType === SEARCH_TYPES.OFFERING_SERVICES) && (
                        <>
                          <label>
                            <span className={styles.defaultLabelSpan}>
                              <strong>{t('Palvelu')}</strong>
                            </span>
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
                          <div className={styles.searchTerms__Container}>
                            {this.searchTermsView('service', service)}
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row className={cx(styles.verticalMargin1em)}>
                    <Col span={3} sm={4} xs={12}>
                      {searchType === SEARCH_TYPES.OFFERING_MATERIALS && (
                        <>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="continuityType"
                                value={CONTINUITY_TYPES.ONETIME}
                                onChange={this.handleChange}
                                checked={continuityType === CONTINUITY_TYPES.ONETIME}
                              />
                              <span className={cx(styles.labelSpanAfterCheckbox)}>
                                {t('Kertaerä')}
                              </span>
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="continuityType"
                                value={CONTINUITY_TYPES.CONTINUOUS}
                                onChange={this.handleChange}
                                checked={continuityType === CONTINUITY_TYPES.CONTINUOUS}
                              />
                              <span className={cx(styles.labelSpanAfterCheckbox)}>
                                {t('Jatkuva')}
                              </span>
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="continuityType"
                                value={CONTINUITY_TYPES.ALL}
                                onChange={this.handleChange}
                                checked={continuityType === CONTINUITY_TYPES.ALL}
                              />
                              <span className={cx(styles.labelSpanAfterCheckbox)}>
                                {t('Kaikki')}
                              </span>
                            </label>
                          </div>
                        </>
                      )}
                    </Col>
                    <Col span={3} sm={4} xs={12} />
                    <Col span={3} sm={1} xs={12} />
                    <Col span={3} sm={3} xs={12} />
                  </Row>

                  <Row className={cx(styles.verticalMargin1em)}>
                    <Col span={6} sm={6} xs={12}>
                      <label>
                        <span className={styles.defaultLabelSpan}>
                          <strong>{t('Sijainti')}</strong>
                        </span>
                        <RegionSelect
                          handleChange={this.toggleRegion}
                          onRemove={this.toggleRegion}
                          value={regions}
                          single={
                            this.state.searchType === SEARCH_TYPES.OFFERING_SERVICES ||
                            this.state.searchType === SEARCH_TYPES.RECEIVING_MATERIALS
                          }
                        />
                      </label>
                    </Col>
                    <Col span={6} sm={6} xs={12}>
                      <label>
                        <span className={styles.defaultLabelSpan}>
                          <strong>{t('Ajankohta')}</strong>
                        </span>
                        <select
                          onChange={this.handleChange}
                          name="timePeriod"
                          value={this.state.timePeriod}
                        >
                          <option value="" disabled hidden>
                            {t('Valitse ajankohta')}
                          </option>
                          <option value="0">{t('Voimassa olevat')}</option>
                          {yearRange.map(year => {
                            return (
                              <option key={year.toString()} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    </Col>
                  </Row>
                  <Row options={{ center: true }}>
                    <Col span={3} sm={4} xs={8} className={styles.centerInlineChildren}>
                      <button type="button" className={cx('buttonStyle')} onClick={this.onSubmit}>
                        {t('Hae tiedot')}
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
          <Row options={{ center: true }}>
            <Col span={10} sm={12} xs={12}>
              <Loader loading={this.state.loading}>
                {this.state.results.resultSet.length > 0 && (
                  <ResultView
                    searchType={this.state.results.searchType}
                    data={this.state.results.resultSet}
                  />
                )}
                {!this.state.loading &&
                  this.state.results.searchType &&
                  this.state.results.resultSet.length === 0 && (
                    <div className={styles.margin2emPaddingLeft10px}>{t('Ei hakutuloksia.')}</div>
                  )}
              </Loader>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  services: state.generalState.configurations.services
});

export default compose(
  withCancelToken,
  connect(mapStateToProps),
  withNamespaces()
)(RfoSummary);
