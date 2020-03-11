import { path } from 'ramda';
import React, { Component } from 'react';
import { tsvStateTranslated } from '../../components/TSV/tsv-utils';
import styles from './Tsv.module.css';

class TsvArchiveList extends Component {
  render() {
    const { contractList, t } = this.props;
    if (!contractList) return null;
    const mappedList = contractList.map(tsv => (
      <li key={tsv.id + tsv.tsvFacility.businessId} className={styles.contractArchiveListItem}>
        <div className={styles.contractArchiveListItemColumn}>
          <p className={styles.contractName}>
            <a href={'/tsv/sopimukset/' + tsv.id}>
              {tsv.rfo.company.name}&nbsp;-&nbsp;{tsv.request.requestText}
            </a>
          </p>
          <p>
            {t('Jäteluokka: ')}
            {t(path(['rfo', 'materials', 0, 'classification'], tsv))}
          </p>
          <p>
            {t('Määrä: ')}
            {path(['rfo', 'materials', 0, 'quantity', 'amount'], tsv)}
            {path(['rfo', 'materials', 0, 'quantity', 'unitOfMeasure'], tsv)}
            &nbsp;|&nbsp;{' '}
            {t(
              path(['rfo', 'materials', 0, 'continuity'], tsv) === 'onetime'
                ? 'Kertaerä'
                : 'Jatkuva tuotanto'
            )}
          </p>
          <p>
            {path(['rfo', 'materials', 0, 'type'], tsv) === 'dangerous'
              ? t('Vaarallinen jäte')
              : t('Vaaraton jäte')}
          </p>
        </div>
        <div className={styles.contractArchiveListItemColumn}>
          <p>{tsv.rfo.company.name}</p>
          <p>{tsv.rfo.company.businessId}</p>
        </div>
        <div className={styles.contractArchiveListItemColumn}>
          <p>{tsvStateTranslated(t, tsv)}</p>
        </div>
        <div className={styles.contractArchiveListItemColumn}>
          <p>
            {tsv.contract.contractEndDate &&
              new Date(tsv.contract.contractEndDate).toLocaleDateString('fi-FI')}
          </p>
        </div>
      </li>
    ));

    return (
      <>
        <h2 className={styles.ContractListHeader}>{t('TSV-sopimukset')}</h2>
        <div className={styles.contractArchiveListHeaders}>
          <div className={styles.contractArchiveListItemColumn}>
            <p>
              <strong>{t('Sopimus')}</strong>
            </p>
          </div>
          <div className={styles.contractArchiveListItemColumn}>
            <p>
              <strong>{t('Pyynnön lähettäjä')}</strong>
            </p>
          </div>
          <div className={styles.contractArchiveListItemColumn}>
            <p>
              <strong>{t('Tila')}</strong>
            </p>
          </div>{' '}
          <div className={styles.contractArchiveListItemColumn}>
            <p>
              <strong>{t('Päättymisaika')}</strong>
            </p>
          </div>
        </div>
        <ul className={styles.contractArchiveList}>{mappedList}</ul>
      </>
    );
  }
}

export default TsvArchiveList;
