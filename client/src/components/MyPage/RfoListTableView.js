import cx from 'classnames';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date-utils';
import { isClosed, shortenText, isTsvAllowed } from '../RequestForOffer/rfo-utils';
import styles from './MyPage.module.css';
import { ILMOITUKSET } from '../../routes';

const linkToRfo = (id, title) => {
  return <Link to={`${ILMOITUKSET}/${id}`}>{shortenText(title, 120)}</Link>;
};

const RfoRow = ({ rfo, t }) => {
  return (
    <tr>
      <td>
        <div className={cx(styles.uppercase, styles.verticalMarginHalfem)}>
          {t(rfo.rfoType + '-title')}{' '}
          {isClosed(rfo) && (
            <span className={styles.greenSidemark}>
              {t('Suljettu') + ' ' + formatDate(new Date(rfo.statusDate))}
            </span>
          )}
        </div>
        <div className={styles.verticalMarginHalfem}>{linkToRfo(rfo.id, rfo.title)}</div>
        <div className={styles.verticalMarginHalfem}>
          {rfo.materials &&
            rfo.materials.map((material, idx) => {
              return (
                material.classification && (
                  <div key={idx}>
                    <span>{t(material.classification)}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span>
                      {material.continuity === 'onetime' && t('Kertaerä')}
                      {material.continuity === 'continuous' && t('Jatkuva tuotanto')}
                    </span>
                  </div>
                )
              );
            })}
        </div>
        {isTsvAllowed(rfo) && !isClosed(rfo) && (
          <div>
            <Link className={'buttonStyle'} to={`${ILMOITUKSET}/${rfo.id}/teetsv`}>
              {t('Pyydä kunnan toissijaista jätehuoltopalvelua')}
            </Link>
          </div>
        )}
      </td>
      <td>{formatDate(new Date(rfo.created))}</td>
      <td>{formatDate(new Date(rfo.expires))}</td>
    </tr>
  );
};

const RfoListTableView = ({ rfos, t }) => {
  return (
    <>
      {rfos.length > 0 && (
        <div className={styles.borderTop}>
          <table className={cx(styles.listTable, styles.smallVerticalCellPaddings)}>
            <thead>
              <tr>
                <th>{t('Ilmoitus')}</th>
                <th>{t('Ilmoitettu')}</th>
                <th>{t('Vanhenee')}</th>
              </tr>
            </thead>
            <tbody>
              {rfos.map(rfo => (
                <RfoRow rfo={rfo} t={t} key={rfo.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default withNamespaces()(RfoListTableView);
