import cx from 'classnames';
import { path } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { TSV_PYYNNOT } from '../../routes';
import { postJson } from '../../services/ApiService';
import * as API_ENDPOINTS from '../../services/endpoints';
import { addSuccess, addWarning } from '../../state/ducks/general/operations';
import { addRfoToTsv, handleContractChange } from '../../state/ducks/tsv/actions';
import { parseNumber } from '../../utils/common-utils';
import { regExpForNumberWithThreeDecimals } from '../../utils/text-utils';
import Attachment from '../Attachment/Attachment';
import PrivateComponent from '../Auth/PrivateComponent';
import InfoBox from '../InfoBox/InfoBox';
import formStyles from '../Layout/Form.module.css';
import {
  DatePickerFragment,
  LocationFromMaterialFragment,
  ServiceListFragment
} from '../RequestForOffer/FormFragments';
import { getCurrentSubServices } from '../RequestForOffer/rfo-utils';
import { strongAuthButton } from './tsv-helpers';
import { showStateByColor } from './tsv-utils';
import styles from './Tsv.module.css';
import { TsvStateBadge } from './TsvStateBadge';
import * as tsvTypes from './types';

const disableSubmit = (
  service,
  subService,
  currentSubServices,
  price,
  validUntil,
  terminationTerms
) => {
  const subServiceIsNeeded = currentSubServices && currentSubServices.length > 0;
  const subServiceIsSelected = subService && subService.length > 0;

  return (
    !service ||
    (subServiceIsNeeded && !subServiceIsSelected) ||
    !price ||
    !validUntil ||
    !terminationTerms ||
    false
  );
};

class TsvAgreementDraftCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      currentSubServices: []
    };
  }

  doSubmit = event => {
    event.preventDefault();
    const disabled = disableSubmit(
      this.props.tsvContract.serviceName,
      this.props.tsvContract.subService,
      this.state.currentSubServices,
      this.props.tsvContract.ServicePriceEurPerTonne,
      this.props.tsvContract.ContractEndDate,
      this.props.tsvContract.contractTerminationTerms
    );

    if (disabled) {
      alert(
        this.props.t(
          'Täytä kaikki pakolliset kentät! (Palvelu, hinta, irtisanomisehdot ja sopimuksen voimassaoloaika.)'
        )
      );
      return;
    }
    const postUrl = API_ENDPOINTS.POST_TSV_CONTRACT + this.props.tsvContract.tsvId;
    const payload = {
      ...this.props.tsvContract,
      ServicePriceEurPerTonne: parseNumber(this.props.tsvContract.ServicePriceEurPerTonne),
      serviceCode: this.props.tsvContract.serviceName,
      serviceSubCodes: this.props.tsvContract.subService
    };
    this.setState({ loading: true });

    postJson(postUrl, payload)
      .then(res => {
        const tsvId = res.data.id;
        if (
          res.data.state.state === tsvTypes.TSV_STATE_CONTRACT_DRAFT ||
          res.data.state.state === tsvTypes.TSV_STATE_CONTRACT
        ) {
          this.props.addSuccess({
            content: this.props.t('Sopimustiedot tallennettu.')
          });

          this.setState({ redirectTo: '/tsv/sopimukset/' + tsvId });
        } else {
          this.props.addWarning({
            content: this.props.t('Tapahtui virhe sopimuksen tallennuksessa.')
          });
        }
      })
      .catch(err => {
        this.props.addWarning({
          content: this.props.t('Tapahtui virhe sopimuksen tallennuksessa.')
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleChange = event => {
    this.props.handleContractChanges(event.target.name, event.target.value);
  };

  handleServiceChange = event => {
    this.handleChange(event);
    if (event.target.name === 'serviceName') {
      this.deleteAllSubservices();
    }
    this.setState({
      currentSubServices: getCurrentSubServices(event.target.value, this.props.services)
    });
  };

  addSubService = subService => {
    const subservices = this.props.tsvContract.subService
      ? this.props.tsvContract.subService.concat([subService.id])
      : [subService.id];
    this.props.handleContractChanges('subService', subservices);
  };

  deleteSubService = subService => {
    const subservices = this.props.tsvContract.subService
      ? this.props.tsvContract.subService.filter(item => subService.id !== item)
      : [];
    this.props.handleContractChanges('subService', subservices);
  };

  deleteAllSubservices = () => {
    this.props.handleContractChanges('subService', []);
  };

  render() {
    const { t, services, tsv, importcontract, addFiles, deleteFile, user } = this.props;
    const { currentSubServices } = this.state;
    const rfo = tsv.rfo;
    const facilityName = path(['tsvFacility', 'name'], tsv);
    const facilityAddress = path(['tsvFacility', 'address'], tsv);
    const facilityEmail = path(['tsvFacility', 'email'], tsv);
    const requestedForName = path(['request', 'contact', 'name'], tsv);
    const requestedForPhone = path(['request', 'contact', 'phone'], tsv);
    const requestedForEmail = path(['request', 'contact', 'email'], tsv);
    const requestClass = t(path(['materials', 0, 'classification'], rfo));
    const WasteIndustry = path(['materials', 0, 'industry'], rfo);
    const wasteQuantityUnit = path(['materials', 0, 'quantity', 'unitOfMeasure'], rfo);
    const wasteQuantity = path(['materials', 0, 'quantity', 'amount'], rfo);
    const wasteDescription = path(['materials', 0, 'amountDescription'], rfo);
    const wasteType = path(['materials', 0, 'type'], rfo);
    const { redirectTo } = this.state;
    const tsvStateColor = tsv && showStateByColor(tsv.state.state);
    return (
      <PrivateComponent
        belongsToBusiness={path(['tsvFacility', 'businessId'], tsv)}
        isMunicipalWasteManagement={true}
        renderInstead={() => {
          return <h1 className={'textCenter'}>{t('Ei pääsyoikeutta')}</h1>;
        }}
      >
        <PrivateComponent
          requireStrongAuth={true}
          renderInstead={strongAuthButton(t('Tunnistaudu vahvasti tehdäksesi sopimusluonnoksen'))}
        >
          {importcontract ? (
            <h1>
              {t(
                'Tietojen tuominen kunnan toissijaisesta jätehuoltopalvelusta tehdystä sopimuksesta'
              )}
              <InfoBox
                infoText={t(
                  'Jätelain (646/2011) 33 §:n mukaankunnan jätelaitoksen on tehtävä sopimus toissijaisesta jätehuoltopalvelusta, kun kyseessä on muusta kuin ennalta arvaamattomasta kiireestä johtuva palvelu, jonka arvo on vähintään 2000 euroa vuodessa. \n\n Mikäli sopimus tehdään Materiaalitorin ulkopuolella, on olennaiset sopimustiedot tuotava Materiaalitoriin viimeistään 14 vuorokauden kuluttua sopimuksen tekemisestä. Täytä vähintään oheiset pakolliseksi merkityt kohdat.'
                )}
              />
            </h1>
          ) : (
            <h1>{t('Sopimus kunnan toissijaisesta jätehuoltopalvelusta')}</h1>
          )}
          {this.props.tsv && (
            <TsvStateBadge
              tsvStateColor={tsvStateColor}
              tsv={this.props.tsv}
              isImported={
                this.props.tsv.contract ? this.props.tsv.contract.contractWasImported : false
              }
              t={t}
            />
          )}
          <p>
            {!importcontract && (
              <>
                <strong>
                  {t(
                    'Täytä sopimustiedot, allekirjoita ja lähetä sopimus asiakkaalle hyväksyttäväksi.'
                  )}
                </strong>
                <InfoBox
                  infoText={t(
                    'Jätelain (646/2011) 33 §:n mukaankunnan jätelaitoksen on tehtävä sopimus toissijaisesta jätehuoltopalvelusta, kun kyseessä on muusta kuin ennalta arvaamattomasta kiireestä johtuva palvelu, jonka arvo on vähintään 2000 euroa vuodessa. \n\n  Sopimus voidaan tehdä hyödyntämällä tätä sopimuslomaketta. Mikäli sopimus tehdään Materiaalitorin ulkopuolella, on olennaiset sopimustiedot tuotava Materiaalitoriin viimeistään 14 vuorokauden kuluttua sopimuksen tekemisestä. Täyttämällä tämän lomakkeen pyydetyt tiedot asianmukaisesti, erillistä tietojen toimittamista ei tarvitse tehdä.  \n\n Täytetty sopimuslomake allekirjoitetaan ja  lähetetään palvelupyynnön esittäjälle hyväksyttäväksi ja allekirjoitettavaksi. Sopimuksen voi allekirjoittaa vahvasti tunnistautuneena. '
                  )}
                />
              </>
            )}
          </p>

          <form>
            <h2 className={styles.headingWithUnderline}>{t('1. Sopimusosapuolet')}</h2>
            <h3 className={styles.headingWithUnderline}>{t('Palveluntarjoaja')}</h3>
            <p>
              <strong>{facilityName}</strong>
            </p>
            <p>{t('Jätelaitoksen yhteystiedot')}</p>

            <p>{facilityAddress && facilityAddress.address}</p>
            <p>{facilityAddress && facilityAddress.city + ' ' + facilityAddress.postalCode}</p>
            <p>{facilityAddress && facilityAddress.email}</p>
            <p>{facilityEmail}</p>

            <h3 className={styles.headingWithUnderline}>{t('Pyynnön esittäjä')}</h3>
            <p>
              <strong>{t('Yrityksen nimi')}</strong>
            </p>
            <p>{rfo && rfo.company.name}</p>
            <p>
              <strong>{t('Yhteyshenkilö')}</strong>
            </p>
            <p>{requestedForName}</p>
            <p>{requestedForPhone}</p>
            <p>{requestedForEmail}</p>

            <h2 className={styles.headingWithUnderline}>
              {t('2. Sopimuksen viitetiedot')}
              <InfoBox
                infoText={t(
                  'Voit antaa sopimukselle nimen ja/tai numeron/tunnisteen. Lisäksi voit antaa viitenumeron, joka voi olla esimerkiksi asiakasnumero tai –tunniste.'
                )}
              />
            </h2>
            <label htmlFor="ContractNumber">
              <span className={formStyles.defaultLabelSpan}>{t('Sopimusnumero')}</span>

              <input
                type="text"
                name="ContractNumber"
                id="ContractNumber"
                value={this.props.tsvContract ? this.props.tsvContract.ContractNumber : ''}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="ContractName">
              <span className={formStyles.defaultLabelSpan}>{t('Sopimuksen nimi')}</span>

              <input
                type="text"
                name="ContractName"
                id="ContractName"
                value={this.props.tsvContract ? this.props.tsvContract.ContractName : ''}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="ContractReference">
              <span className={formStyles.defaultLabelSpan}>{t('Viitenumero')}</span>

              <input
                type="text"
                name="ContractReference"
                id="ContractReference"
                value={this.props.tsvContract ? this.props.tsvContract.ContractReference : ''}
                onChange={this.handleChange}
              />
            </label>
            <h2 className={styles.headingWithUnderline}>{t('3. Sopimuksen kohde')}</h2>
            <p>
              {t(
                'Tässä sopimuksessa sovitaan jätelain (646/2011) 33 §:n mukaisesta kunnan toissijaisestajätehuoltopalvelusta, sen hinnasta ja kestosta sekä vastaanotettavasta jätteestä ja sen määrästä.Kunnan on tehtävä toissijaisesta jätehuoltopalvelusta sopimus, kun kyseessä on muusta kuin ennalta arvaamattomasta kiireestä johtuva palvelu, jonka arvo on vähintään 2000 euroa vuodessa. Kunnan toissijaisen jätehuoltopalvelun edellytyksenä oleva muun palvelutarjonnan puute on todennettu etsimällä tarvittavaa jätehuoltopalveluaMateriaalitorissa.'
              )}
            </p>
            <h2 className={styles.headingWithUnderline}>{t('4. Jätteen tiedot')}</h2>
            <p>
              <strong>{t('Jäte')}</strong>
            </p>
            <p>{requestClass}</p>
            <p>
              <strong>{t('Toimiala, jossa jäte syntyy')}</strong>
            </p>
            <p>{t(WasteIndustry)}</p>
            {wasteType && (
              <>
                <p>
                  <strong>{t('Jätteen vaarallisuus')}</strong>
                </p>
                <p>{wasteType === 'dangerous' ? t('Vaarallinen jäte') : t('Vaaraton jäte')}</p>
              </>
            )}

            <p>
              <strong>{t('Määrä')}</strong>
            </p>
            <p>
              {wasteQuantity} {wasteQuantityUnit}
            </p>

            <p>
              <strong>{t('Lisätietoja määrästä')}</strong>
            </p>
            <p> {wasteDescription}</p>
            <p>
              <strong>{t('Sijainti')}</strong>
            </p>
            <p>
              <LocationFromMaterialFragment material={path(['materials', 0], rfo)} />
            </p>

            <label htmlFor="WasteDescription">
              <span className={formStyles.defaultLabelSpan}>
                <strong>{t('Lisätietoja')}</strong>
              </span>

              <textarea
                name="WasteDescription"
                id="WasteDescription"
                type="text"
                rows={12}
                defaultValue={this.props.tsvContract ? this.props.tsvContract.WasteDescription : ''}
                onChange={this.handleChange}
              />
            </label>

            <h2 className={styles.headingWithUnderline}>
              {t('5. Palvelukuvaus, ajankohta ja hinta')}
            </h2>
            <p>
              <strong>{t('Valitse tarjottava palvelu')}</strong>
            </p>
            <ServiceListFragment
              t={t}
              handleChange={this.handleServiceChange}
              form={this.props.tsvContract ? this.props.tsvContract : { serviceName: null }}
              services={services}
              currentSubServices={currentSubServices}
              onSubServiceAdd={this.addSubService}
              onSubServiceRemove={this.deleteSubService}
            />
            <label htmlFor="ServicePriceEurPerTonne">
              <span className={formStyles.defaultLabelSpan}>
                {t('Palvelun hinta')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                <InfoBox
                  infoText={t(
                    'Määritä palvelun yksikköhinta (euroa per tonnia kyseistä jätettä). '
                  )}
                />
              </span>{' '}
              <br />
              <input
                className={styles.ServicePriceEurPerTonne}
                name="ServicePriceEurPerTonne"
                id="ServicePriceEurPerTonne"
                type="text"
                pattern={regExpForNumberWithThreeDecimals}
                placeholder="0"
                min="0"
                value={this.props.tsvContract && this.props.tsvContract.ServicePriceEurPerTonne}
                onChange={this.handleChange}
              />
              <span>{t('€/tonni')}</span>
            </label>
            <p>
              <strong>{t('Ajankohta, jolloin palvelua annetaan')} </strong>
            </p>
            <label className={styles.twoColumnLayout} htmlFor="ServiceStartDate">
              <DatePickerFragment
                //isTouchDevice={isTouchDevice}
                value={this.props.tsvContract ? this.props.tsvContract.ServiceStartDate : ''}
                id="ServiceStartDate"
                name="ServiceStartDate"
                handleChange={this.handleChange}
                label={'alkaa'}
                t={t}
                minDateModifier={1}
              />
            </label>
            <label className={styles.twoColumnLayout} htmlFor="ServiceEndDate">
              <DatePickerFragment
                //isTouchDevice={isTouchDevice}
                value={this.props.tsvContract ? this.props.tsvContract.ServiceEndDate : ''}
                id="ServiceEndDate"
                name="ServiceEndDate"
                handleChange={this.handleChange}
                label={'päättyy'}
                t={t}
                minDateModifier={1}
              />
            </label>

            <label htmlFor="ServiceDescription">
              <span className={formStyles.defaultLabelSpan}>{t('Lisätietoja palvelusta')}</span>

              <textarea
                name="ServiceDescription"
                id="ServiceDescription"
                type="text"
                rows={12}
                defaultValue={
                  this.props.tsvContract ? this.props.tsvContract.ServiceDescription : ''
                }
                onChange={this.handleChange}
              />
            </label>

            <h2 className={styles.headingWithUnderline}>{t('6. Sopimuksen voimassaolo')}</h2>
            <label htmlFor="ContractEndDate">
              <span className={formStyles.defaultLabelSpan}>
                {t('Sopimuksen voimassaoloaika')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                <InfoBox
                  infoText={t(
                    'Määritä päivämäärä, johon asti sopimus on voimassa. Sopimuksen enimmäiskesto on kolme (3) vuotta. Sopimus tulee voimaan, kun molemmat osapuolet ovat allekirjoittaneet sopimuksen.'
                  )}
                />
              </span>
              <DatePickerFragment
                //isTouchDevice={isTouchDevice}
                value={this.props.tsvContract ? this.props.tsvContract.ContractEndDate : ''}
                id="ContractEndDate"
                name="ContractEndDate"
                handleChange={this.handleChange}
                label={''}
                t={t}
                minDateModifier={1}
              />
            </label>
            <h2 className={styles.headingWithUnderline}>{t('7. Sopimusehdot')}</h2>
            <label htmlFor="contractTerminationTerms">
              <span className={formStyles.defaultLabelSpan}>
                {t('Irtisanomisehto')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
                <InfoBox
                  infoText={t(
                    'Sopimuksen on määräaikaisuudestaan huolimatta oltava molempien osapuolten irtisanottavissa sopimuksessa määritellyn kohtuullisen irtisanomisajan kuluttua. Määritä tähän irtisanomisehto irtisanomisaikoineen.'
                  )}
                />
              </span>

              <textarea
                name="contractTerminationTerms"
                id="contractTerminationTerms"
                type="text"
                rows={12}
                defaultValue={
                  this.props.tsvContract ? this.props.tsvContract.contractTerminationTerms : ''
                }
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="ContractTerms">
              <span className={formStyles.defaultLabelSpan}>{t('Muut sopimusehdot')}</span>

              <textarea
                name="ContractTerms"
                id="ContractTerms"
                type="text"
                rows={12}
                defaultValue={this.props.tsvContract ? this.props.tsvContract.contractTerms : ''}
                onChange={this.handleChange}
              />
            </label>

            <h2 className={styles.headingWithUnderline}>
              {t('8. Liitteet')}{' '}
              <InfoBox
                infoText={t(
                  'Mahdolliset lisätiedot ja sopimusehdotliitteiden muodossa. Sallitut tiedostomuodot ovat jpg, png, gif, pdf, doc(x), xls(x) ja ppt(x).'
                )}
              />
            </h2>
            <Attachment
              t={t}
              addFiles={addFiles}
              attachments={this.props.tsvContract ? this.props.tsvContract.Attachments : []}
              deleteFile={deleteFile}
              multiple={true}
            />

            {!importcontract ? (
              <>
                <h2 className={styles.headingWithUnderline}>{t('9. Allekirjoitukset')}</h2>
                <p>
                  {t(
                    'Sopimus tulee voimaan, kun molemmat sopimusosapuolet ovat allekirjoittaneet sopimuksen. Sähköinen allekirjoittaminen tapahtuu vahvan tunnistautumisen avulla.'
                  )}
                </p>
                <p>
                  {facilityName} &nbsp; {user.user.profile.given_name}&nbsp;
                  {user.user.profile.family_name} &nbsp; {new Date().toLocaleDateString('fi-fi')}
                </p>
                <div className={styles.buttonWrapper}>
                  <Link
                    className={cx('buttonStyle', 'cancel', styles.buttonWrapper__cancelButton)}
                    to={`${TSV_PYYNNOT}/${tsv.id}`}
                  >
                    {t('Peruuta')}
                  </Link>
                  <button
                    className={cx(styles.buttonWrapper__submitButton, 'qa-submitContractDraft')}
                    onClick={this.doSubmit}
                  >
                    {t('Allekirjoita ja lähetä hyväksyttäväksi')}
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.buttonWrapper}>
                <Link
                  className={cx('buttonStyle', 'cancel', styles.buttonWrapper__cancelButton)}
                  to={`${TSV_PYYNNOT}/${tsv.id}`}
                >
                  {t('Peruuta')}
                </Link>
                <button className={styles.buttonWrapper__submitButton} onClick={this.doSubmit}>
                  {t('Tallenna tiedot')}
                </button>
              </div>
            )}
          </form>

          {redirectTo && <Redirect to={redirectTo} />}
        </PrivateComponent>
      </PrivateComponent>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  services: state.generalState.configurations.services,
  tsvContract: state.tsvState.form.contract_draft
});

const mapDispatchToProps = dispatch => ({
  handleContractChanges: (key, value) => dispatch(handleContractChange(key, value)),
  addRfoToTsv: data => dispatch(addRfoToTsv(data)),
  addWarning: notificationObject => dispatch(addWarning(notificationObject)),
  addSuccess: notificationObject => dispatch(addSuccess(notificationObject))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(TsvAgreementDraftCreate));
