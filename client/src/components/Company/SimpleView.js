import React from 'react';
import { withNamespaces } from 'react-i18next';
import styles from './CompanySimpleView.module.css';
import { Link } from 'react-router-dom';
import { OMAT_TIEDOT } from '../../routes';
import {
  fullName,
  phone,
  email,
  isPublicOfficer,
  publicOfficerFacilities
} from '../../state/ducks/user/selectors';
import { path } from 'ramda';

const SimpleCompanyView = ({ user, company, t }) => {
  const userDetails = path(['user', 'profile'], user);
  return (
    <div className={styles['companySimpleView']}>
      {company && company.name && (
        <>
          <div className={styles.infoContainer}>
            <span className={styles.label}>{t('Organisaatio')}</span>
            <span className={styles.infoValue}>{company.name}</span>
          </div>
          <div className={styles.infoContainer}>
            <span className={styles.label}>{t('Y-tunnus')}</span>
            <span className={styles.infoValue}>{company.businessId}</span>
          </div>
          {isPublicOfficer(user) && (
            <div className={styles.infoContainer}>
              <span className={styles.label}>{t('Jätelaitokset')}</span>
              <span className={styles.infoValue}>
                {publicOfficerFacilities(user)
                  .map(f => f.name + ' (' + f.businessId + ')')
                  .join(', ')}
              </span>
            </div>
          )}
        </>
      )}
      {userDetails && (
        <>
          <div className={styles.infoContainer}>
            <span className={styles.label}>{t('Käyttäjä')}</span>
            <span className={styles.infoValue}>{fullName(user)}</span>
          </div>
          <div className={styles.infoContainer}>
            <span className={styles.label}>{t('Rooli')}</span>
            <span className={styles.infoValue}>{t(userDetails.role + '-role-name')}</span>
          </div>
          <div className={styles.infoContainer}>
            <span className={styles.label}>{t('Sähköposti')}</span>
            <span className={styles.infoValue}>{email(user)}</span>
          </div>
          <div className={styles.infoContainer}>
            <span className={styles.label}>{t('Puhelin')}</span>
            <span className={styles.infoValue}>{phone(user)}</span>
          </div>
        </>
      )}
      <div className={styles.buttonWrap}>
        <Link className={'buttonStyle'} to={`${OMAT_TIEDOT}`}>
          {t('Omat tiedot')}
        </Link>
      </div>
    </div>
  );
};
export default withNamespaces()(SimpleCompanyView);
