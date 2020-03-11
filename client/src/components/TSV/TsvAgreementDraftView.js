import cx from 'classnames';
import { path, replace } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { putJson } from '../../services/ApiService';
import { ACCEPT_TSV_CONTRACT, REJECT_TSV_CONTRACT } from '../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { addTsvRequestToRequestView } from '../../state/ducks/tsv/actions';
import { filterImageAttachments, nonImageAttachmentList } from '../../utils/attachment-utils';
import { isNullDate } from '../../utils/date-utils';
import PrivateComponent from '../Auth/PrivateComponent';
import ImageList from '../ImageList/ImageList';
import InfoBox from '../InfoBox/InfoBox';
import { LocationFromMaterialFragment } from '../RequestForOffer/FormFragments';
import { strongAuthButton } from './tsv-helpers';
import { showStateByColor } from './tsv-utils';
import styles from './Tsv.module.css';
import { TsvStateBadge } from './TsvStateBadge';
import { TSV_STATE_CONTRACT_DRAFT } from './types';

class TsvAgreementDraftView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false
    };
  }

  rejectContract = () => {
    this.setState({ loading: true });
    const putUrl = replace('{0}', this.props.tsv.id, REJECT_TSV_CONTRACT);
    putJson(putUrl)
      .then(res => {
        addToastNotification(this.props.t('Sopimus hylätty.'), ToastTypes.SUCCESS);

        this.setState({ loading: false, redirectTo: '/omasivu' });
      })
      .catch(err => {
        addToastNotification(
          this.props.t('Sopimuksen hylkääminen epäonnistui.'),
          ToastTypes.WARNING
        );

        this.setState({ loading: false });
      });
  };

  acceptContract = () => {
    this.setState({ loading: true });
    const putUrl = replace('{0}', this.props.tsv.id, ACCEPT_TSV_CONTRACT);
    putJson(putUrl)
      .then(res => {
        this.props.addTsvRequestToRequestView(res.data);
        this.setState({ loading: false });
        window.scrollTo(0, 0);

        addToastNotification(this.props.t('Sopimus hyväksytty.'), ToastTypes.SUCCESS);
      })
      .catch(err => {
        addToastNotification(
          this.props.t('Sopimuksen hyväksyminen epäonnistui.'),
          ToastTypes.WARNING
        );

        this.setState({ loading: false });
      });
  };

  listSubServices = () => {
    return this.props.tsv.contract.serviceSubCodes
      ? this.props.tsv.contract.serviceSubCodes.map(s => this.props.t(s)).join(', ')
      : '';
  };

  render() {
    const { t, tsv, user } = this.props;
    if (!tsv) {
      return null;
    }
    const rfo = tsv.rfo;
    const facilityPhone = path(['RequestContactPhone'], tsv);
    const facilityInfo = path(['tsvFacility'], tsv);
    const requestedForInfo = path(['request', 'requestedFor'], tsv);
    const requestClass = t(path(['materials', 0, 'classification'], rfo));
    const WasteIndustry = path(['materials', 0, 'industry'], rfo);
    const wasteQuantityUnit = path(['rfo', 'materials', 0, 'quantity', 'unitOfMeasure'], tsv);
    const wasteQuantity = path(['rfo', 'materials', 0, 'quantity', 'amount'], tsv);
    const wasteDescription = path(['materials', 0, 'amountDescription'], rfo);
    const wasteType = path(['materials', 0, 'type'], rfo);
    const tsvStateColor = tsv && showStateByColor(tsv.state.state);
    return (
      <PrivateComponent
        isAny={[
          { isAdmin: true },
          {
            belongsToBusiness: [
              path(['tsvFacility', 'businessId'], tsv),
              path(['request', 'requestedFor', 'businessId'], tsv)
            ]
          },
          { isPublicOfficerFacility: path(['tsvFacility', 'businessId'], tsv) }
        ]}
      >
        <h1>{t('Sopimus kunnan toissijaisesta jätehuoltopalvelusta')}</h1>
        {tsv && (
          <TsvStateBadge
            tsvStateColor={tsvStateColor}
            tsv={tsv}
            isImported={
              this.props.tsv.contract ? this.props.tsv.contract.contractWasImported : false
            }
            t={t}
          />
        )}
        {tsv && tsv.state.state === TSV_STATE_CONTRACT_DRAFT && (
          <PrivateComponent belongsToBusiness={path(['businessId'], rfo)}>
            <p>
              <strong>
                {t('Tarkista sopimustiedot ja allekirjoita sopimus vahvasti tunnistautuneena.')}{' '}
                <InfoBox
                  infoText={t(
                    'Jätelain (646/2011) 33 §:n mukaan kunnan jätelaitoksen on tehtävä sopimus toissijaisesta jätehuoltopalvelusta, kun kyseessä on muusta kuin ennalta arvaamattomasta kiireestä johtuva palvelu, jonka arvo on vähintään 2000 euroa vuodessa. Sopimus voidaan tehdä hyödyntämällä tätä sopimuslomaketta. Jätettä ja  osapuolia koskevat tiedot ovat tulleet sopimukseen suoraan Materiaalitorissa tehdystä ilmoituksesta ja palvelupyynnöstä. Kunnan jätelaitos on täydentänyt sopimuslomaketta palvelua koskevilta osilta ja allekirjoittanut sopimuksen. Kunnan toissijaista jätehuoltopalvelua pyytänyt voi hyväksyä ja allekirjoittaa sopimuksen vahvasti tunnistautuneena. Allekirjoitettu sopimus tallentuu omiin tietoihin.'
                  )}
                />
              </strong>
            </p>
          </PrivateComponent>
        )}
        <h2 className={styles.headingWithUnderline}>{t('1. Sopimusosapuolet')}</h2>
        <h3 className={styles.headingWithUnderline}>{t('Palveluntarjoaja')}</h3>
        <p>
          <strong>{facilityInfo && facilityInfo.address.name}</strong>
        </p>
        <p>
          {facilityInfo && facilityInfo.address.address} <br />
          {facilityInfo.address.postalCode} {facilityInfo.address.city}
        </p>
        <p>{facilityInfo && facilityInfo.email}</p>
        <p>{facilityPhone}</p>
        <h3 className={styles.headingWithUnderline}>{t('Pyynnön esittäjä')}</h3>
        <p>
          <strong>{t('Yrityksen nimi')}</strong>
        </p>
        <p>{requestedForInfo && requestedForInfo.name}</p>
        <p>{requestedForInfo && requestedForInfo.businessId}</p>
        <p>
          <strong>{t('Yhteyshenkilö')}</strong>
        </p>
        {tsv.request && tsv.request.contact && (
          <>
            <p>{tsv.request.contact.title}</p>
            <p>{tsv.request.contact.name}</p>
            <p>{tsv.request.contact.email}</p>
            <p>{tsv.request.contact.phone}</p>
          </>
        )}
        <h2 className={styles.headingWithUnderline}>{t('2. Sopimuksen viitetiedot')}</h2>
        <p>
          <strong>{t('Sopimusnumero')}</strong>
        </p>
        <p>{tsv.contract.contractNumber}</p>
        <p>
          <strong>{t('Sopimuksen nimi')}</strong>
        </p>
        <p>{tsv.contract.contractName}</p>
        <p>
          <strong>{t('Viitenumero')}</strong>
        </p>
        <p>{tsv.contract.contractReference}</p>

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
          <strong>{t('Jätteen sijainti')}</strong>
        </p>
        <p>
          <LocationFromMaterialFragment material={path(['materials', 0], rfo)} />
        </p>
        <p>
          <strong>{t('Lisätietoja')}</strong>
        </p>
        <p>{tsv.contract.wasteDescription}</p>
        <h2 className={styles.headingWithUnderline}>{t('5. Palvelukuvaus, ajankohta ja hinta')}</h2>
        <p>
          <strong>{t('Tarjottava palvelu')}</strong>
        </p>
        <p>{tsv.contract ? t(tsv.contract.serviceCode) : ''}</p>
        {tsv.contract.serviceSubCodes && tsv.contract.serviceSubCodes.length > 0 && (
          <div>
            <p>
              <strong>{t('Palvelun tarkennus')}</strong>
            </p>
            <p>{this.listSubServices()}</p>
          </div>
        )}
        <p>
          <strong>{t('Palvelun hinta €/tonni ')}</strong>
        </p>
        <p>{tsv.contract ? tsv.contract.servicePriceEurPerTonne + t(' €/tonnia jätettä') : ''}</p>
        <p>
          <strong>
            {tsv.state.state === TSV_STATE_CONTRACT_DRAFT
              ? t('Ajankohta - palvelu tuotetaan välillä')
              : t('Ajankohta, jolloin palvelua annetaan')}
          </strong>
        </p>
        <p>
          {t('Palvelu alkaa: ')}
          {!isNullDate(tsv.contract.serviceStartDate)
            ? new Date(tsv.contract.serviceStartDate).toLocaleDateString('fi-fi')
            : t('Ei tiedossa.')}
        </p>
        <p>
          {t('Palvelu päättyy: ')}
          {!isNullDate(tsv.contract.serviceEndDate)
            ? new Date(tsv.contract.serviceEndDate).toLocaleDateString('fi-fi')
            : t('Ei tiedossa.')}
        </p>
        <p>
          <strong>{t('Lisätietoja palvelusta:')}</strong>
        </p>
        <p>{tsv ? tsv.contract.serviceDescription : ''}</p>
        <h2 className={styles.headingWithUnderline}>{t('6. Sopimuksen voimassaolo')}</h2>
        <p>
          {tsv.contract.contractEndDate
            ? t('Sopimus on voimassa ') +
              new Date(tsv.contract.contractEndDate).toLocaleDateString('fi-fi') +
              t(' asti')
            : t('Ei tiedossa.')}
        </p>
        <h2 className={styles.headingWithUnderline}>{t('7. Sopimusehdot')}</h2>
        <p>
          <strong>{t('Irtisanomisehto:')}</strong>
        </p>
        <p>{tsv ? tsv.contract.contractTerminationTerms : ''}</p>
        <p>
          <strong>{t('Muut ehdot:')}</strong>
        </p>
        <p>{tsv ? tsv.contract.contractTerms : ''}</p>

        <h2 className={styles.headingWithUnderline}>{t('8. Liitteet')}</h2>
        {(!tsv.contract.attachments ||
          (tsv.contract.attachments && tsv.contract.attachments.length === 0)) &&
          t('Ei liitteitä')}
        {tsv.contract.attachments &&
          tsv.contract.attachments.length > 0 &&
          nonImageAttachmentList(tsv.contract.attachments)}
        {tsv.contract.attachments && tsv.contract.attachments.length > 0 && (
          <div>
            <ImageList images={filterImageAttachments(tsv.contract.attachments)} />
          </div>
        )}
        {this.props.tsv.contract && !this.props.tsv.contract.contractWasImported && (
          <>
            <h2 className={styles.headingWithUnderline}>{t('9. Allekirjoitukset')}</h2>
            <p>
              {t(
                'Sopimus tulee voimaan, kun molemmat sopimusosapuolet ovat allekirjoittaneet sopimuksen. Sähköinen allekirjoittaminen tapahtuu vahvan tunnistautumisen avulla.'
              )}
            </p>
            {tsv.contract.facilitySigner && (
              <p>
                {tsv && path(['contract', 'facilitySigner', 'companyName'], tsv)}{' '}
                {tsv && path(['contract', 'facilitySigner', 'name'], tsv)}{' '}
                {tsv &&
                  new Date(
                    path(['contract', 'facilitySigner', 'timestamp'], tsv)
                  ).toLocaleDateString('fi-fi')}
              </p>
            )}
            {tsv.contract.companySigner && (
              <p>
                {tsv && path(['contract', 'companySigner', 'companyName'], tsv)}{' '}
                {tsv && path(['contract', 'companySigner', 'name'], tsv)}{' '}
                {tsv &&
                  new Date(
                    path(['contract', 'companySigner', 'timestamp'], tsv)
                  ).toLocaleDateString('fi-fi')}
              </p>
            )}
          </>
        )}
        {tsv.state.state === TSV_STATE_CONTRACT_DRAFT && (
          <PrivateComponent belongsToBusiness={path(['businessId'], rfo)}>
            <p>
              {tsv && tsv.request.requestedFor.name} &nbsp; {user.user.profile.given_name}&nbsp;
              {user.user.profile.family_name} &nbsp; {new Date().toLocaleDateString('fi-fi')}
            </p>
            <div className={styles.buttonWrapper}>
              <button className={styles.buttonWrapper__cancelButton} onClick={this.rejectContract}>
                {t('Hylkää sopimus')}
              </button>
              <PrivateComponent
                requireStrongAuth={true}
                renderInstead={strongAuthButton(t('Tunnistaudu vahvasti hyväksyäksesi sopimuksen'))}
              >
                <button
                  className={cx(styles.buttonWrapper__submitButton, 'qa-acceptTsvContract')}
                  onClick={this.acceptContract}
                >
                  {t('Hyväksy ja allekirjoita sopimus')}
                </button>
              </PrivateComponent>
            </div>
          </PrivateComponent>
        )}
        {this.state.redirectTo && <Redirect to={this.state.redirectTo} />}
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
  addTsvRequestToRequestView: data => dispatch(addTsvRequestToRequestView(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(TsvAgreementDraftView));
