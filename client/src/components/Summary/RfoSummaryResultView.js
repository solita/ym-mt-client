import React from 'react';
import { SEARCH_TYPES } from './types';
import { sort, prop, descend, toPairs } from 'ramda';
import { withNamespaces } from 'react-i18next';
import styles from './RfoSummary.module.css';
import cx from 'classnames';

const sortByRfoCount = sort(descend(prop('rfoCount')));

const resultView = (t, searchType, data) => {
  switch (searchType) {
    case SEARCH_TYPES.OFFERING_MATERIALS: {
      const sortedRes = sortByRfoCount(data);

      return (
        <table className={cx(styles.resultTable)}>
          <thead>
            <tr>
              <th>{t('Materiaali')}</th>
              <th>{t('Toistuvuus')}</th>
              <th>{t('Ilmoituksia, kpl')}</th>
              <th>{t('Määrä')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedRes.map(resultRow => (
              <tr key={resultRow.classification + resultRow.continuity}>
                <td>{t(resultRow.classification)}</td>
                <td>{t(resultRow.continuity)}</td>
                <td>{resultRow.rfoCount}</td>
                <td>
                  <span>
                    {toPairs(resultRow.totals)
                      .map(([unit, value]) => `${value.toLocaleString('fi-FI')} ${unit}`)
                      .join(', ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    case SEARCH_TYPES.RECEIVING_MATERIALS: {
      const sortedRes = sortByRfoCount(data);

      return (
        <table className={cx(styles.resultTable)}>
          <thead>
            <tr>
              <th>{t('Materiaali')}</th>
              <th>{t('Ilmoituksia, kpl')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedRes.map(resultRow => (
              <tr key={resultRow.classification}>
                <td>{t(resultRow.classification)}</td>
                <td>{resultRow.rfoCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    case SEARCH_TYPES.OFFERING_SERVICES: {
      const sortedRes = sortByRfoCount(data);

      return (
        <table className={cx(styles.resultTable)}>
          <thead>
            <tr>
              <th>{t('Palvelu')}</th>
              <th>{t('Palvelun tarkennus')}</th>
              <th>{t('Ilmoituksia, kpl')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedRes.map(resultRow => (
              <tr key={resultRow.service + resultRow.subService}>
                <td>{t(resultRow.service)}</td>
                <td>{resultRow.subService && t(resultRow.subService)}</td>
                <td>{resultRow.rfoCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    default:
      return;
  }
};

const RfoSummaryResultView = ({ t, searchType, data }) => {
  return <div>{resultView(t, searchType, data)}</div>;
};

export default withNamespaces()(RfoSummaryResultView);
