import React from 'react';
import { withNamespaces } from 'react-i18next';
import styles from './RfoSummary.module.css';
import cx from 'classnames';
import { toPairs } from 'ramda';

const getTotals = data => {
  const totals = data.reduce((acc, val) => {
    let found = acc[val.facility.id];
    if (found) {
      found = Object.assign({}, found, {
        totalContracts: found.totalContracts + val.totalContracts
      });
    } else {
      found = { facility: val.facility, totalContracts: val.totalContracts };
    }
    acc[val.facility.id] = found;
    return acc;
  }, {});
  const totalsArr = [];
  Object.keys(totals).forEach(key => totalsArr.push(totals[key]));
  return totalsArr;
};

const resultView = (t, data) => {
  const totalsArr = getTotals(data);
  return (
    <div>
      <h2>{t('Sopimustiedot')}</h2>
      <table className={cx(styles.resultTable)}>
        <thead>
          <tr>
            <th>{t('Jäte')}</th>
            <th>{t('Määrä')}</th>
            <th>{t('Palvelu')}</th>
            <th>{t('Palvelun tarkennus')}</th>
            <th>{t('Palvelun hinta (€/tonnia jätettä)')}</th>
            <th>{t('Jätelaitos')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((resultRow, index) => {
            const {
              amounts,
              averagePricePerTonEUR,
              classification,
              service,
              subservices,
              facility
            } = resultRow;
            const units = toPairs(amounts);

            return (
              <tr key={index.toString()}>
                <td>{t(classification)}</td>
                <td>
                  {units.map(([unit, amount]) => {
                    return (
                      <div key={amount + unit}>
                        <span>{`${amount.toLocaleString('fi-FI')} ${unit}`}</span>
                      </div>
                    );
                  })}
                </td>
                <td>{t(service)}</td>
                <td>{subservices && subservices.map(s => t(s)).join(', ')}</td>
                <td>{`${averagePricePerTonEUR.toLocaleString('fi-FI')} €/t`}</td>
                <td>{facility.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>{t('Sopimusten määrä')}</h2>

      {
        <table className={cx(styles.resultTable)}>
          <thead>
            <tr>
              <th>{t('Jätelaitos')}</th>
              <th>{t('Sopimuksien määrä')}</th>
            </tr>
          </thead>
          <tbody>
            {totalsArr.map((resultRow, index) => {
              const { totalContracts, facility } = resultRow;
              return (
                <tr key={index.toString()}>
                  <td>{facility.name}</td>
                  <td>{totalContracts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </div>
  );
};

const TsvSummaryResultView = ({ t, data }) => {
  return data && data.length > 0 && <div>{resultView(t, data)}</div>;
};

export default withNamespaces()(TsvSummaryResultView);
