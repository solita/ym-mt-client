import cx from 'classnames';
import qs from 'qs';
import { compose, has } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { getRaw } from '../../services/ApiService';
import { FETCH_TSV_REQUESTS } from '../../services/endpoints';
import { isPublicOfficer, publicOfficerFacilities } from '../../state/ducks/user/selectors';
import commonStyles from '../../styles/common.module.css';
import { Col, Row } from '../Layout/Layout';
import MaterialOptionList from '../Material/MaterialOptionList';
import searchStyles from '../Search/Search.module.css';
import { searchStateTranslated } from './tsv-utils';
import withCancelToken from '../CancelToken/withCancelToken';

class TsvSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      continuationToken: '',
      classification: '',
      statuses: [],
      text: '',
      facilityIds: [], // array contains only one facility business id per time, or is empty, which means them all (but an array is required by the backend)
      facilities: []
    };

    this.searchStatuses = props.contractStatuses;
    this.fetchUrl = FETCH_TSV_REQUESTS;
    this.searchParamsOverride = Object.assign(
      {},
      props.searchParamsOverride,
      has('onlyContractStatuses', this.props)
        ? { withOrWithoutContract: props.onlyContractStatuses }
        : {}
    );
  }

  componentDidMount() {
    this.getTsvRequests({ pagesize: 25 });
    this.getFacilityData();
  }

  getFacilityData = () => {
    const publicOfficersFacilities = publicOfficerFacilities(this.props.user);
    this.setState({ facilities: publicOfficersFacilities });
  };

  getTsvRequests = ({
    continuationToken = '',
    pagesize = 25,
    classification = '',
    statuses = [],
    text = '',
    facilityIds = []
  }) => {
    this.setState({ loading: true });

    const queryParams = Object.assign(
      {
        pagesize: pagesize,
        continuationToken: continuationToken,
        classification: classification,
        state: statuses,
        text: text,
        facilityIds: facilityIds
      },
      this.searchParamsOverride
    );

    const config = {
      params: queryParams,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
      cancelToken: this.props.cancelTokenSource.token
    };

    getRaw(this.fetchUrl, config)
      .then(response => {
        const { headers, data } = response;
        const results = !continuationToken ? data : this.state.results.concat(data);
        this.setState({
          continuationToken: headers['tietoalusta-continuation-token'],
          results,
          loading: false
        });
      })
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          this.setState({ loading: false });
        }
      });
  };

  onChange = event => {
    const { target } = event;
    const { name, value } = target;

    this.setState({ [name]: value, continuationToken: '' });
  };

  onFacilityChange = event => {
    const { target } = event;
    const { name, value } = target;

    const convertedToArray = value === '' ? [] : [value];

    this.setState({ [name]: convertedToArray, continuationToken: '' });
  };

  onCheckboxArrayChange = event => {
    const { target } = event;
    const { name, value } = target;
    let val = this.state[name] || [];
    if (target.checked) {
      val.push(value);
    } else {
      val = val.filter(f => f !== value);
    }
    this.setState({ [name]: val, continuationToken: '' });
  };

  filterRequest = _ => {
    this.getTsvRequests({
      classification: this.state.classification,
      statuses: this.state.statuses,
      text: this.state.text,
      continuationToken: '',
      facilityIds: this.state.facilityIds
    });
  };

  renderSearch = t => {
    const userIsPublicOfficer = isPublicOfficer(this.props.user);
    const { facilities } = this.state;

    return (
      <Row className={cx(searchStyles.searchContainer)}>
        <Col span={12}>
          <Row options={{ center: true }}>
            <Col span={6} sm={6} xs={12}>
              <div className={commonStyles.mediumVerticalMargin}>
                <label>
                  <strong>{`${t('Hae jätteen mukaan')}:`}</strong>
                  <select
                    onChange={this.onChange}
                    name="classification"
                    value={this.state.classification}
                  >
                    <option value="">{t('Kaikki')}</option>
                    <MaterialOptionList includeWaste={true} />
                  </select>
                </label>
              </div>
            </Col>
          </Row>
          {userIsPublicOfficer && (
            <Row options={{ center: true }}>
              <Col span={6} sm={6} xs={12}>
                <div className={commonStyles.mediumVerticalMargin}>
                  <label>
                    <strong>{`${t('Hae jätelaitoksen mukaan')}:`}</strong>
                    <select
                      onChange={this.onFacilityChange}
                      name="facilityIds"
                      value={this.state.facilityIds.toString()}
                    >
                      <option value="">{t('Kaikki')}</option>
                      {facilities.map(facility => {
                        return (
                          <option key={facility.businessId} value={facility.businessId}>
                            {facility.name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              </Col>
            </Row>
          )}
          <Row options={{ center: true }}>
            <Col span={6} sm={6} xs={12}>
              <div className={commonStyles.mediumVerticalMargin}>
                <strong>{`${t('Hae tilan mukaan')}:`}</strong>
                {this.searchStatuses.map(state => {
                  return (
                    <div key={state}>
                      <input
                        className="checkboxInput"
                        id={state}
                        type="checkbox"
                        name="statuses"
                        value={state}
                        onChange={this.onCheckboxArrayChange}
                      />
                      <label htmlFor={state} className="checkboxLabel">
                        {searchStateTranslated(t, state)}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
          <Row options={{ center: true }}>
            <Col span={6} sm={6} xs={12}>
              <div className={commonStyles.mediumVerticalMargin}>
                <div className={searchStyles.searchBar}>
                  <input
                    className={searchStyles.searchBar__input}
                    type="text"
                    onChange={this.onChange}
                    name="text"
                    value={this.state.text}
                    placeholder={t('Hae nimellä, y-tunnuksella ja muulla sisällöllä...')}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row options={{ center: true }}>
            <Col span={2} sm={4} xs={12} className={commonStyles.alignEnd}>
              <div className={commonStyles.mediumVerticalMargin}>
                <button type="button" onClick={this.filterRequest}>
                  {t('Hae')}
                </button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    const { t, renderComponent: Component } = this.props;
    const { loading, results, continuationToken } = this.state;

    return (
      <Component
        loading={loading}
        results={results}
        continuationToken={continuationToken}
        renderSearch={() => this.renderSearch(t)}
        getMoreResults={param => this.getTsvRequests(param)}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user
});

export default compose(
  withCancelToken,
  connect(mapStateToProps),
  withNamespaces()
)(TsvSearch);
