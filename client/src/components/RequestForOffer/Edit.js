import cx from 'classnames';
import { differenceInDays } from 'date-fns';
import {
  allPass,
  both,
  complement,
  compose,
  isEmpty,
  isNil,
  path,
  pathEq,
  pathSatisfies,
  propSatisfies
} from 'ramda';
import React, { PureComponent } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, Prompt, Redirect } from 'react-router-dom';
import { ILMOITUKSET, LISAA_ILMOITUS, LISAA_ILMOITUS_JATE, MUOKKAA_ILMOITUS } from '../../routes';
import { postJson, putJson } from '../../services/ApiService';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { rfoOperations } from '../../state/ducks/rfo';
import { dateIsInThePast } from '../../utils/date-utils';
import { handlePrefills } from '../../utils/user-utils';
import Attachment from '../Attachment/Attachment';
import PrivateComponent from '../Auth/PrivateComponent';
import suspendUntilAuthorized from '../Auth/suspendUntilAuthorized';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import InfoBox from '../InfoBox/InfoBox';
import { Col, Container, Row } from '../Layout/Layout';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';
import RegionSelect from '../RegionSelect/RegionSelect';
import CloseRfoButton from './CloseRfoButton';
import {
  ContactWithPublicityCheckboxFragment,
  DatePickerFragment,
  LocationWithPublicityCheckboxFragment,
  MaterialFragment,
  ReceiveMaterialFragment,
  ServiceDescriptionFragment,
  ServiceFragment,
  ServiceListFragment,
  TitleFragment,
  TsvFragment,
  TypeSelectFragment,
  WasteFragment
} from './FormFragments';
import styles from './RequestForOffer.module.css';
import { getCurrentSubServices, isClosed, rfoStateToRequestPayload } from './rfo-utils';
import * as rfoTypes from './types';
import Preview from './View';

const isNotEmpty = complement(isEmpty);
const isNotNil = complement(isNil);

const handleTypePreSelection = (path, key, handleChange) => {
  if (path === LISAA_ILMOITUS_JATE) {
    handleChange(key, rfoTypes.RFO_OFFERING_WASTE);
  }
};

const isTsv = rfo => {
  return rfo.type === rfoTypes.RFO_OFFERING_WASTE && pathEq(['materials', 0, 'useTsv'], true)(rfo);
};

const isInFuture = expires => {
  if (!expires) return false;
  return !dateIsInThePast(new Date(expires));
};

const isEnoughAhead = expires => {
  if (!expires) return false;
  return differenceInDays(new Date(expires), new Date()) >= 14;
};

const validForm = (rfo, loading = false, services) => {
  if (loading) {
    return false;
  }

  const currentSubServices = getCurrentSubServices(rfo.serviceName, services);
  const subServiceIsNeeded = currentSubServices && currentSubServices.length > 0;
  const subServiceIsSelected = rfo.subService && rfo.subService.length > 0;

  switch (rfo.type) {
    case rfoTypes.RFO_OFFERING_WASTE: {
      const nonTsvOptions = allPass([
        propSatisfies(both(isNotEmpty, isNotNil), 'title'),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'classification']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'industry']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'description']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'continuity']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'quantityAmount']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'quantityUnit']),
        propSatisfies(both(isNotEmpty, isNotNil), 'locationCity'),
        propSatisfies(both(isNotEmpty, isNotNil), 'expires'),
        propSatisfies(isInFuture, 'expires'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_name'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_email'),
        () => !subServiceIsNeeded || (subServiceIsNeeded && subServiceIsSelected)
      ])(rfo);

      let tsvOptions = true;

      if (isTsv(rfo)) {
        tsvOptions = allPass([
          propSatisfies(both(isNotEmpty, isNotNil), 'serviceName'),
          propSatisfies(both(isNotEmpty, isNotNil), 'serviceRequirements'),
          propSatisfies(both(isNotEmpty, isNotNil), 'serviceDuration'),
          propSatisfies(isEnoughAhead, 'expires')
        ])(rfo);
      }

      return nonTsvOptions && tsvOptions;
    }
    case rfoTypes.RFO_OFFERING_MATERIAL: {
      return allPass([
        propSatisfies(both(isNotEmpty, isNotNil), 'title'),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'classification']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'industry']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'continuity']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'quantityAmount']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'quantityUnit']),
        propSatisfies(both(isNotEmpty, isNotNil), 'locationCity'),
        propSatisfies(both(isNotEmpty, isNotNil), 'expires'),
        propSatisfies(isInFuture, 'expires'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_name'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_email')
      ])(rfo);
    }
    case rfoTypes.RFO_RECEIVING_MATERIAL: {
      return allPass([
        propSatisfies(both(isNotEmpty, isNotNil), 'title'),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'classification']),
        pathSatisfies(both(isNotEmpty, isNotNil), ['materials', 0, 'description']),
        propSatisfies(both(isNotEmpty, isNotNil), 'expires'),
        propSatisfies(isInFuture, 'expires'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_name'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_email')
      ])(rfo);
    }
    case rfoTypes.RFO_OFFERING_SERVICES: {
      return allPass([
        propSatisfies(both(isNotEmpty, isNotNil), 'title'),
        propSatisfies(both(isNotEmpty, isNotNil), 'serviceName'),
        propSatisfies(both(isNotEmpty, isNotNil), 'locationCity'),
        propSatisfies(both(isNotEmpty, isNotNil), 'expires'),
        propSatisfies(isInFuture, 'expires'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_name'),
        propSatisfies(both(isNotEmpty, isNotNil), 'contact_email'),
        () => !subServiceIsNeeded || (subServiceIsNeeded && subServiceIsSelected)
      ])(rfo);
    }

    default: {
      return true;
    }
  }
};

export const promptMessageFn = t => location => {
  const allowed = /^\/ilmoitukset\/(muokkaa\/)?[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  return location.pathname.match(allowed) ? true : t('Muutokset menetetään, jos poistut sivulta.');
};

export class EditRfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: undefined,
      loading: false,
      editMode: false,
      previewMode: false,
      rfoId: undefined
    };
  }

  fetchRfo(rfoId, regionsAndMunicipalities) {
    this.props.fetchRfoForEdit(rfoId, regionsAndMunicipalities);
  }

  componentDidMount() {
    // In editing:
    if (this.props.match.path === MUOKKAA_ILMOITUS + '/:id') {
      const rfoId = path(['match', 'params', 'id'])(this.props);
      this.setState({ editMode: true, rfoId: rfoId });

      if (this.props.configurationsFetched) {
        this.fetchRfo(rfoId, this.props.regionsAndMunicipalities);
      }
    }
    // In copying (creating a new rfo by copying an existing rfo):
    if (this.props.match.path === LISAA_ILMOITUS + '/:id') {
      const rfoId = path(['match', 'params', 'id'])(this.props);
      this.setState({ rfoId: rfoId });

      if (this.props.configurationsFetched) {
        this.fetchRfo(rfoId, this.props.regionsAndMunicipalities);
      }
    }
    // In creating a new rfo:
    else {
      if (this.props.rfo.materials.length === 0) {
        this.props.addMaterial();
      }

      handleTypePreSelection(this.props.match.path, 'type', this.props.handleChange);
      handlePrefills(this.props.rfo, this.props.user, this.props.handleChange);
    }
  }

  componentDidUpdate(prevProps) {
    // Fetch rfo if the configurations were not ready before but are ready now and we are either editing or copying:
    if (prevProps.configurationsFetched !== this.props.configurationsFetched && this.state.rfoId) {
      this.fetchRfo(this.state.rfoId, this.props.regionsAndMunicipalities);
    }
  }

  componentWillUnmount() {
    this.props.clearForm();
    this.props.setRfoHasChanges(false);
  }

  // Handles material input field changes:
  handleMaterialChange = index => event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.handleMaterialChange(index, name, value);
  };

  // Handles input field changes of this file's inputs:
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.handleChange(name, value);
    if (!this.props.formHasChanges) {
      this.props.setRfoHasChanges(true);
    }
  };

  handleMunicipalityChange = municipality => {
    if (municipality) {
      this.props.handleChange('locationCity', municipality);
    } else {
      this.props.handleChange('locationCity', undefined);
    }
  };

  handleMapLocation = location => {
    this.props.handleChange('mapLocation', location);
  };

  addRegion = region => {
    this.props.toggleRegion(region);
  };

  deleteRegion = region => {
    this.props.deleteRegion(region);
  };

  addSubService = service => {
    this.props.addSubService(service);
  };

  deleteSubService = service => {
    this.props.deleteSubService(service);
  };

  deleteAllSubServices = serviceId => {
    this.props.deleteAllSubServices(serviceId);
  };

  preview = event => {
    const { type, data } = rfoStateToRequestPayload(this.props.rfo);
    const previewableData = {
      rfoType: type,
      ...data
    };

    if (type === rfoTypes.RFO_RECEIVING_MATERIAL) {
      previewableData.materialsWanted = previewableData.materials;
    }
    window.scrollTo(0, 0);
    this.setState({ previewData: previewableData, previewMode: true });
  };

  submit = () => {
    const postUrl = '/api/rfo';
    const payload = rfoStateToRequestPayload(this.props.rfo);

    if (!this.state.editMode) {
      postJson(postUrl, payload)
        .then(res => {
          const rfoGuid = res.data.id;

          addToastNotification(this.props.t('Ilmoitus luotu.'), ToastTypes.SUCCESS);

          this.props.clearForm();

          this.setState({ redirectTo: `${ILMOITUKSET}/${rfoGuid}`, loading: false });
        })
        .catch(err => {
          addToastNotification(this.props.t('Ilmoituksen luonti epäonnistui.'), ToastTypes.WARNING);

          this.setState({ loading: false });
        });
    } else {
      const rfoId = this.state.rfoId;

      putJson(postUrl + '/' + rfoId, payload)
        .then(res => {
          const rfoGuid = res.data.id;

          addToastNotification(this.props.t('Muutokset tallennettu.'), ToastTypes.SUCCESS);

          this.props.clearForm();
          this.props.clearRfoFromView(); // Clear the rfo from view since we will direct to the view and we want to see the updated data

          this.setState({ redirectTo: `${ILMOITUKSET}/${rfoGuid}`, loading: false });
        })
        .catch(err => {
          addToastNotification(this.props.t('Tallennus epäonnistui.'), ToastTypes.WARNING);

          this.setState({ loading: false });
        });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    return this.submit();
  };

  addMaterial = () => {
    this.props.addMaterial();
  };

  // @TODO: Remove window confirm propmpt and use some other.
  deleteMaterial = (t, index, description) => {
    if (
      window.confirm(
        t('Haluatko varmasti poistaa materiaalin?', {
          number: index + 1,
          description: description
        })
      )
    ) {
      this.props.deleteMaterial(index);
    }
  };

  handleServiceChange = event => {
    this.handleChange(event);
    if (event.target.name === 'serviceName') {
      this.props.deleteAllSubServices();
    }
  };

  render() {
    const { t, isTouchDevice, rfo, services, ewcs, regionsAndMunicipalities } = this.props;
    const { redirectTo, loading, editMode } = this.state;

    const getForm = type => {
      const dateInfoTextKey = isTsv(rfo)
        ? 'Ilmoita päivämäärä, mihin saakka ilmoitus on voimassa. Ilmoitus on nähtävissä Materiaalitorissa ja siihen voi vastata voimassaolon aikana. Voimassaoloaika tulee olla vähintään 14 vuorokautta ja enintään 6 kuukautta, jonka jälkeen ilmoitus poistuu Materiaalitorin ilmoituksista, mutta arkistoituu ilmoittajan omille sivuille, josta se on mahdollista tarvittaessa julkaista uudelleen. Mikäli ilmoitukseen ei ole voimassaoloaikana tullut hyväksyttäviä vastauksia, on mahdollista tehdä pyyntö kunnan toissijaisesta jätehuoltopalvelusta Materiaalitorin kautta. Materiaalitori ilmoittaa, kun pyynnön tekeminen on mahdollista.'
        : 'Ilmoita päivämäärä, mihin saakka ilmoitus on voimassa. Ilmoitus on nähtävissä Materiaalitorissa ja siihen voi vastata voimassaolon aikana. Voimassaoloaika voi olla enintään 6 kuukautta, jonka jälkeen ilmoitus poistuu Materiaalitorin ilmoituksista, mutta arkistoituu ilmoittajan omille sivuille, josta se on mahdollista tarvittaessa julkaista uudelleen.';

      switch (rfo.type) {
        case rfoTypes.RFO_OFFERING_WASTE: {
          const currentSubServices = getCurrentSubServices(rfo.serviceName, services);
          return (
            <>
              <TsvFragment
                t={t}
                materials={rfo.materials}
                handleChange={this.handleMaterialChange}
              />
              <h2>
                <label htmlFor="title">
                  {t('Ilmoituksen otsikko')}{' '}
                  <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                  <InfoBox
                    infoText={t(
                      'Materiaalin tai palvelun vapaamuotoinen ja kuvaava nimi. Tee otsikosta selkeä ja kuvaava sillä se on hakulistauksissa, ilmoituksen sivulla yms. kaikista näkyvin elementti. Vältä otsikossa ”tarjotaan” –tyyppisiä termejä, koska se käy lukijalle hakuehdoista ja sivun tiedoista ilmi muutenkin. Otsikon muotoilussa on hyvä ottaa huomioon, että ilmoituksia voidaan hakea myös otsikossa olevien sanojen perusteella.'
                    )}
                  />
                </label>
              </h2>
              <TitleFragment t={t} handleChange={this.handleChange} rfo={rfo} />
              <h2>{t('Jätteen kuvaus')}</h2>
              <WasteFragment
                materials={rfo.materials}
                handleChange={this.handleMaterialChange}
                ewcs={ewcs}
              />
              <h2>
                {t('Liitteet ja kuvat')}{' '}
                <InfoBox
                  infoText={t(
                    'Lisätiedot jätteestä liitteiden, kuten kuvien ja muiden liitetiedostojen muodossa. Sallitut tiedostomuodot ovat jpg, png, gif, pdf, doc(x), xls(x) ja ppt(x).'
                  )}
                />
              </h2>
              <Attachment
                t={t}
                addFiles={this.props.addFiles}
                attachments={rfo.attachments}
                deleteFile={this.props.deleteFile}
                multiple={true}
              />
              <h2>
                {t('Haettava palvelu ja sen kesto')}{' '}
                <InfoBox
                  infoText={t(
                    'Jätteen saa luovuttaa vain vastaanottajalle, jolla on jätelain mukainen hyväksyntä vastaanottaa jätettä. Jätteen haltijan tulee varmistaa ennen jätehuoltopalvelua koskevan sopimuksen tekemistä, että kyseisellä palveluntarjoajalla on oikeus vastaanottaa jäte. \n\n Palvelua haettaessa on syytä huomioida jätelain mukainen velvollisuus noudattaa etusijajärjestystä. \n\n Etusijajärjestyksen mukaan ensisijaisesti on vähennettävä syntyvän jätteen määrää ja haitallisuutta. Jos jätettä kuitenkin syntyy, jätteen haltijan on ensisijaisesti valmisteltava jäte uudelleenkäyttöä varten tai toissijaisesti kierrätettävä se. Jos kierrätys ei ole mahdollista, jätteen haltijan on hyödynnettävä jäte muulla tavoin, mukaan lukien hyödyntäminen energiana. Jos hyödyntäminen ei ole mahdollista, jäte on loppukäsiteltävä.'
                  )}
                />
              </h2>
              <ServiceFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleServiceChange}
                onSubServiceAdd={this.addSubService}
                onSubServiceRemove={this.deleteSubService}
                services={services}
                currentSubServices={currentSubServices}
              />
              <h2>
                {t('Jätteen sijainti')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
                <InfoBox
                  infoText={t(
                    'Jätteen sijainti vähintään sijaintikunnan tarkkuudella. Katuosoitteen antaminen on suositeltavaa erityisesti jätteen kuljetuspalvelua haettaessa. Voit halutessasi valita, että tarkka katuosoitetieto näkyy vain Materiaalitoriin kirjautuneille käyttäjille. Sijainti näytetään joka tapauksessa vähintään kunnan tarkkuudella myös Materiaalitoriin kirjautumattomille käyttäjille.'
                  )}
                />
              </h2>
              <LocationWithPublicityCheckboxFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleChange}
                handleMunicipality={this.handleMunicipalityChange}
                handleMapLocation={this.handleMapLocation}
              />
              <h2>
                {t('Ilmoituksen voimassaoloaika')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                <InfoBox infoText={t(dateInfoTextKey)} />
              </h2>
              <DatePickerFragment
                isTouchDevice={isTouchDevice}
                minDateModifier={isTsv(rfo) ? 15 : 1}
                value={rfo.expires || ''}
                name={'expires'}
                handleChange={this.handleChange}
                label={'Voimassaoloaika'}
                t={t}
                maxDateModifier={180}
              />
              <h2>{t('Yhteyshenkilön tiedot')}</h2>
              <ContactWithPublicityCheckboxFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleChange}
              />
              <div className={'divider'} />
            </>
          );
        }
        case rfoTypes.RFO_OFFERING_MATERIAL: {
          return (
            <>
              <h2>
                <label htmlFor="title">
                  {t('Ilmoituksen otsikko')}{' '}
                  <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                  <InfoBox
                    infoText={t(
                      'Materiaalin tai palvelun vapaamuotoinen ja kuvaava nimi. Tee otsikosta selkeä ja kuvaava sillä se on hakulistauksissa, ilmoituksen sivulla yms. kaikista näkyvin elementti. Vältä otsikossa ”tarjotaan” –tyyppisiä termejä, koska se käy lukijalle hakuehdoista ja sivun tiedoista ilmi muutenkin. Otsikon muotoilussa on hyvä ottaa huomioon, että ilmoituksia voidaan hakea myös otsikossa olevien sanojen perusteella.'
                    )}
                  />
                </label>
              </h2>
              <TitleFragment t={t} handleChange={this.handleChange} rfo={rfo} />
              <h2>{t('Materiaalin kuvaus')}</h2>
              <MaterialFragment
                materials={rfo.materials}
                handleChange={this.handleMaterialChange}
              />
              <h2>
                {t('Liitteet ja kuvat')}{' '}
                <InfoBox
                  infoText={t(
                    'Lisätiedot jätteestä liitteiden, kuten kuvien ja muiden liitetiedostojen muodossa. Sallitut tiedostomuodot ovat jpg, png, gif, pdf, doc(x), xls(x) ja ppt(x).'
                  )}
                />
              </h2>
              <Attachment
                t={t}
                addFiles={this.props.addFiles}
                attachments={rfo.attachments}
                deleteFile={this.props.deleteFile}
                multiple={true}
              />
              <h2>
                {t('Materiaalin sijainti')}
                <InfoBox
                  infoText={t(
                    'Materiaalin sijainti vähintään sijaintikunnan tarkkuudella. Katuosoitteen antaminen on suositeltavaa. Voit halutessasi valita, että tarkka katuosoitetieto näkyy vain Materiaalitoriin kirjautuneille käyttäjille. Sijainti näytetään joka tapauksessa vähintään kunnan tarkkuudella myös Materiaalitoriin kirjautumattomille käyttäjille'
                  )}
                />
              </h2>
              <LocationWithPublicityCheckboxFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleChange}
                handleMunicipality={this.handleMunicipalityChange}
                handleMapLocation={this.handleMapLocation}
              />
              <h2>
                {t('Ilmoituksen voimassaoloaika')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                <InfoBox infoText={t(dateInfoTextKey)} />
              </h2>
              <DatePickerFragment
                isTouchDevice={isTouchDevice}
                value={rfo.expires || ''}
                name={'expires'}
                handleChange={this.handleChange}
                label={'Voimassaoloaika'}
                t={t}
                minDateModifier={1}
                maxDateModifier={180}
              />
              <h2>{t('Yhteyshenkilön tiedot')}</h2>
              <ContactWithPublicityCheckboxFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleChange}
              />
              <div className={styles.divider} />
              <div className={'divider'} />
            </>
          );
        }
        case rfoTypes.RFO_RECEIVING_MATERIAL: {
          return (
            <>
              <h2>
                <label htmlFor="title">
                  {t('Ilmoituksen otsikko')}{' '}
                  <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
                  <InfoBox
                    infoText={t(
                      'Materiaalin tai palvelun vapaamuotoinen ja kuvaava nimi. Tee otsikosta selkeä ja kuvaava sillä se on hakulistauksissa, ilmoituksen sivulla yms. kaikista näkyvin elementti. Vältä otsikossa ”tarjotaan” –tyyppisiä termejä, koska se käy lukijalle hakuehdoista ja sivun tiedoista ilmi muutenkin. Otsikon muotoilussa on hyvä ottaa huomioon, että ilmoituksia voidaan hakea myös otsikossa olevien sanojen perusteella.'
                    )}
                  />
                </label>
              </h2>
              <TitleFragment t={t} handleChange={this.handleChange} rfo={rfo} />
              <h2>{t('Materiaalin ja tarpeen kuvaus')}</h2>
              <ReceiveMaterialFragment
                materials={rfo.materials}
                handleChange={this.handleMaterialChange}
              />
              <h2>
                {t('Materiaalin sijainti')}
                <InfoBox infoText={t('Kunnat tai maakunnat, joiden alueelta etsit materiaalia')} />
              </h2>
              <p>
                <strong>{t('Valitse alueet')}</strong>
              </p>
              <div className={'qa-region-selector'}>
                <RegionSelect
                  handleChange={this.addRegion}
                  value={rfo.regions}
                  onRemove={region => this.deleteRegion(region)}
                />
              </div>

              <h2>
                {t('Liitteet ja kuvat')}{' '}
                <InfoBox
                  infoText={t(
                    'Lisätiedot jätteestä liitteiden, kuten kuvien ja muiden liitetiedostojen muodossa. Sallitut tiedostomuodot ovat jpg, png, gif, pdf, doc(x), xls(x) ja ppt(x).'
                  )}
                />
              </h2>
              <Attachment
                t={t}
                addFiles={this.props.addFiles}
                attachments={rfo.attachments}
                deleteFile={this.props.deleteFile}
                multiple={true}
              />
              <h2>
                {t('Ilmoituksen voimassaoloaika')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                <InfoBox infoText={t(dateInfoTextKey)} />
              </h2>
              <DatePickerFragment
                isTouchDevice={isTouchDevice}
                value={rfo.expires || ''}
                name={'expires'}
                handleChange={this.handleChange}
                label={'Voimassaoloaika'}
                t={t}
                minDateModifier={1}
                maxDateModifier={180}
              />
              <h2>{t('Yhteyshenkilön tiedot')}</h2>
              <ContactWithPublicityCheckboxFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleChange}
              />
              <div className={styles.divider} />
              <div className={'divider'} />
            </>
          );
        }
        case rfoTypes.RFO_OFFERING_SERVICES: {
          const currentSubServices = getCurrentSubServices(rfo.serviceName, services);
          return (
            <>
              <h2>
                <label htmlFor="title">
                  {t('Ilmoituksen otsikko')}{' '}
                  <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                  <InfoBox
                    infoText={t(
                      'Materiaalin tai palvelun vapaamuotoinen ja kuvaava nimi. Tee otsikosta selkeä ja kuvaava sillä se on hakulistauksissa, ilmoituksen sivulla yms. kaikista näkyvin elementti. Vältä otsikossa ”tarjotaan” –tyyppisiä termejä, koska se käy lukijalle hakuehdoista ja sivun tiedoista ilmi muutenkin. Otsikon muotoilussa on hyvä ottaa huomioon, että ilmoituksia voidaan hakea myös otsikossa olevien sanojen perusteella.'
                    )}
                  />
                </label>
              </h2>
              <TitleFragment t={t} handleChange={this.handleChange} rfo={rfo} />
              <h2>{t('Palvelun kuvaus')} </h2>
              <ServiceListFragment
                t={t}
                handleChange={this.handleServiceChange}
                form={rfo}
                onSubServiceAdd={this.addSubService}
                onSubServiceRemove={this.deleteSubService}
                services={services}
                currentSubServices={currentSubServices}
                infoBox={t(
                  'Valitse tarjottavaa palvelua mahdollisimman hyvin kuvaava palvelu. Palveluun sisältyvää jätteen käsittelyä voit tarvittaessa tarkentaa. Eri käsittelymenetelmiä voi valita useita. Valmiiden ilmoitusten hakua voi rajata tämän palveluluokittelun perusteella. ”Kiinteistön kokonaispalvelu” tarkoittaa palvelua, jossa huolehditaan kiinteistöllä syntyvien eri jätteiden jätehuollon järjestämisestä kokonaisuutena.'
                )}
              />
              <ServiceDescriptionFragment
                t={t}
                handleChange={this.handleChange}
                form={rfo}
                infoBox={t(
                  'Mahdollisimman selkeä kuvaus tarjoamastasi palvelusta. Yksilöi myös tarvittaessa, mille jätteille tai materiaaleille palvelu soveltuu.'
                )}
                required={false}
              />
              <h2>
                {t('Liitteet ja kuvat')}
                <InfoBox
                  infoText={t(
                    'Lisätiedot palvelusta liitteiden, kuten kuvien ja muiden liitetiedostojen muodossa. Sallitut tiedostomuodot ovat jpg, png, gif, pdf, doc(x), xls(x) ja ppt(x).'
                  )}
                />
              </h2>
              <Attachment
                t={t}
                addFiles={this.props.addFiles}
                attachments={rfo.attachments}
                deleteFile={this.props.deleteFile}
                multiple={true}
              />
              <h2>
                {t('Palvelun sijainti')}{' '}
                <InfoBox
                  infoText={t(
                    'Palvelun sijainti vähintään sijaintikunnan tarkkuudella. Katuosoitteen antaminen on suositeltavaa erityisesti mm. käsittelypalveluja ja varastointia tarjotessa. Voit halutessasi valita, että tarkka katuosoitetieto näkyy vain Materiaalitoriin kirjautuneille käyttäjille. Sijainti näytetään joka tapauksessa vähintään kunnan tarkkuudella myös Materiaalitoriin kirjautumattomille käyttäjille. Mikäli sijainteja on useita tai tarjoat esimerkiksi kuljetuspalvelua tietyllä alueella, voit valita sijainteja alueet-valikosta.'
                  )}
                />{' '}
              </h2>
              <LocationWithPublicityCheckboxFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleChange}
                handleMunicipality={this.handleMunicipalityChange}
                handleMapLocation={this.handleMapLocation}
              />
              <p>
                <strong>
                  {t('Valitse alueet')}
                  <InfoBox
                    infoText={t(
                      'Voit ilmoittaa useita sijainteja lisäämällä kuntia tai maakuntia, joiden alueella tarjoat palvelua. Aloita kirjoittamalla kenttään kunnan tai maakunnan nimeä ja saat valmiita ehdotuksia, joista voit valita.'
                    )}
                  />
                </strong>
              </p>
              <div className={'qa-region-selector'}>
                <RegionSelect
                  handleChange={this.addRegion}
                  value={rfo.regions}
                  onRemove={region => this.deleteRegion(region)}
                />
              </div>
              <h2>
                {t('Ilmoituksen voimassaoloaika')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                <InfoBox infoText={t(dateInfoTextKey)} />
              </h2>
              <DatePickerFragment
                isTouchDevice={isTouchDevice}
                value={rfo.expires || ''}
                name={'expires'}
                handleChange={this.handleChange}
                label={'Voimassaoloaika'}
                t={t}
                minDateModifier={1}
                maxDateModifier={180}
              />
              <h2>{t('Yhteyshenkilön tiedot')}</h2>
              <ContactWithPublicityCheckboxFragment
                t={t}
                rfo={rfo}
                handleChange={this.handleChange}
              />
              <div className={'divider'} />
            </>
          );
        }

        default:
          return null;
      }
    };

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Loader loading={this.props.loadingRfo}>
            <Row className={`${styles.container}`} options={{ center: true }}>
              <Col span={8} sm={10} xs={12}>
                <h1 className={styles.mainHeading}>
                  {editMode ? t('Muokkaa ilmoitusta') : t('Lisää ilmoitus')}
                </h1>
                {!editMode && (
                  <p className={styles.subHeading}>
                    {t(
                      'Lisää ilmoitus Materiaalitoriin valitsemalla tilanteeseesi sopiva ilmoitustyyppi.'
                    )}
                  </p>
                )}

                {editMode && !this.props.loadingRfo && (
                  <PrivateComponent doesNotBelongToBusiness={path(['businessId'], rfo)}>
                    <h2>{t('Et voi muokata toisen yrityksen ilmoitusta.')}</h2>
                  </PrivateComponent>
                )}

                <PrivateComponent
                  {...(editMode ? { belongsToBusiness: path(['businessId'], rfo) } : {})}
                >
                  <>
                    {isClosed(rfo) ? (
                      <h2>{t('Et voi muokata suljettua ilmoitusta.')}</h2>
                    ) : (
                      <>
                        {this.state.previewMode && (
                          <>
                            <Preview
                              rfo={this.state.previewData}
                              t={t}
                              isInPreviewMode={true}
                              regionsAndMunicipalities={regionsAndMunicipalities}
                              ewcs={ewcs}
                            />
                            <button
                              className={cx(styles.submitButton)}
                              type="button"
                              onClick={() => this.setState({ previewMode: false })}
                            >
                              {t('Takaisin')}
                            </button>
                            <button
                              className={cx(styles.submitButton, 'qa-submit-rfo')}
                              type="button"
                              onClick={this.handleSubmit}
                              disabled={!validForm(rfo, loading, services)}
                            >
                              {!editMode
                                ? t('Lähetä ilmoitus')
                                : rfo.rfoHasExpired
                                ? t('Julkaise uudelleen')
                                : t('Tallenna ilmoitus')}
                            </button>
                          </>
                        )}
                        {!this.state.previewMode && (
                          <form
                            onSubmit={this.handleSubmit}
                            autoComplete="off"
                            style={{ position: 'relative' }}
                          >
                            <TypeSelectFragment
                              t={t}
                              handleChange={this.handleChange}
                              rfo={rfo}
                              disabled={editMode}
                            />

                            <div className={'divider'} />

                            {getForm(rfo.type)}
                            <div className={cx(styles.rfoFormButtonsWrapper, styles.buttonWrap)}>
                              {rfo.type && rfo.type !== 'wasteOrMaterial' && this.state.editMode && (
                                <>
                                  <Link
                                    className="buttonStyle"
                                    to={`${ILMOITUKSET}/${this.state.rfoId}`}
                                  >
                                    {t('Takaisin ilmoitukseen')}
                                  </Link>
                                </>
                              )}

                              {rfo.type && rfo.type !== 'wasteOrMaterial' && (
                                <>
                                  <button
                                    className={cx(styles.submitButton, 'qa-preview-rfo')}
                                    type="button"
                                    onClick={this.preview}
                                    disabled={!validForm(rfo, loading, services)}
                                  >
                                    {t('Esikatsele ilmoitusta')}
                                  </button>
                                </>
                              )}
                              {rfo.type && this.state.editMode && (
                                <CloseRfoButton
                                  t={t}
                                  rfoId={path(['id'])(rfo)}
                                  rfoBusinessId={path(['company', 'businessId'])(rfo)}
                                  closingRfoFn={() => {
                                    this.props.setRfoHasChanges(false);
                                  }}
                                />
                              )}
                            </div>
                          </form>
                        )}
                      </>
                    )}
                  </>
                </PrivateComponent>

                {redirectTo && <Redirect to={redirectTo} />}
                <Prompt when={this.props.formHasChanges} message={promptMessageFn(t)} />
              </Col>
            </Row>
          </Loader>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isTouchDevice: state.generalState.isTouchDevice,
  rfo: state.rfoState.form,
  user: state.userState.user,
  services: state.generalState.configurations.services,
  ewcs: state.generalState.configurations.ewcs,
  regionsAndMunicipalities: state.generalState.location.regionsAndMunicipalities,
  configurationsFetched: state.generalState.configurationsFetched,
  loadingRfo: state.rfoState.status.loadingRfo,
  formHasChanges: state.rfoState.status.formHasChanges
});

const mapDispatchToProps = dispatch => ({
  handleChange: (key, value) => dispatch(rfoOperations.handleRfoFormChange(key, value)),
  handleMaterialChange: (index, key, value) =>
    dispatch(rfoOperations.handleMaterialFormChange(index, key, value)),
  clearForm: () => dispatch(rfoOperations.clearRfoForm()),
  clearRfoFromView: () => dispatch(rfoOperations.clearRfoView()),
  addMaterial: () => dispatch(rfoOperations.addMaterial()),
  deleteMaterial: index => dispatch(rfoOperations.deleteMaterial(index)),
  addFiles: files => dispatch(rfoOperations.addFiles(files)),
  deleteFile: fileId => dispatch(rfoOperations.deleteFile(fileId)),
  toggleRegion: region => dispatch(rfoOperations.toggleRegion(region)),
  deleteRegion: region => dispatch(rfoOperations.deleteRegion(region)),
  addSubService: service => dispatch(rfoOperations.addSubService(service)),
  deleteSubService: service => dispatch(rfoOperations.deleteSubService(service)),
  deleteAllSubServices: () => dispatch(rfoOperations.deleteAllSubServices()),
  fetchRfoForEdit: (id, regions) => dispatch(rfoOperations.fetchRfoForEdit(id, regions)),
  setRfoHasChanges: value => dispatch(rfoOperations.setRfoHasChanges(value))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  suspendUntilAuthorized
)(EditRfo);
