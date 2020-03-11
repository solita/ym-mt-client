import { compose, path } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TSV_PYYNNOT } from '../../routes';
import { getJsonData } from '../../services/ApiService';
import { formatDate } from '../../utils/date-utils';
import PrivateComponent from '../Auth/PrivateComponent';
import { tsvStateTranslated } from '../TSV/tsv-utils';
import { isWaste } from './rfo-utils';
import styles from './RfoOffers.module.css';
import withCancelToken from '../CancelToken/withCancelToken';

class RfoTsvRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tsvs: []
    };
  }

  getRfoTsvs = rfoId => {
    const url = `/api/tsv?rfoId=${rfoId}`;
    const config = {
      cancelToken: this.props.cancelTokenSource.token
    };
    getJsonData(url, config)
      .then(res => this.setState({ tsvs: res }))
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          console.log(thrown);
        }
      });
  };

  componentDidMount() {
    if (isWaste(this.props.rfo)) {
      this.getRfoTsvs(this.props.rfo.id);
    }
  }

  render() {
    const { t, rfo } = this.props;
    const rfoBusinessId = path(['businessId'])(rfo);
    if (!rfo || !Array.isArray(this.state.tsvs) || this.state.tsvs.length === 0) {
      return null;
    }
    return (
      <PrivateComponent isAny={[{ belongsToBusiness: rfoBusinessId }, { isPublicOfficer: true }]}>
        <h1>{t('Pyynnöt kunnan toissijaisesta jätehuoltopalvelusta')}</h1>
        <div className={'divider'} />

        <div className={styles.rfoOffersWrapper}>
          <table className={styles.offerTable}>
            <thead>
              <tr>
                <th>{t('Pyyntö')}</th>
                <th>{t('Pyyntöpäivä')}</th>
                <th>{t('Tila')}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tsvs.map(tsv => (
                <tr key={tsv.id}>
                  <td>
                    <Link to={`${TSV_PYYNNOT}/${tsv.id}`}>{t('Pyyntö')}</Link>
                  </td>
                  <td>{formatDate(new Date(tsv.request.requested))}</td>
                  <td>{tsvStateTranslated(t, tsv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PrivateComponent>
    );
  }
}

export default compose(
  withCancelToken,
  withNamespaces()
)(RfoTsvRequests);
