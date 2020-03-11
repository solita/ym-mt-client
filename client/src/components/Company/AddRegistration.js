import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, clone } from 'ramda';
import Attachment from './../Attachment/Attachment';
import styles from './CompanyAddRegistration.module.css';
import { postJson } from '../../services/ApiService';
import Loader from './../Loader/Loader';
import cx from 'classnames';
import { DatePickerFragment } from './../RequestForOffer/FormFragments';
import { companyOperations } from '../../state/ducks/company';

class AddRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploading: false,
      formVisible: false,
      company: props.company,
      registration: {
        type: '',
        authority: '',
        identification: '',
        registrationDate: '',
        validUntil: '',
        attachments: []
      }
    };
  }

  modifyFormState = (name, val) => {
    let registrationDraft = clone(this.state.registration);
    registrationDraft[name] = val;
    this.setState({ registration: registrationDraft });
  };

  handleChange = event => {
    this.modifyFormState(event.target.name, event.target.value);
  };

  addFile = files => {
    this.modifyFormState('attachments', files);
  };

  deleteFile = fileId => {
    this.modifyFormState('attachments', []);
  };

  showForm = () => {
    this.setState({ formVisible: true });
  };
  hideForm = () => {
    this.setState({ formVisible: false, registration: { attachments: [] } });
  };
  uploadingStatusChanged = uploading => {
    this.setState({ uploading: uploading });
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    const postUrl = '/api/company/registrations';
    const payload = {
      businessId: this.state.company.businessId,
      companyRegistration: this.state.registration
    };
    postJson(postUrl, payload)
      .then(res => {
        this.hideForm();
        this.props.updateCompany(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { t, isTouchDevice } = this.props;
    return this.state.formVisible ? (
      <form className={styles.form}>
        <div>
          <h3>{t('Lisää lupa tai rekisterimerkintä')}</h3>
        </div>
        <div>
          <label className={styles.editRow}>
            <span className={cx(styles.form__label)}>
              {' '}
              {t('Tyyppi')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
            </span>
            <select
              name="type"
              value={this.state.registration.type || ''}
              onChange={this.handleChange}
              className={styles.form__input}
            >
              <option value="" disabled hidden>
                {t('Valitse luvan / rekisteriotteen tyyppi')}
              </option>
              <option value="100">{t('company-registration-type-100')}</option>
              <option value="200">{t('company-registration-type-200')}</option>
              <option value="300">{t('company-registration-type-300')}</option>
              <option value="1">{t('company-registration-type-1')}</option>
            </select>
          </label>
        </div>
        <div>
          <label className={styles.editRow}>
            <span className={cx(styles.form__label)}>
              {t('Tunniste')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
            </span>
            <input
              className={styles.form__input}
              type="text"
              name="identification"
              value={this.state.registration.identification || ''}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label className={styles.editRow}>
            <span className={cx(styles.form__label)}>
              {t('Luvan myöntäjä')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
            </span>

            <input
              className={styles.form__input}
              type="text"
              name="authority"
              value={this.state.registration.authority || ''}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label className={styles.editRow}>
            <span className={cx(styles.form__label)}>{t('Dokumentti')}</span>
            <Attachment
              t={t}
              addFiles={this.addFile}
              attachments={this.state.registration.attachments}
              deleteFile={this.deleteFile}
              multiple={false}
              uploadingStatusChanged={this.uploadingStatusChanged}
              className={styles.form__input}
              buttonLabel={t('Tiedosto')}
            />
          </label>
        </div>
        <div className={styles.datePickerContainer}>
          <DatePickerFragment
            isTouchDevice={isTouchDevice}
            value={this.state.registration.registrationDate || ''}
            name={'registrationDate'}
            handleChange={this.handleChange}
            label={'Voimaantulopäivä'}
            t={t}
            stylesOverride={styles}
            required={true}
            minDate={'1900-01-01'}
          />
        </div>
        <div className={styles.datePickerContainer}>
          <DatePickerFragment
            isTouchDevice={isTouchDevice}
            value={this.state.registration.validUntil || ''}
            name={'validUntil'}
            handleChange={this.handleChange}
            label={'Vanhenemispäivä'}
            t={t}
            stylesOverride={styles}
            required={true}
          />
        </div>
        <div className={styles.buttonWrap}>
          <button
            type="button"
            onClick={this.hideForm}
            className={cx('cancel', styles.marginRight1rem)}
          >
            {t('Peruuta')}
          </button>
          <button
            type="button"
            onClick={this.handleSubmit}
            disabled={this.state.loading || this.state.uploading}
            className={cx('qa-saveCompanyRegistration')}
          >
            {t('Tallenna')}
          </button>
          <Loader loading={this.state.loading} />
        </div>
      </form>
    ) : (
      <div className={styles.buttonWrap}>
        <button className={cx('buttonStyle', 'qa-addCompanyRegistration')} onClick={this.showForm}>
          {t('+ Lisää uusi lupa / rekisterimerkintä')}
        </button>
      </div>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddRegistration);
