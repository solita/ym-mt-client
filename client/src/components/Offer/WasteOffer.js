import React from 'react';
import { withNamespaces } from 'react-i18next';
import { regExpForNumberWithThreeDecimals } from '../../utils/text-utils';
import InfoBox from '../InfoBox/InfoBox';
import {
  ContactFragment,
  DatePickerFragment,
  LocationFragment,
  ServiceDescriptionFragment,
  ServiceListFragment
} from '../RequestForOffer/FormFragments';
import styles from './Offer.module.css';

export const WasteOffer = ({
  offer,
  handleChange,
  handleServiceChange,
  handleMunicipalityChange,
  handleMapLocation,
  isTouchDevice,
  onSubServiceAdd,
  onSubServiceRemove,
  services,
  getCurrentSubServices,
  isTsvRfo,
  t
}) => {
  return (
    <div>
      <h2>{t('Palvelun kuvaus')}</h2>
      <ServiceListFragment
        t={t}
        form={offer}
        handleChange={handleServiceChange}
        onSubServiceAdd={onSubServiceAdd}
        onSubServiceRemove={onSubServiceRemove}
        services={services}
        currentSubServices={getCurrentSubServices(offer.serviceName, services)}
        infoBox={t(
          'Valitse tarjottavaa palvelua mahdollisimman hyvin kuvaava palvelu. Palveluun sisältyvää jätteen käsittelyä voit tarvittaessa tarkentaa. Eri käsittelymenetelmiä voi valita useita.\n\n”Kiinteistön kokonaispalvelu” tarkoittaa palvelua, jossa huolehditaan kiinteistöllä syntyvien eri jätteiden jätehuollon järjestämisestä kokonaisuutena.'
        )}
      />
      <ServiceDescriptionFragment t={t} form={offer} handleChange={handleChange} required={true} />
      <div>
        <label htmlFor="timeOfService">
          {t('Palvelun ajankohta ja kesto')}
          {isTsvRfo && <span className={'requiredIndicator'}> {t('(pakollinen)')}</span>}
        </label>
        <input
          name="timeOfService"
          id="timeOfService"
          type="text"
          value={offer.timeOfService || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="priceOfService">
          {t('Palvelun hinta')}
          {isTsvRfo && <span className={'requiredIndicator'}> {t('(pakollinen)')}</span>}
        </label>
        <input
          className={styles.shortField}
          name="priceOfService"
          id="priceOfService"
          type="text"
          pattern={regExpForNumberWithThreeDecimals}
          placeholder="0"
          value={offer.priceOfService || ''}
          onChange={handleChange}
        />{' '}
        €
      </div>
      <div>
        <label htmlFor="priceDescriptionOfService">{t('Hintaa koskeva lisätieto')}</label>
        <textarea
          name="priceDescriptionOfService"
          id="priceDescriptionOfService"
          rows={6}
          value={offer.priceDescriptionOfService || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="otherTermsOfService">
          {t('Palvelun ehdot')}{' '}
          <InfoBox
            infoText={t(
              'Määrittele tarjousta koskevat ehdot. Kukin vastaa itse omista tarjouksista sekä niiden ehdoista ja niiden pohjalta mahdollisesti tehtävistä sopimuksista. Mikäli tarjous hyväksytään, tarjoaja sitoutuu tarjoamaan palvelun tarjouksensa yhteydessä ilmoittamiensa ehtojen mukaisesti.'
            )}
          />
        </label>
        <textarea
          name="otherTermsOfService"
          id="otherTermsOfService"
          rows={6}
          value={offer.otherTermsOfService || ''}
          onChange={handleChange}
        />
      </div>
      <h2>
        {t('Palvelun sijainti')}{' '}
        <InfoBox
          infoText={t(
            'Palvelun sijainti vähintään sijaintikunnan tarkkuudella. Katuosoitteen antaminen on suositeltavaa erityisesti mm. käsittelypalveluja ja varastointia tarjotessa. Mikäli tarjoat kuljetuspalvelua, laita sijainti, josta jäte noudetaan.'
          )}
        />
      </h2>
      <LocationFragment
        t={t}
        form={offer}
        handleChange={handleChange}
        handleMunicipality={handleMunicipalityChange}
        handleMapLocation={handleMapLocation}
      />
      <h2>{t('Tarjouksen voimassaoloaika')}</h2>
      <DatePickerFragment
        isTouchDevice={isTouchDevice}
        value={offer.expires}
        name={'expires'}
        handleChange={handleChange}
        label={'Voimassaoloaika'}
        t={t}
        minDateModifier={1}
        required={true}
      />
      <h2>{t('Tarjoajan tiedot')}</h2>
      <ContactFragment t={t} form={offer} handleChange={handleChange} />
      <div>
        <input
          className="checkboxInput"
          name="permissionAssurance"
          id="permissionAssurance"
          type="checkbox"
          checked={offer.permissionAssurance || ''}
          onChange={handleChange}
        />
        <label htmlFor="permissionAssurance" className="checkboxLabel">
          {t(
            'Vakuutan, että organisaatiolla on tarvittavat viranomaisluvat ja hyväksynnät vastaanottaa kyseistä jätettä'
          )}{' '}
          <InfoBox
            infoText={t(
              'Jätteen saa luovuttaa vain vastaanottajalle, jolla on jätelain mukainen hyväksyntä vastaanottaa jätettä. Jätteen haltijan tulee varmistaa ennen jätehuoltopalvelua koskevan sopimuksen tekemistä, että kyseisellä palveluntarjoajalla on tarvittava viranomaislupa ja -hyväksyntä vastaanottaa jäte.'
            )}
          />
        </label>
      </div>
    </div>
  );
};

export default withNamespaces()(WasteOffer);
