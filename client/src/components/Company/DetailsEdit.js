import cx from 'classnames';
import { clone, compose } from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postJson } from '../../services/ApiService';
import { SAVE_COMPANY_DETAILS } from '../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { companyOperations } from '../../state/ducks/company';
import Location from '../Map/Location';
import Loader from './../Loader/Loader';
import InfoBox from '../InfoBox/InfoBox';
import editStyles from './CompanyDetailsEdit.module.css';
import styles from './CompanyFullView.module.css';

const TSV_COMPANY_TYPE = 20;

class DetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isEditMode: false,
      company: clone(props.company)
    };
  }
  componentWillUnmount() {}

  toMapLocation = loc => {
    return loc
      ? {
          locationStreetAddress: loc.address,
          locationPostalCode: loc.postalCode,
          locationCity: loc.cityId
            ? {
                id: loc.cityId,
                nameFi: loc.city,
                regionId: loc.regionId,
                region: loc.regionNameFi
              }
            : undefined
        }
      : {
          locationStreetAddress: '',
          locationPostalCode: '',
          locationCity: undefined
        };
  };

  modifyFormState = (name, val) => {
    let companyDraft = clone(this.state.company);
    companyDraft[name] = val;
    this.setState({ company: companyDraft });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.modifyFormState(target.name, value);
  };

  modifyFormAddressState = (name, val) => {
    let companyDraft = clone(this.state.company);

    if (companyDraft.address) {
      companyDraft.address[name] = val;
    } else {
      let loc = {};
      loc[name] = val;
      companyDraft.address = loc;
    }
    this.setState({ company: companyDraft });
  };

  handleAddressChange = event => {
    const target = event.target;
    this.modifyFormAddressState(target.name, target.value);
  };

  showForm = () => {
    this.setState({ isEditMode: true });
  };

  hideForm = () => {
    this.setState({ isEditMode: false });
  };

  abandonChanges = () => {
    this.setState({ company: clone(this.props.company) });
  };

  hideFormAndAbandonChanges = () => {
    this.abandonChanges();
    this.hideForm();
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    const postUrl = SAVE_COMPANY_DETAILS;
    const payload = {
      businessId: this.state.company.businessId,
      name: this.state.company.name,
      email: this.state.company.email,
      address: this.state.company.address,
      isTsvReady: this.state.company.isTSVReady,
      details: this.state.company.details,
      infoLink: this.state.company.infoLink
    };
    postJson(postUrl, payload)
      .then(res => {
        this.hideForm();
        this.props.updateCompany(res.data);

        addToastNotification(this.props.t('Tiedot tallennettu.'), ToastTypes.SUCCESS);
      })
      .catch(err => {
        addToastNotification(this.props.t('Tietojen tallennus epäonnistui.'), ToastTypes.WARNING);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleAddressChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    switch (name) {
      case 'locationStreetAddress':
        this.modifyFormAddressState('address', value);
        break;
      case 'locationPostalCode':
        this.modifyFormAddressState('postalCode', value);
        break;
      case 'locationCity':
        this.modifyFormAddressState('city', value);
        break;
      default:
        throw new Error('unknow property: ' + name);
    }
  };

  handleMapLocation = event => {
    if (event) {
      this.modifyFormAddressState('coordinates', [
        {
          type: 'EUREF_FIN',
          lat: event.lat,
          lon: event.lon
        }
      ]);
    } else {
      this.modifyFormAddressState('coordinates', []);
    }
  };

  handleMunicipality = event => {
    let companyDraft = clone(this.state.company);
    if (!companyDraft.address) {
      companyDraft.address = {};
    }
    if (event) {
      companyDraft.address.city = event.nameFi;
      companyDraft.address.cityId = event.id;
      companyDraft.address.region = event.regionNameFi;
      companyDraft.address.regionId = event.regionId;
    } else {
      companyDraft.address.city = undefined;
      companyDraft.address.cityId = undefined;
      companyDraft.address.region = undefined;
      companyDraft.address.regionId = undefined;
    }

    this.setState({ company: companyDraft });
  };

  disableSaveButton = () => {
    let disable =
      this.state.loading ||
      !this.state.company.name ||
      !this.state.company.address.address ||
      !this.state.company.address.city;

    const userIsFromTheMunicipality = this.state.company.type === TSV_COMPANY_TYPE;
    if (userIsFromTheMunicipality) {
      disable = disable || !this.state.company.email;
    }

    return disable;
  };

  render() {
    const { t } = this.props;
    return this.state.isEditMode ? (
      <form className={styles.form}>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Nimi')}</span>
          <input
            className={styles.form__input}
            type="text"
            name="name"
            value={this.state.company.name || ''}
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Y-tunnus')}</span>
          <input
            className={styles.form__input}
            type="text"
            disabled
            value={this.state.company.businessId || ''}
          />
        </div>

        <Location
          municipalitiesOnly={true}
          handleChange={this.handleAddressChange}
          handleMunicipality={this.handleMunicipality}
          handleMapLocation={this.handleMapLocation}
          rfo={this.toMapLocation(this.state.company.address)}
        />

        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Sähköposti')}</span>
          <input
            className={styles.form__input}
            type="text"
            name="email"
            value={this.state.company.email || ''}
            onChange={this.handleChange}
          />
        </div>

        {this.state.company.type === TSV_COMPANY_TYPE && (
          <div className={styles.detailRow}>
            <label htmlFor="isTSVReady" className={styles.details__label}>
              {t(
                'Otamme vastaan pyyntöjä kunnan toissijaisesta jätehuoltopalvelusta Materiaalitorin kautta'
              )}
            </label>
            <div className={styles.form__input}>
              <input
                id="isTSVReady"
                className="checkboxInput"
                type="checkbox"
                name="isTSVReady"
                checked={this.state.company.isTSVReady || false}
                onChange={this.handleChange}
              />
              <label
                htmlFor="isTSVReady"
                className={cx(styles.details__label, 'checkboxLabel', styles.isTsvReadyCheckbox)}
              />
            </div>
          </div>
        )}

        {this.state.company.type === TSV_COMPANY_TYPE && (
          <div className={styles.detailRow}>
            <label>
              <span>{t('Tiedot jätelaitoksen TSV-palveluista')}</span>
              <InfoBox infoText={t('Tiedot jätelaitokset TSV-palveluista- lisätiedot')} />
              <textarea
                id="details"
                className="form__input"
                type="text"
                name="details"
                rows={8}
                value={this.state.company.details || ''}
                onChange={this.handleChange}
              />
            </label>
          </div>
        )}

        {this.state.company.type === TSV_COMPANY_TYPE && (
          <div className={styles.detailRow}>
            <label>
              <span>{t('Linkki lisätietoihin')}</span>
              <input
                type="text"
                name="infoLink"
                value={this.state.company.infoLink || ''}
                onChange={this.handleChange}
              />
            </label>
          </div>
        )}

        <div className={editStyles.buttonWrap}>
          <button
            type="button"
            onClick={this.hideFormAndAbandonChanges}
            className={cx(editStyles.marginRight1rem, 'cancel')}
          >
            {t('Peruuta')}
          </button>
          <button
            type="button"
            onClick={this.handleSubmit}
            disabled={this.disableSaveButton()}
            className={cx(editStyles.marginRight1rem, 'qa-saveCompanyDetailsButton')}
          >
            {t('Tallenna')}
          </button>
          <Loader loading={this.state.loading} />
        </div>
      </form>
    ) : (
      <>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Nimi')}</span>
          <span>{this.state.company.name}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Y-tunnus')}</span>
          <span>{this.state.company.businessId}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Osoite')}</span>
          <span>{this.state.company.address && this.state.company.address.address}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Postinumero')}</span>
          <span>{this.state.company.address && this.state.company.address.postalCode}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Kunta')}</span>
          <span>{this.state.company.address && this.state.company.address.city}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.details__label}>{t('Sähköposti')}</span>
          <span>{this.state.company.address && this.state.company.email}</span>
        </div>
        {this.state.company.type === TSV_COMPANY_TYPE && (
          <div className={styles.detailRow}>
            <span className={styles.details__label}>
              {t(
                'Otamme vastaan pyyntöjä kunnan toissijaisesta jätehuoltopalvelusta Materiaalitorin kautta'
              )}
            </span>
            <span>{this.state.company.isTSVReady ? t('Kyllä') : t('Ei')}</span>
          </div>
        )}
        {this.state.company.type === TSV_COMPANY_TYPE && (
          <div className={styles.detailRow}>
            <span className={styles.details__label}>
              {t('Tiedot jätelaitoksen TSV-palveluista')}
            </span>
            <span className={styles.details__value}>{this.state.company.details}</span>
          </div>
        )}
        {this.state.company.type === TSV_COMPANY_TYPE && (
          <div className={styles.detailRow}>
            <span className={styles.details__label}>{t('Linkki lisätietoihin')}</span>
            <span>
              <a href={this.state.company.infoLink}>{this.state.company.infoLink}</a>
            </span>
          </div>
        )}
        <div className={editStyles.buttonWrap}>
          <button
            type="button"
            onClick={this.showForm}
            className={cx(editStyles.marginRight1rem, 'qa-editCompanyDetailsButton')}
          >
            {t('Muokkaa')}
          </button>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isTouchDevice: state.generalState.isTouchDevice
  };
};

const mapDispatchToProps = dispatch => ({
  updateCompany: company => dispatch(companyOperations.updateCompany(company))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(DetailsEdit);
