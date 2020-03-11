import qs from 'qs';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { getRaw } from '../../services/ApiService';
import * as API_ENDPOINTS from '../../services/endpoints';
import Loader from '../Loader/Loader';
import simpleListViewStyles from './SimpleListView.module.css';
import { compose } from 'ramda';
import withCancelToken from '../CancelToken/withCancelToken';

const cachedFetchCanNotBeUsed = rfoListParams => {
  return rfoListParams.OnlyExpiredAndClosed === true;
};

class FetchRfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rfos: [],
      rfoCount: undefined,
      continuationToken: undefined
    };
  }

  componentDidMount() {
    this.fetchRfos(this.props.rfosParams);
  }

  fetchRfos = (rfoListParams, continueSearch = false) => {
    this.setState({
      loading: true
    });

    let fetchApiUrl = cachedFetchCanNotBeUsed(rfoListParams)
      ? API_ENDPOINTS.FETCH_RFOS
      : API_ENDPOINTS.FETCH_RFO_CACHED;

    if (continueSearch) {
      rfoListParams = Object.assign(rfoListParams, {
        continuationToken: this.state.continuationToken
      });
    }

    const config = {
      params: rfoListParams,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
      cancelToken: this.props.cancelTokenSource.token
    };

    getRaw(fetchApiUrl, config)
      .then(result => this.addRfoToState(result))
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          this.setState({ loading: false });
          console.log(thrown);
        }
      });
  };

  fetchMoreRfos = rfoListParams => () => {
    this.fetchRfos(rfoListParams, true);
  };

  addRfoToState = response => {
    this.setState({
      loading: false,
      rfos: this.state.rfos.concat(response.data),
      rfoCount: response.headers['tietoalusta-total-count'],
      continuationToken: response.headers['tietoalusta-continuation-token']
    });
  };

  render() {
    const { t, title, renderRfos, useContinuationButton, customNoResultsText } = this.props;
    const { rfos, loading, rfoCount, continuationToken } = this.state;

    return (
      <>
        {title && (
          <h2 className={simpleListViewStyles.title}>
            {title} ({rfoCount})
          </h2>
        )}
        <Loader loading={loading}>
          {renderRfos(rfos)}
          {useContinuationButton && continuationToken && (
            <div className={simpleListViewStyles.buttonWrap}>
              <button
                className={'buttonStyle'}
                onClick={this.fetchMoreRfos(this.props.rfosParams)}
                disabled={loading}
              >
                {t('Lisää ilmoituksia')}
              </button>
            </div>
          )}
        </Loader>
        {!loading && rfos && rfos.length === 0 && (
          <div>{customNoResultsText ? customNoResultsText : t('Ei ilmoituksia.')}</div>
        )}
      </>
    );
  }
}

export default compose(
  withCancelToken,
  withNamespaces()
)(FetchRfos);
