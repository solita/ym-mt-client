import React, { Component } from 'react';
import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';
import { isNullDate } from '../../utils/date-utils';
import { withNamespaces } from 'react-i18next';
import Loader from '../Loader/Loader';
import { TSV_SOPIMUSARKISTO, TSV_SOPIMUKSET } from '../../routes';

class ContractArchive extends Component {
  render() {
    const { t, loading, results } = this.props;
    return (
      <Loader loading={loading}>
        <ul className={styles.myPageList}>
          {Array.isArray(results) &&
            results.map(tsv => (
              <li key={tsv.contract.id} className={styles.myPageListItem}>
                <h4>
                  <a href={`${TSV_SOPIMUKSET}/` + tsv.id}>
                    {tsv.contract.contractName ||
                      tsv.contract.contractNumber ||
                      tsv.contract.contractReference ||
                      t('sopimus') + ' - ' + tsv.rfo.company.name}
                  </a>
                </h4>
                <p>{tsv.rfo.company.name}</p>
                <p>
                  {!isNullDate(tsv.contract.serviceEndDate) &&
                    t('Päättyy: ') +
                      new Date(tsv.contract.serviceEndDate).toLocaleDateString('fi-FI')}
                </p>
              </li>
            ))}
        </ul>
        <div className={styles.buttonWrap}>
          <Link className={'buttonStyle'} to={TSV_SOPIMUSARKISTO}>
            {t('Kaikki sopimukset')}
          </Link>
        </div>
        {!loading && (!results || (Array.isArray(results) && results.length === 0)) && (
          <div>{t('Ei sopimuksia.')}</div>
        )}
      </Loader>
    );
  }
}

export default withNamespaces()(ContractArchive);
