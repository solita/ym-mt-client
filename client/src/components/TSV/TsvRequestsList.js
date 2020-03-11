import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date-utils';
import simpleListViewStyles from '../RequestForOffer/SimpleListView.module.css';
import Loader from '../Loader/Loader';
import { path } from 'ramda';
import { TSV_PYYNNOT } from '../../routes';
import { tsvStateTranslated } from './tsv-utils';

class TsvRequestsList extends Component {
  render() {
    const { t, loading, results } = this.props;

    return (
      <div>
        <Loader loading={loading}>
          {!loading && (results && results.length < 1) && <p>{t('Ei TSV-pyyntöjä')}</p>}

          {results.map(result => {
            const tsvId = result.id;
            const companyName = path(['rfo', 'company', 'name'], result);
            const rfoTitle = path(['rfo', 'title'], result);
            const tsvStatus = tsvStateTranslated(t, result);
            const requestedDateObj = new Date(path(['request', 'requested'], result));

            return (
              tsvId && (
                <div key={tsvId} className={simpleListViewStyles.item}>
                  <h4>
                    <Link to={`${TSV_PYYNNOT}/${tsvId}`}>
                      {this.isWasteManager ? companyName || rfoTitle : rfoTitle}
                    </Link>
                  </h4>
                  <p>{tsvStatus}</p>
                  <p>
                    {t('Saapunut')}: {formatDate(requestedDateObj)}
                  </p>
                </div>
              )
            );
          })}
        </Loader>
        {!loading && results.length === 0 && <div>{t('Ei tietoja.')}</div>}
      </div>
    );
  }
}

export default withNamespaces()(TsvRequestsList);
