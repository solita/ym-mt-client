import cx from 'classnames';
import { path } from 'ramda';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import PrivateComponent from '../Auth/PrivateComponent';
import { formatDate } from '../../utils/date-utils';
import InfoBox from '../InfoBox/InfoBox';
import { companyDetails, contactDetails, rejections, rfoTitle, showState } from './tsv-helpers';
import styles from './Tsv.module.css';
import TsvActionButtons from './TsvActionButtons';
import { showStateByColor } from './tsv-utils';
import { TsvStateBadge } from './TsvStateBadge';

const tsvHeader = (t, styles, isMunicipalWasteManager) => (
  <>
    <h1 className={styles.mainHeading}>
      {t('Pyyntö kunnan toissijaisesta jätehuoltopalvelusta (TSV-palvelu)')}
    </h1>
    <p className={cx('textCenter')}>
      {t(
        'Tämä on pyyntö kunnan toissijaisesta jätehuoltopalvelusta. Palvelun edellytyksenä oleva muun palvelutarjonnan puute on todennettu tekemällä tarjouspyyntö tarvittavasta jätehuoltopalvelusta Materiaalitoriin. Tarjouspyyntöön ei ole 14 vuorokauden vähimmäismääräajassa tullut lainkaan tarjouksia tai saadut tarjoukset on arvioitu laadultaan tai hinnaltaan kohtuuttomiksi.'
      )}
      {isMunicipalWasteManager && (
        <InfoBox
          infoText={t(
            'Tarkemmat tiedot pyynnön tekijästä, jätteestä ja sen sijainnista, haettavasta palvelusta sekä ilmoituksen julkaisu- ja päättymisajankohdat löytyvät pyynnön ohessa olevasta ilmoituksesta.'
          )}
        />
      )}
    </p>
    <div className="divider" />
  </>
);

const tsvFacilityDetails = tsvFacility => (
  <div>
    {path(['name'], tsvFacility)}
    <br />
    {path(['address', 'address'], tsvFacility)}
    <br />
    {path(['address', 'postalCode'], tsvFacility)} {path(['address', 'city'], tsvFacility)}
    <br />
    {path(['email'], tsvFacility)}
  </div>
);

const showTsv = (t, tsv, isMunicipalWasteManager) => {
  let rfo = path(['rfo'], tsv);
  const tsvStateColor = tsv ? showStateByColor(tsv.state) : 'orange';
  return (
    <>
      {tsvHeader(t, styles, isMunicipalWasteManager)}
      {tsv && <TsvStateBadge tsvStateColor={tsvStateColor} tsv={tsv} t={t} />}
      {rfoTitle(t, rfo)}
      <div className={styles.verticalMargin2em}>
        <h4>{t('Pyyntö jätetty') + ':'}</h4>
        {tsv &&
          path(['request', 'requested'], tsv) &&
          formatDate(new Date(path(['request', 'requested'], tsv)))}
      </div>
      <div className={styles.verticalMargin2em}>
        <h4>{t('Jätelaitos, jolle pyyntö osoitettu') + ':'}</h4>
        {tsvFacilityDetails(path(['tsvFacility'], tsv))}
      </div>
      <div className={styles.verticalMargin2em}>
        <h4>{t('Pyynnön esittäjä') + ':'}</h4>
        <div className={styles.detailWrapper}>
          <div className={styles.detailContainerHalf}>
            {companyDetails(t, path(['request', 'requestedFor'], tsv))}
          </div>
          <div className={styles.detailContainerHalf}>
            {contactDetails(t, path(['request'], tsv))}
          </div>
        </div>
      </div>
      <div className={styles.verticalMargin2em}>
        <h4>{t('Lisätietoa')}</h4>
        {path(['request', 'requestText'], tsv)}
      </div>
      <div className={styles.verticalMargin2em}>
        <h4>{t('Ilmoitukseen tulleet tarjoukset')}</h4>
        {path(['offerCount'], tsv)}
      </div>
      <div className={styles.verticalMargin2em}>
        <h4>{t('Tarjousten hylkäämisten perusteet')}</h4>
        {rejections(t, path(['offerRejections'], tsv))}
      </div>
      <div className={styles.verticalMargin2em}>
        <h4>{t('Pyynnön tila')}</h4>
        {showState(t, tsv)}
      </div>
    </>
  );
};

const View = ({
  t,
  tsvRequest,
  loading,
  cancelTsv,
  viewForm,
  handleTsvViewFormChange,
  rejectTsv,
  isMunicipalWasteManager
}) => {
  return tsvRequest ? (
    <PrivateComponent
      isAny={[
        { isAdmin: true },
        {
          belongsToBusiness: [
            path(['tsvFacility', 'businessId'], tsvRequest),
            path(['request', 'requestedFor', 'businessId'], tsvRequest)
          ]
        },
        { isPublicOfficerFacility: path(['tsvFacility', 'businessId'], tsvRequest) }
      ]}
    >
      {showTsv(t, tsvRequest, isMunicipalWasteManager)}
      <TsvActionButtons
        tsv={tsvRequest}
        viewForm={viewForm}
        cancelTsv={cancelTsv}
        handleViewFormChange={handleTsvViewFormChange}
        rejectTsv={rejectTsv}
        loading={loading}
      />
    </PrivateComponent>
  ) : null;
};

export default withNamespaces()(View);
