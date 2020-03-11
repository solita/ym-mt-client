import cx from 'classnames';
import { addDays, format } from 'date-fns';
import { fi, sv } from 'date-fns/locale';
import { is } from 'ramda';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatDate, formatDateForSaving } from '../../utils/date-utils';
import InfoBox from '../InfoBox/InfoBox';
import formStyles from '../Layout/Form.module.css';
import { Col, Row } from '../Layout/Layout';
import Location from '../Map/Location';
import { SingleMaterialEdit, SingleReceiveMaterialEdit, SingleWasteEdit } from '../Material/Edit';
import Select from '../Select/Select';
import styles from './RequestForOffer.module.css';
import { isClosed } from './rfo-utils';
import * as rfoTypes from './types';
import { withNamespaces } from 'react-i18next';

export const RfoTitleFragment = ({ t, rfo, classnameForClosed }) => {
  return (
    <h1>
      {rfo.title}
      {isClosed(rfo) && (
        <span className={classnameForClosed}>
          {t('Suljettu') + ' ' + formatDate(new Date(rfo.statusDate))}
        </span>
      )}
    </h1>
  );
};

export const LocationFromMaterialFragment = ({ material }) => {
  const location = material.location;

  return (
    <>
      {location.name && (
        <>
          <span>{location.name}</span>
          <br />
        </>
      )}
      {location.address && (
        <>
          <span>{location.address}</span>
          <br />
        </>
      )}
      <span>
        {location.postalCode} {location.city}
      </span>
    </>
  );
};

export const TypeSelectFragment = ({ t, rfo, handleChange, disabled }) => (
  <div className={styles.typeSelect}>
    <h2>
      {t('Ilmoitustyyppi')}{' '}
      <InfoBox
        infoText={
          <Trans i18nKey="ilmoitussivun_ilmoitus_tyypit">
            Valitse oikea ilmoitustyyppi.
            <br />
            <br />
            Valitse ”<strong>Etsin materiaalille vastaanottajaa</strong>”, mikäli ilmoitat tarjolla
            olevasta jätteestä tai muusta materiaalista, kuten tuotannon sivuvirrasta. Valitse
            seuraavaksi, onko ilmoittamasi materiaali jätettä vai muuta materiaalia. Jos kyseessä on
            jäte, voit määritellä ilmoituksessa lisäksi, millaista palvelua etsit jätteelle.
            <br />
            <br />
            Valitse ”<strong>Etsin hyödynnettäviä materiaaleja</strong>”, mikäli ilmoitat halustasi
            vastaanottaa materiaalia. Materiaali voi olla jätettä tai sivuvirtaa.
            <br />
            <br />
            Mikäli haluat pikemminkin tarjota jätehuoltopalvelua, valitse ”
            <strong>Tarjoan jätehuolto- tai asiantuntijapalvelua</strong>”. Silloin voit ilmoittaa
            tarjoamastasi materiaalien käsittely- tai kuljetuspalvelusta, analysointipalvelusta tai
            materiaaleihin liittyvistä muista asiantuntijapalveluista.
            <br />
            <br />
            Huom! Jätteen vastaanottaminen edellyttää jätelain 29 §:n mukaista hyväksyntää.
          </Trans>
        }
      />
    </h2>
    <div className={styles.typeWrapper__firstLevel}>
      <label className={'qa-wasteOrMaterial'}>
        <input
          onChange={handleChange}
          type="radio"
          name="type"
          value={'wasteOrMaterial'}
          disabled={disabled}
          className={cx(
            'radioButton',
            rfo.type === rfoTypes.RFO_OFFERING_WASTE || rfo.type === rfoTypes.RFO_OFFERING_MATERIAL
              ? 'radioButtonChecked'
              : null
          )}
          checked={rfo.type === 'wasteOrMaterial'}
        />
        <span className={'radioButtonLabel'}>{t('Etsin materiaalille vastaanottajaa')}</span>
      </label>
    </div>
    {(rfo.type === 'wasteOrMaterial' ||
      rfo.type === rfoTypes.RFO_OFFERING_WASTE ||
      rfo.type === rfoTypes.RFO_OFFERING_MATERIAL) && (
      <div className={styles.typeWrapper__secondLevel}>
        <span className={styles.typeWrapper__secondLevelOption}>
          {t('Onko materiaali jätettä? ')}
          <InfoBox
            infoText={t(
              'Määritä, onko materiaalisi jätettä vai muuta materiaalia. \n\n Jäte on mistä tahansa toiminnasta syntyvää sen tuottajalle käyttökelvotonta materiaalia. Jätelain (646/2011) mukaan jätettä on aine tai esine, jonka haltija on poistanut tai aikoo poistaa käytöstä taikka on velvollinen poistamaan käytöstä. Esimerkkiluettelo jätteistä löytyy jäteasetuksen (179/2012) liitteestä 4 ”Jäteluettelo: Yleisimmät jätteet sekä vaaralliset jätteet”. \n\n Lähtökohtaisesti toiminnanharjoittaja vastaa materiaalin luokittelusta jätteeksi. Ympäristöluvanvaraisessa toiminnassa syntyvät jätteet kirjataan yleensä ympäristölupaan. Apua esineen ja aineen jäteluonteen arvioinnissa voi tarvittaessa pyytää toiminnanharjoittajan sijaintipaikan mukaiselta jätelain valvontaviranomaiselta (kunnan ympäristönsuojeluviranomainen tai elinkeino-, liikenne- ja ympäristökeskus). \n\n On tärkeää tunnistaa, onko ilmoittamasi materiaali jätettä. Materiaalin luokittelusta jätteeksi seuraa jätelaista tulevia velvoitteita. Materiaalitorissakin jätteestä tulee antaa enemmän tietoja kuin muusta materiaalista. Jätelaissa määritellään myös, milloin aine tai esine ei ole jäte vaan sivutuote.  \n\n Kunnan toissijaista jätehuoltopalvelua voi muun palvelutarjonnan puutteen vuoksi pyytää vain jätteelle.'
            )}
          />
        </span>
        <label className={cx(styles.typeWrapper__secondLevelOption, 'qa-offeringWaste')}>
          <input
            onChange={handleChange}
            type="radio"
            name="type"
            disabled={disabled}
            value={rfoTypes.RFO_OFFERING_WASTE}
            checked={rfo.type === rfoTypes.RFO_OFFERING_WASTE}
            className={cx('radioButton')}
          />
          <span className={'radioButtonLabel'}>{t('Kyllä')}</span>
        </label>
        <label className={cx(styles.typeWrapper__secondLevelOption, 'qa-offeringMaterial')}>
          <input
            onChange={handleChange}
            type="radio"
            name="type"
            disabled={disabled}
            value={rfoTypes.RFO_OFFERING_MATERIAL}
            checked={rfo.type === rfoTypes.RFO_OFFERING_MATERIAL}
            className={'radioButton'}
          />
          <span className={'radioButtonLabel'}>{t('Ei')}</span>
        </label>
      </div>
    )}
    <div className={cx(styles.typeWrapper__firstLevel, 'qa-receivingMaterial')}>
      <label>
        <input
          onChange={handleChange}
          type="radio"
          name="type"
          disabled={disabled}
          value={rfoTypes.RFO_RECEIVING_MATERIAL}
          checked={rfo.type === rfoTypes.RFO_RECEIVING_MATERIAL}
          className={'radioButton'}
        />
        <span className={'radioButtonLabel'}>{t('Etsin hyödynnettäviä materiaaleja')}</span>
      </label>
    </div>
    <div className={cx(styles.typeWrapper__firstLevel, 'qa-offeringServices')}>
      <label>
        <input
          onChange={handleChange}
          type="radio"
          name="type"
          disabled={disabled}
          value={rfoTypes.RFO_OFFERING_SERVICES}
          checked={rfo.type === rfoTypes.RFO_OFFERING_SERVICES}
          className={'radioButton'}
        />
        <span className={'radioButtonLabel'}>
          {t('Tarjoan jätehuolto- tai asiantuntijapalvelua')}
        </span>
      </label>
    </div>
  </div>
);

export const TitleFragment = ({ t, rfo, handleChange }) => (
  <Row className={formStyles.formRow}>
    <Col span={12} className={formStyles.formInputContainer}>
      <input
        name="title"
        id="title"
        type="text"
        value={rfo.title || ''}
        onChange={handleChange}
        className="qa-rfo-title"
      />
    </Col>
  </Row>
);

export const LocationWithPublicityCheckboxFragment = ({
  t,
  rfo,
  handleChange,
  handleMunicipality,
  handleMapLocation
}) => (
  <>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <>
          <input
            className="checkboxInput"
            type="checkbox"
            id="locationIsPrivate"
            name="locationIsPrivate"
            checked={rfo.locationIsPrivate || ''}
            onChange={handleChange}
          />
          <label htmlFor="locationIsPrivate" className="checkboxLabel">
            {t('Näytä tarkemmat sijaintitiedot vain rekisteröityneille käyttäjille.')}
          </label>
        </>
      </Col>
    </Row>
    <LocationFragment
      t={t}
      form={rfo}
      handleChange={handleChange}
      handleMunicipality={handleMunicipality}
      handleMapLocation={handleMapLocation}
    />
  </>
);

export const LocationFragment = ({
  t,
  form,
  handleChange,
  handleMunicipality,
  handleMapLocation
}) => (
  <>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>
            {t('Kohteen nimi')}
            <InfoBox
              infoText={t(
                'Kirjoita esimerkiksi laitosalueen tai työmaan nimi tai muu vapaa tunniste.'
              )}
            />
          </span>
          <input
            type="text"
            name="locationName"
            value={form.locationName || ''}
            onChange={handleChange}
          />
        </label>
      </Col>
    </Row>
    <Location
      municipalitiesOnly={true}
      handleChange={handleChange}
      handleMunicipality={handleMunicipality}
      handleMapLocation={handleMapLocation}
      rfo={form}
    />
  </>
);

export const ContactWithPublicityCheckboxFragment = ({ t, rfo, handleChange }) => (
  <>
    <ContactFragment t={t} form={rfo} handleChange={handleChange} />
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <>
          <input
            className="checkboxInput"
            id="contactIsPrivate"
            name="contactIsPrivate"
            type="checkbox"
            checked={rfo.contactIsPrivate || ''}
            onChange={handleChange}
          />
          <label htmlFor="contactIsPrivate" className="checkboxLabel">
            {t(
              'Näytä organisaation tiedot ja yhteystiedot vain Materiaalitorin kirjautuneille käyttäjille '
            )}
          </label>
        </>
      </Col>
    </Row>
  </>
);

export const ContactFragment = ({ t, form, handleChange }) => (
  <>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>{t('Nimi')}</span>{' '}
          <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
          <input
            name="contact_name"
            id="contact_name"
            type="text"
            value={form.contact_name || ''}
            onChange={handleChange}
          />
        </label>
      </Col>
    </Row>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>{t('Rooli organisaatiossa')}</span>
          <input
            name="contact_title"
            id="contact_title"
            type="text"
            value={form.contact_title || ''}
            onChange={handleChange}
          />
        </label>
      </Col>
    </Row>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>{t('Puhelinnumero')}</span>
          <input
            name="contact_phone"
            id="contact_phone"
            type="phone"
            value={form.contact_phone || ''}
            onChange={handleChange}
          />
        </label>
      </Col>
    </Row>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>{t('Sähköpostiosoite')}</span>{' '}
          <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
          <input
            name="contact_email"
            id="contact_email"
            type="email"
            value={form.contact_email || ''}
            onChange={handleChange}
          />
        </label>
      </Col>
    </Row>
  </>
);

export const ServiceListFragment = ({
  t,
  form,
  handleChange,
  onSubServiceAdd,
  onSubServiceRemove,
  services,
  currentSubServices,
  infoBox
}) => (
  <Row className={formStyles.formRow}>
    <Col span={8} sm={12} xs={12} className={formStyles.formInputContainer}>
      <label>
        <span className={formStyles.defaultLabelSpan}>
          {t('Tarjottava palvelu')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
          {infoBox && <InfoBox infoText={t(infoBox)} />}
        </span>
      </label>
      <ServiceSelectorFragment
        t={t}
        form={form}
        handleChange={handleChange}
        mainLabel={'Valitse palvelu'}
        subLabel={'Tarkenna tarjoamaasi palvelua'}
        onSubServiceAdd={onSubServiceAdd}
        onSubServiceRemove={onSubServiceRemove}
        services={services}
        currentSubServices={currentSubServices}
      />
    </Col>
  </Row>
);

export const ServiceDescriptionFragment = ({ t, form, handleChange, infoBox, required }) => (
  <Row className={formStyles.formRow}>
    <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
      <label>
        <span className={formStyles.defaultLabelSpan}>
          {t('Palvelun kuvaus')} {infoBox && <InfoBox infoText={t(infoBox)} />}{' '}
          {required && <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>}
        </span>
        <textarea
          name="serviceDescription"
          rows={6}
          value={form.serviceDescription}
          onChange={handleChange}
        />
      </label>
    </Col>
  </Row>
);

const searchSubServiceFn = t => searchString => value => {
  return (
    value.id.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
    t(value.id)
      .toLowerCase()
      .indexOf(searchString.toLowerCase()) > -1
  );
};

const subServiceIdsToSubServiceObj = (currentAvailableSubServices, selectedSubServiceIds) => {
  return currentAvailableSubServices.filter(subService =>
    (selectedSubServiceIds || []).some(
      selectedSubServiceId => selectedSubServiceId === subService.id
    )
  );
};

export const ServiceSelectorFragment = ({
  t,
  form,
  handleChange,
  mainLabel,
  subLabel,
  onSubServiceAdd,
  onSubServiceRemove,
  services,
  currentSubServices
}) => (
  <>
    <select onChange={handleChange} name="serviceName" value={form.serviceName || ''}>
      <option value="" disabled hidden>
        {t(mainLabel)}
      </option>
      {services.map((service, i) => {
        return (
          <option key={service.id} value={service.id}>
            {t(service.id)}
          </option>
        );
      })}
    </select>
    {currentSubServices &&
    currentSubServices.length > 0 && ( // this needs to be changed to Henris multiselect component, changing top level service should clear all selected subservices
        <div className={'qa-subservice-selector'}>
          <label>
            {t(subLabel)} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
          </label>
          <Select
            values={currentSubServices}
            onAdd={onSubServiceAdd}
            single={false}
            value={subServiceIdsToSubServiceObj(currentSubServices, form.subService)}
            displayFn={value => t(value.id)}
            searchFn={searchSubServiceFn(t)}
            keyFn={val => val.id}
            showAllOnFocus={true}
            onRemove={onSubServiceRemove}
          />
        </div>
      )}
  </>
);

export const ServiceFragment = ({
  t,
  rfo,
  handleChange,
  onSubServiceAdd,
  onSubServiceRemove,
  services,
  currentSubServices
}) => (
  <>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>
            {t('Palvelu')}{' '}
            {rfo.type === rfoTypes.RFO_OFFERING_WASTE && (
              <span className={'requiredIndicator'}>
                {t('(pakollinen, mikäli pyydetään TSV-palvelua)')}
              </span>
            )}
            <InfoBox infoText={t('Ensisijaisesti haettu palvelu.')} />
          </span>
        </label>
        <ServiceSelectorFragment
          t={t}
          form={rfo}
          handleChange={handleChange}
          mainLabel={'Valitse palvelu, jota ensisijaisesti haet jätteelle'}
          subLabel={'Tarkenna hakemaasi palvelua'}
          onSubServiceAdd={onSubServiceAdd}
          onSubServiceRemove={onSubServiceRemove}
          services={services}
          currentSubServices={currentSubServices}
        />
      </Col>
    </Row>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>
            {t('Haettavan palvelun kuvaus')}{' '}
            <span className={'requiredIndicator'}>
              {t('(pakollinen, mikäli pyydetään TSV-palvelua)')}
            </span>
            <InfoBox
              infoText={t(
                'Vaatimukset ja toiveet haettavalle palvelulle tai muuta kuvausta palvelusta.'
              )}
            />
          </span>
          <textarea
            name="serviceRequirements"
            rows={6}
            value={rfo.serviceRequirements}
            onChange={handleChange}
          />
        </label>
      </Col>
    </Row>
    <Row className={formStyles.formRow}>
      <Col span={12} sm={12} xs={12} className={formStyles.formInputContainer}>
        <label>
          <span className={formStyles.defaultLabelSpan}>
            {t('Palvelun toivottu ajankohta')}{' '}
            <span className={'requiredIndicator'}>
              {t('(pakollinen, mikäli pyydetään TSV-palvelua)')}
            </span>{' '}
            <InfoBox
              infoText={t(
                'Haettavan palvelun alku- ja päättymisaika, sopimuskauden pituus tai muu palvelunajankohtaan liittyvä tarkennus.'
              )}
            />
          </span>
          <textarea
            rows={6}
            name="serviceDuration"
            value={rfo.serviceDuration}
            onChange={handleChange}
          />
        </label>
      </Col>
    </Row>
  </>
);

export const DatePickerFragment = withNamespaces()(
  ({
    t,
    value,
    name,
    label,
    isTouchDevice,
    handleChange,
    required,
    stylesOverride,
    minDate,
    minDateModifier,
    maxDate,
    maxDateModifier,
    i18n
  }) => {
    registerLocale('fi-FI', fi);
    registerLocale('sv-FI', sv);

    const myStyles = { ...styles, ...stylesOverride };

    const getDate = (originalDate, dateModifier) => {
      const initialDate = originalDate ? new Date(originalDate) : new Date();
      const date =
        dateModifier && is(Number, dateModifier) ? addDays(initialDate, dateModifier) : initialDate;
      return date;
    };

    const touchInput = (
      <label className={myStyles.datePickerWrap}>
        <span className={cx(myStyles.datePickerLabel)}>
          {t(label)} {required && <span className={'requiredIndicator'}>{t('(pakollinen)')} </span>}
        </span>

        <input
          className={myStyles.datePickerInput}
          name={name}
          onChange={handleChange}
          type="date"
          min={format(getDate(minDate, minDateModifier), 'yyyy-MM-dd')}
          max={
            maxDate || maxDateModifier
              ? format(getDate(maxDate, maxDateModifier), 'yyyy-MM-dd')
              : null
          }
          value={value || ''}
        />
      </label>
    );

    const handleDatePickerChange = date => {
      const evnt = { target: { value: formatDateForSaving(date), name: name } };
      handleChange(evnt);
    };

    const nonTouchInput = (
      <label onClick={e => e.preventDefault()} className={myStyles.datePickerWrap}>
        <span className={cx(myStyles.datePickerLabel)}>
          {t(label)} {required && <span className={'requiredIndicator'}>{t('(pakollinen)')} </span>}
        </span>

        <DatePicker
          autoComplete="off"
          locale={i18n.language}
          name={name}
          dateFormat="d.M.yyyy"
          onChange={handleDatePickerChange}
          selected={value ? new Date(value) : null}
          minDate={getDate(minDate, minDateModifier)}
          maxDate={maxDate || maxDateModifier ? getDate(maxDate, maxDateModifier) : null}
          disabledKeyboardNavigation
          className={myStyles.datePickerInput}
        />
      </label>
    );

    return (
      <>
        <Row className={formStyles.formRow}>
          <Col span={6} sm={12} xs={12} className={formStyles.formInputContainer}>
            {isTouchDevice ? touchInput : nonTouchInput}
          </Col>
        </Row>
      </>
    );
  }
);

export const WasteFragment = ({ materials, handleChange, ewcs }) =>
  materials.map((val, idx) => {
    return (
      <React.Fragment key={idx}>
        <SingleWasteEdit material={val} handleMaterialChange={handleChange(idx)} ewcs={ewcs} />
      </React.Fragment>
    );
  });

export const MaterialFragment = ({ materials, handleChange }) =>
  materials.map((val, idx) => {
    return (
      <React.Fragment key={idx}>
        <SingleMaterialEdit material={val} handleMaterialChange={handleChange(idx)} />
      </React.Fragment>
    );
  });

export const ReceiveMaterialFragment = ({ materials, handleChange }) =>
  materials.map((val, idx) => {
    return (
      <React.Fragment key={idx}>
        <SingleReceiveMaterialEdit material={val} handleMaterialChange={handleChange(idx)} />
      </React.Fragment>
    );
  });

export const TsvFragment = ({ t, materials, handleChange }) =>
  materials.map((material, index) => {
    return (
      <Row key={`material-${index}`} className={cx(formStyles.formRow)}>
        <Col span={12} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <>
            <input
              className={cx('checkboxInput', formStyles.useTsvCheckboxInput)}
              id="useTsv"
              name="useTsv"
              type="checkbox"
              checked={material.useTsv || ''}
              onChange={handleChange(index)}
            />
            <label htmlFor="useTsv" className={cx('checkboxLabel', formStyles.useTsvCheckboxLabel)}>
              {t(
                'Haluan luoda ilmoituksen niin, että voin ilmoituksen voimassaolon jälkeen tarvittaessa pyytää kunnan toissijaista jätehuoltopalvelua (ns. TSV-palvelu).'
              )}
              <InfoBox
                infoText={
                  <Trans i18nKey="ilmoitussivun_tsv">
                    Mikäli et ilmoituksesta huolimatta löydä jätteellesi vastaanottajaa, sinun on
                    mahdollista pyytää kunnan jätelaitokselta jätehuoltopalvelua (kunnan
                    toissijainen jätehuoltopalvelu eli ns. TSV-palvelu). Jos valitset tämän,
                    täytettäväksesi tuleva ilmoituspohja täyttää jätelainsäädännössä ilmoitukselle
                    asetetut vaatimukset (mm. ilmoituksen 14 vuorokauden voimassaoloaika).
                    Lisätietoa
                    <Link to="/tietoa-palvelusta#tsv" target="_blank">
                      kunnan toissijaisesta jätehuoltopalvelusta
                    </Link>
                    .
                  </Trans>
                }
              />
            </label>
          </>
        </Col>
      </Row>
    );
  });
