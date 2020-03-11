import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date-utils';
import { shortenText } from './rfo-utils';
import styles from './SimpleListView.module.css';
import { ILMOITUKSET } from '../../routes';

const linkToRfo = (id, title) => {
  return <Link to={`${ILMOITUKSET}/${id}`}>{title}</Link>;
};

const rfoItem = (rfo, t) => (
  <div key={rfo.id} className={styles.item}>
    <h4>{linkToRfo(rfo.id, shortenText(rfo.title, 80))}</h4>
    <div>
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
      {rfo.materialsWanted &&
        rfo.materialsWanted.map((material, idx) => {
          return (
            material.classification && (
              <div key={idx}>
                <span>{t(material.classification)}</span>
              </div>
            )
          );
        })}
      {rfo.service &&
        rfo.service.serviceIds &&
        rfo.service.serviceIds.map((serviceId, idx) => {
          const isFirstServiceId = !idx;
          return (
            <span key={idx}>
              {!isFirstServiceId && <>{' | '}</>}
              <span>{t(serviceId)}</span>
            </span>
          );
        })}
    </div>
    <div>
      {rfo.company && rfo.company.name && (
        <span>
          {rfo.company.name}
          {' | '}
        </span>
      )}
      <span>{t('Vanhenee')}</span>&nbsp;<span>{formatDate(new Date(rfo.expires))}</span>
    </div>
  </div>
);

const SimpleListView = ({ rfos, t }) => {
  return rfos.map(rfo => rfoItem(rfo, t));
};

export default withNamespaces()(SimpleListView);
