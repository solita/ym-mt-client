import React from 'react';
import { withNamespaces } from 'react-i18next';
import { shortenText } from './rfo-utils';
import styles from './RequestForOffer.module.css';
import { Link } from 'react-router-dom';
import { formatDate, formatDateNumber } from '../../utils/date-utils';
import Calender from '../Icon/icons/Calender';
import { ILMOITUKSET } from '../../routes';

const ListView = ({ rfos, t }) => {
  const linkToRfo = (id, title) => {
    return <Link to={`${ILMOITUKSET}/${id}`}>{shortenText(title, 120)}</Link>;
  };

  const rfoItem = rfo => {
    const materialLocations =
      rfo.materials && rfo.materials.map(material => material.location && material.location.city);
    const regions = (rfo.regions && rfo.regions.map(region => region.nameFi)) || [];

    // A list of unique location names to display as tags
    const locations = [...new Set([...materialLocations, ...regions])];

    return (
      <div key={rfo.id} className={styles['rfoItem']}>
        <div className={styles['rfoTitle']}>
          <div className={styles['rfoType']}>{t(rfo.rfoType + '-title')}</div>
          <div className={styles['rfoDetailRow']}>
            <ul className={styles['tagList']}>
              {rfo.materials &&
                rfo.materials.map((material, idx) => {
                  return (
                    material.classification && (
                      <li key={idx} className={`tag ${styles['tag']}`}>
                        {t(material.classification)}
                      </li>
                    )
                  );
                })}
              {rfo.materialsWanted &&
                rfo.materialsWanted.map((material, idx) => {
                  return (
                    material.classification && (
                      <li key={idx} className={`tag ${styles['tag']}`}>
                        {t(material.classification)}
                      </li>
                    )
                  );
                })}
              {locations.length > 0 && (
                <li className={`tag ${styles['tag']}`}>
                  {locations.length === 1 ? locations[0] : t('Useita sijainteja')}
                </li>
              )}
            </ul>

            <div className={styles['rfoDetailsWrap']}>
              <h2>{linkToRfo(rfo.id, rfo.title)}</h2>
              <div className={`${styles['rfoAmountDetails']} ${styles['rfoInfo']}`}>
                {rfo.materials &&
                  rfo.materials.map((material, idx) => {
                    return (
                      material &&
                      material.quantity && (
                        <div key={idx}>
                          <span>{t(material.classification)}</span>
                          <span>{material.quantity.amount && '|'}</span>
                          <span>
                            {material.quantity.amount}&nbsp;{material.quantity.unitOfMeasure}
                          </span>
                          <span>{material.continuity && '|'}</span>
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
                    return <span key={idx}>{t(material.classification)}</span>;
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
            </div>
          </div>
        </div>

        <div className={styles['rfoDescription']}>
          {rfo.materials &&
            rfo.materials.map((material, idx) => {
              return (
                material.description && <p key={idx}>{shortenText(material.description, 250)}</p>
              );
            })}
          {rfo.materialsWanted &&
            rfo.materialsWanted.map((material, idx) => {
              return (
                material.description && <p key={idx}>{shortenText(material.description, 250)}</p>
              );
            })}
          {rfo.service && rfo.service.serviceDescription && (
            <p>{shortenText(rfo.service.serviceDescription, 250)}</p>
          )}
        </div>
        <div className={`${styles['rfoCompanyDetails']} ${styles['rfoInfo']}`}>
          {rfo.company && rfo.company.name && <span>{rfo.company.name} </span>}
          {rfo.company && rfo.company.address && rfo.company.address.city && (
            <span>{rfo.company.address.city}</span>
          )}
          {!rfo.contactIsPublic && !rfo.company.name && (
            <span> ({t('Kirjaudu nähdäksesi ilmoittajan tiedot')})</span>
          )}
        </div>
        {rfo.expires && (
          <div className={styles['rfoCloses']}>
            <Calender date={formatDateNumber(new Date(rfo.expires))} />
            <span>{t('Vanhenee')}</span>
            &nbsp;<span>{formatDate(new Date(rfo.expires))}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {rfos.length > 0 && (
        <div>
          <h2>{t('Hakutulokset:')} </h2>
          <p>{t('Voit muuttaa tai rajata hakutuloksia hakukoneen kriteereillä.')} </p>
        </div>
      )}
      {rfos.map(rfo => rfoItem(rfo))}
    </>
  );
};

export default withNamespaces()(ListView);
