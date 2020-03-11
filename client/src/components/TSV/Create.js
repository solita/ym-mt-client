import cx from 'classnames';
import { path } from 'ramda';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import InfoBox from '../InfoBox/InfoBox';
import { ContactFragment } from '../RequestForOffer/FormFragments';
import { companyDetails, rejections, rfoTitle } from './tsv-helpers';
import styles from './Tsv.module.css';
import PrivateComponent from '../Auth/PrivateComponent';
import { ILMOITUKSET } from '../../routes';

// Prevent form submit if the form is loading or some of the obligatory fields are missing:
const disableSubmit = (tsv, loading) => () => {
  return loading || !tsv.facility || !tsv.contact_name || !tsv.contact_email;
};

const buttons = (t, styles, rfoId, disableSubmit) => (
  <div className={styles.buttonWrap}>
    <Link className={cx('buttonStyle', 'cancel')} to={`${ILMOITUKSET}/${rfoId}`}>
      {t('Peruuta')}
    </Link>

    <button
      className={cx('buttonStyle', 'qa-submit-tsv', styles.horizontalMargin2em)}
      type="submit"
      disabled={disableSubmit()}
    >
      {t('Lähetä pyyntö')}
    </button>
  </div>
);

const hasInfoDetails = (facilities, id) => {
  var facility = facilities.find(p => p.id === id);
  return facility && (facility.details || facility.infoLink);
};

const tsvForm = (
  t,
  tsv,
  styles,
  handleSubmit,
  handleChange,
  handleFacilitySortChange,
  facilitiesWithDistance,
  facilitySortOrder,
  sortButtons,
  rfoId,
  rfoAndOffers,
  loading
) => {
  return (
    <PrivateComponent
      belongsToBusiness={path(['rfo', 'businessId'], rfoAndOffers)}
      renderInstead={() => {
        return <h1 className={'textCenter'}>{t('Ei pääsyoikeutta')}</h1>;
      }}
    >
      <p>
        {t(
          'Tämä on pyyntö kunnan toissijaisesta jätehuoltopalvelusta. Palvelun edellytyksenä oleva muun palvelutarjonnan puute on todennettu tekemällä tarjouspyyntö tarvittavasta jätehuoltopalvelusta Materiaalitoriin. Tarjouspyyntöön ei ole 14 vuorokauden vähimmäismääräajassa tullut lainkaan tarjouksia tai saadut tarjoukset on arvioitu laadultaan tai hinnaltaan kohtuuttomiksi.'
        )}
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.verticalMargin2em}>
          <h4>
            {t(
              'Valitse kunnan jätelaitos, jolle pyyntö osoitetaan. Pyyntö tulee ensisijaisesti kohdistaa lähimmälle jätelaitokselle.'
            )}
            <InfoBox
              infoText={t(
                'Pyyntö kunnan toissijaisesta jätehuoltopalvelusta osoitetaan ensisijaisesti lähimmälle jätehuoltoa hoitavalle kunnan jätelaitokselle. Pyyntö voidaan osoittaa myös kauempana sijaitsevalle jätelaitokselle, mutta tästä aiheutuva kuljetusmatka kustannuksineen on ollut syytä huomioida myös ilmoitukseen mahdollisesti tulleita tarjouksia arvioitaessa. Mikäli valittu jätelaitos ei pysty tarjoamaan pyydettyä palvelua, pyyntö on mahdollista osoittaa toiselle jätelaitokselle. Kunnan jätelaitoksen on mahdollista kieltäytyä palvelun tarjoamisesta, mikäli jäte ei määrältään tai laadultaan sovellu teknisesti kunnan jätehuoltojärjestelmään tai kunnalla ei ole tarvittavaa kapasiteettia jätteen vastaanottamiseksi.'
              )}
            />
          </h4>
          <div className={styles.marginBottomHalfem}>
            {t('Järjestä jätelaitokset:')}
            {sortButtons.map(button => {
              return (
                <button
                  id={button.id}
                  key={button.id}
                  onClick={handleFacilitySortChange}
                  className={cx(styles.sortButton, {
                    [styles.active]: facilitySortOrder === button.id
                  })}
                >
                  {t(button.name)}
                </button>
              );
            })}
          </div>
          <select onChange={handleChange} name="facility">
            <option value="">{t('Valitse jätelaitos (pakollinen)')}</option>
            {facilitiesWithDistance &&
              facilitiesWithDistance.map(facility => {
                return (
                  <option key={facility.id} value={facility.id}>
                    {facility.name} {facility.address.city}
                    {'  '}
                    {!isNaN(facility.distance) ? facility.distance + t('km') : ''}
                  </option>
                );
              })}
          </select>
          {tsv && tsv.facility && hasInfoDetails(facilitiesWithDistance, tsv.facility) && (
            <InfoBox
              infoText={facilitiesWithDistance.find(p => p.id === tsv.facility).details}
              infoLink={facilitiesWithDistance.find(p => p.id === tsv.facility).infoLink}
            />
          )}
        </div>
        <div className={styles.verticalMargin2em}>
          <h4>{t('Ilmoitukseen tulleet tarjoukset')}</h4>
          {path(['offerCount'], rfoAndOffers)}
        </div>
        <div className={styles.verticalMargin2em}>
          <h4>{t('Tarjousten hylkäämisten perusteet')}</h4>
          {rejections(t, path(['offerRejections'], rfoAndOffers))}
        </div>
        <div className={styles.verticalMargin2em}>
          <h4>{t('Lisätietoa (vapaaehtoinen)')}</h4>
          <textarea
            name="requestText"
            type="text"
            rows={6}
            value={tsv.requestText || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.verticalMargin2em}>
          <h4>{t('Ilmoittaja') + ':'}</h4>
          {companyDetails(t, path(['rfo', 'company'], rfoAndOffers))}
        </div>
        <div className={styles.verticalMargin2em}>
          <h4>{t('Yhteyshenkilö')}</h4>
          <ContactFragment t={t} form={tsv} handleChange={handleChange} />
        </div>

        {buttons(t, styles, rfoId, disableSubmit(tsv, loading))}
      </form>
    </PrivateComponent>
  );
};

const Create = ({
  t,
  tsv,
  handleSubmit,
  handleChange,
  handleFacilitySortChange,
  facilitiesWithDistance,
  facilitySortOrder,
  sortButtons,
  rfoId,
  rfoAndOffers,
  loading
}) => {
  let rfo = path(['rfo'], rfoAndOffers);

  return (
    <>
      <h1 className={styles.mainHeading}>
        {t('Pyydä kunnan toissijaista jätehuoltopalvelua (TSV-palvelu)')}
        <InfoBox
          infoText={t(
            'Kyseessä on jätelain (646/2011) 33 §:n mukainen kunnan toissijainen jätehuoltopalvelu, jota jätteen haltijan on mahdollista pyytää muun palvelutarjonnan puuttuessa.\n\nJätelain mukaan jätteen haltija on velvollinen järjestämään jätteen jätehuollon, mikäli jätehuolto ei kuulu kunnan vastuulle tai jäte ole ns. tuottajavastuun alainen. Käytännössä tämä tarkoittaa sitä, että yritysten ja monien julkisten organisaatioiden on järjestettävä useimpien jätteidensä jätehuolto itse markkinoilla olevia jätehuoltopalveluja hyödyntäen.\n\nMikäli markkinoilta ei kuitenkaan löydy tarvittavaa palvelua, on sitä mahdollista pyytää kunnalta, sillä kunta on jätelain mukaan velvollinen järjestämään jätehuollon toissijaisesti myös muulle jätteelle, kuin sille josta se on ensisijaisesti vastuussa. Ensisijaisesti kunta on velvollinen järjestämään pääsääntöisesti asumisessa syntyvän jätteen sekä kunnan hallinto- ja palvelutoiminnassa syntyvän yhdyskuntajätteen jätehuollon. Kunnalla on lisäksi vaarallisen jätteen vastaanottoon ja käsittelyyn liittyviä vastuita.'
          )}
        />
      </h1>
      <div className="divider" />
      {rfoTitle(t, rfo)}
      {tsvForm(
        t,
        tsv,
        styles,
        handleSubmit,
        handleChange,
        handleFacilitySortChange,
        facilitiesWithDistance,
        facilitySortOrder,
        sortButtons,
        rfoId,
        rfoAndOffers,
        loading
      )}
    </>
  );
};

export default withNamespaces()(Create);
