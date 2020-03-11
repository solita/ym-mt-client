import React, { Component } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import cx from 'classnames';
import { Container, Row, Col } from '../Layout/Layout';
import { withNamespaces } from 'react-i18next';
import styles from './RfoSummary.module.css';
import MaterialOptionList from '../Material/MaterialOptionList';
import { compose, without, find, propEq } from 'ramda';
import { connect } from 'react-redux';
import { flattenServices } from '../../utils/service-utils';
import { getYearRange } from '../../utils/date-utils';
import qs from 'qs';
import Loader from '../Loader/Loader';
import ResultView from './TsvSummaryResultView';
import { getJsonData } from '../../services/ApiService';
import { FETCH_FACILITIES, FETCH_TSV_CONTRACT_SUMMARY } from '../../services/endpoints';
import withCancelToken from '../CancelToken/withCancelToken';

const initialSearchState = {
  classifications: [],
  service: [],
  year: '0',
  facilityBusinessIds: []
};

class TsvSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialSearchState,
      results: [],
      loading: false,
      loadingFacilities: true,
      facilityList: [],
      searchDone: false
    };
  }

  componentDidMount() {
    const config = {
      cancelToken: this.props.cancelTokenSource.token
    };
    getJsonData(FETCH_FACILITIES, config)
      .then(res => this.setState({ facilityList: res, loadingFacilities: false }))
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          this.setState({ loadingFacilities: false });
        }
      });
  }

  onSubmit = () => {
    let queryParams = {
      year: this.state.year,
      classifications: this.state.classifications,
      services: this.state.service,
      facilityBusinessIds: this.state.facilityBusinessIds
    };

    this.setState({
      loading: true,
      results: [],
      searchDone: true
    });

    const config = {
      params: queryParams,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
      cancelToken: this.props.cancelTokenSource.token
    };

    getJsonData(FETCH_TSV_CONTRACT_SUMMARY, config)
      .then(res => {
        this.setState({
          results: res,
          loading: false
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

  toggleSearchTerm = event => {
    const { target } = event;
    const { name, value } = target;
    this.updateSearchTerm(name, value);
  };

  deleteSearchTerm = name => value => {
    this.updateSearchTerm(name, value);
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

  facilitySearchTermsView = facilityIds =>
    facilityIds.map(facilityId => {
      const facility = find(propEq('businessId', facilityId))(this.state.facilityList);
      return (
        <button
          key={facility.id}
          type="button"
          className={'searchTerms__Button'}
          onClick={() => this.deleteSearchTerm('facilityBusinessIds')(facility.businessId)}
        >
          {facility.name}
          <span className={'searchTerms__Button__x'} aria-label={this.props.t('Poista hakuehto')}>
            &times;
          </span>
        </button>
      );
    });

  render() {
    const { t, services } = this.props;
    const {
      classifications,
      service,
      facilityBusinessIds,
      facilityList,
      year,
      searchDone
    } = this.state;
    const yearRange = getYearRange(2019, new Date());

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row options={{ center: true }}>
            <Col span={10} sm={12} xs={12}>
              <h1 className={cx('textCenter')}>
                {t('Tilastoja kunnan toissijaisesta jätehuoltopalvelusta tehdyistä sopimuksista')}
              </h1>
              <div className={cx('divider')} />
            </Col>
          </Row>

          <Row options={{ center: true }}>
            <Col span={10} sm={12} xs={12}>
              <div className={cx(styles.searchContainer)}>
                <Row className={cx(styles.verticalMargin1em)}>
                  <Col span={12} sm={12} xs={12}>
                    <h2 className={'textCenter'}>{t('Hae tietoja valitsemillasi rajauksilla')}</h2>
                  </Col>
                </Row>
                <form className={cx(styles.searchForm)}>
                  <Row className={cx(styles.verticalMargin1em)}>
                    <Col span={6} sm={6} xs={12}>
                      <label>
                        <span className={styles.defaultLabelSpan}>
                          <strong>{t('Jäte')}</strong>
                        </span>
                        <select name="classifications" value="" onChange={this.toggleSearchTerm}>
                          <option value="" disabled hidden>
                            {t('Valitse jäte')}
                          </option>
                          <MaterialOptionList includeWaste={true} includeMaterials={false} />
                        </select>
                      </label>
                      <div className={styles.searchTerms__Container}>
                        {this.searchTermsView('classifications', classifications)}
                      </div>
                    </Col>

                    <Col span={6} sm={6} xs={12}>
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
                    </Col>
                  </Row>

                  <Row className={cx(styles.verticalMargin1em)}>
                    <Col span={6} sm={6} xs={12}>
                      <Loader loading={this.state.loadingFacilities}>
                        <label>
                          <span className={styles.defaultLabelSpan}>
                            <strong>{t('Jätelaitos')}</strong>
                          </span>
                          <select
                            onChange={this.toggleSearchTerm}
                            name="facilityBusinessIds"
                            value=""
                          >
                            <option value="" disabled hidden>
                              {t('Valitse jätelaitos')}
                            </option>

                            {facilityList.map(facility => {
                              return (
                                <option key={facility.id} value={facility.businessId}>
                                  {facility.name}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                        <div className={styles.searchTerms__Container}>
                          {this.facilitySearchTermsView(facilityBusinessIds)}
                        </div>
                      </Loader>
                    </Col>
                    <Col span={6} sm={6} xs={12}>
                      <label>
                        <span className={styles.defaultLabelSpan}>
                          <strong>{t('Sopimuksen alkamisajankohta')}</strong>
                        </span>
                        <select onChange={this.handleChange} name="year" value={year}>
                          <option value="" disabled hidden>
                            {t('Valitse ajankohta')}
                          </option>
                          <option value="0">{t('Voimassa olevat sopimukset')}</option>
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
                <ResultView data={this.state.results} />
              </Loader>
              {searchDone &&
                !this.state.loading &&
                this.state.results &&
                this.state.results.length === 0 && (
                  <div className={styles.margin2emPaddingLeft10px}>{t('Ei hakutuloksia.')}</div>
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
  services: state.generalState.configurations.services
});

export default compose(
  withCancelToken,
  connect(mapStateToProps),
  withNamespaces()
)(TsvSummary);
