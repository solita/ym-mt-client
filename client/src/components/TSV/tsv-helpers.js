import { filter, path } from 'ramda';
import React from 'react';
import * as AuthService from '../../services/AuthService';
import { countByProp, listLengthWithUndefinedCheck } from '../../utils/common-utils';
import { getAuthServerUrl } from '../../utils/config-utils';
import { showOfferRejectionCause, showOfferRejectionCauseWithCount } from '../Offer/offer-utils';
import { TSV_REJECT_REASON_OTHER } from '../TSV/types';
import { rejectReasonTranslated, tsvStateIsRejected, tsvStateTranslated } from './tsv-utils';
import styles from './Tsv.module.css';

export const rfoTitle = (t, rfo) => (
  <h2 className={styles.marginBottom2em}>
    {t('Ilmoitus, jota pyyntö koskee') + ': ' + path(['title'], rfo)}
  </h2>
);

const rejection = (t, code, count, otherRejectionCauses) => {
  const reasonIsOther = code === '0';
  if (!reasonIsOther) {
    return <span>{showOfferRejectionCauseWithCount(t, code, count)}</span>;
  } else {
    return (
      <span>
        {showOfferRejectionCauseWithCount(t, code, count)}
        <ul>
          {otherRejectionCauses.map((otherRejectionCause, index) => (
            <li key={index}>
              {showOfferRejectionCause(
                t,
                path(['code'], otherRejectionCause),
                path(['text'], otherRejectionCause)
              )}
            </li>
          ))}
        </ul>
      </span>
    );
  }
};

export const rejections = (t, rejections) => {
  let rejectionsCount = listLengthWithUndefinedCheck(rejections);

  if (isNaN(rejectionsCount)) {
    return undefined;
  }

  if (rejectionsCount === 0) {
    return '-';
  }

  const codesWithCounts = countByProp('code', rejections);
  const otherRejectionCauses = filter(rejection => rejection.code === 0, rejections);

  return (
    <ul>
      {Object.keys(codesWithCounts).map(code => (
        <li className={styles.listItem} key={code}>
          {rejection(t, code, codesWithCounts[code], otherRejectionCauses)}
        </li>
      ))}
    </ul>
  );
};

export const companyDetails = (t, company) => {
  return (
    <div>
      {path(['name'], company)}
      <br />
      {path(['address', 'address'], company)}
      <br />
      {path(['address', 'postalCode'], company)} {path(['address', 'city'], company)}
      <br />
      {t('Y-tunnus') + ': ' + path(['businessId'], company)}
    </div>
  );
};

export const contactDetails = (t, tsv) => {
  const { contact } = tsv;
  return (
    <div>
      {path(['name'], contact)}
      {path(['title'], contact) && (
        <>
          <br />
          {path(['title'], contact)}
        </>
      )}
      {path(['phone'], contact) && (
        <>
          <br />
          {t('Puh.') + ' '}
          {path(['phone'], contact)}
        </>
      )}
      <br />
      {path(['email'], contact)}
    </div>
  );
};

const rejectedStateReason = (t, tsv) => {
  const rejectionReasonOption = path(['state', 'reasonText'], tsv);
  const rejectionReasonOptionOtherText = path(['state', 'reasonDescription'], tsv);
  return rejectionReasonOption === TSV_REJECT_REASON_OTHER
    ? rejectReasonTranslated(t, rejectionReasonOption) + ': ' + rejectionReasonOptionOtherText
    : rejectReasonTranslated(t, rejectionReasonOption);
};

export const showState = (t, tsv) => {
  const stateIsRejected = tsvStateIsRejected(tsv);
  const state = tsvStateTranslated(t, tsv);

  return stateIsRejected ? (
    <>
      <div className={styles.marginBottom1em}>{state}</div>
      <div className={styles.marginBottom1em}>
        <strong>{t('Hylkäysperusteet') + ': '}</strong> {rejectedStateReason(t, tsv)}
      </div>
    </>
  ) : (
    <>{state}</>
  );
};

export const strongAuthButton = buttonText => () => {
  const logoutAndAuth = () => {
    AuthService.initUserManager()
      .removeUser()
      .then(res => {
        window.location.href =
          getAuthServerUrl() +
          '/External/Challenge?provider=Saml2&returnUrl=/Client/ym-tietoalusta-spa?' +
          window.location.href;
      });
  };
  return (
    <button className={'buttonStyle'} onClick={logoutAndAuth}>
      {buttonText}
    </button>
  );
};
