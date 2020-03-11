import React from 'react';
import { withNamespaces } from 'react-i18next';
import styles from './RfoSummary.module.css';
import cx from 'classnames';

const getTotals = data => {
  const totals = data.reduce((acc, val) => {
    let found = acc[val.facility.id];
    if (!found) {
      found = {
        facility: val.facility,
        customerCount: val.customerCount,
        totalValue: val.totalValue
      };
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
      <h2>{t('Tietoja palvelusta')}</h2>
      <table className={cx(styles.resultTable)}>
        <thead>
          <tr>
            <th>{t('Jäte')}</th>
            <th>{t('Määrä tonneissa')}</th>
            <th>{t('Palvelu')}</th>
            <th>{t('Jätelaitos')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((resultRow, index) => {
            const { amountInTonne, classification, facility, service } = resultRow;

            return (
              <tr key={index.toString()}>
                <td>{t(classification)}</td>
                <td>{amountInTonne.toLocaleString('fi-FI')}</td>
                <td>{t(service)}</td>
                <td>{facility.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>{t('Palvelun kokonaisarvo ja palvelua käyttäneiden asiakkaiden määrä')}</h2>

      {
        <table className={cx(styles.resultTable)}>
          <thead>
            <tr>
              <th>{t('Jätelaitos')}</th>
              <th>{t('Palvelun kokonaisarvo')}</th>
              <th>{t('Asiakkaiden määrä')}</th>
            </tr>
          </thead>
          <tbody>
            {totalsArr.map((resultRow, index) => {
              const { totalValue, facility, customerCount } = resultRow;
              return (
                <tr key={index.toString()}>
                  <td>{facility.name}</td>
                  <td>{totalValue.toLocaleString('fi-FI')}</td>
                  <td>{customerCount.toLocaleString('fi-FI')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </div>
  );
};

const WasteBatchSummaryResultView = ({ t, data }) => {
  return data && data.length > 0 && <div>{resultView(t, data)}</div>;
};

export default withNamespaces()(WasteBatchSummaryResultView);
