import React, { Component } from 'react';
import cx from 'classnames';
import {
  OFFER_REJECT_REASON_OTHER,
  OFFER_REJECT_REASON_NOT_WASTE_LAW_PRIORITY,
  OFFER_REJECT_REASON_DOES_NOT_MATCH_REQUEST,
  OFFER_REJECT_REASON_HAS_DISCARDED_OBLICATIONS,
  OFFER_REJECT_REASON_TIMING,
  OFFER_REJECT_REASON_SERVICE_QUALITY,
  OFFER_REJECT_REASON_LONG_TRANSPORT,
  OFFER_REJECT_REASON_PRICE
} from './types';
import { withNamespaces } from 'react-i18next';
import InfoBox from '../InfoBox/InfoBox';

const initialLevel = (t, styles, acceptDisabled, setIsAccepting, setIsRejecting) => (
  <div className={styles.buttonWrap}>
    <button
      className={cx(styles.acceptDeclineButton, styles.acceptButton)}
      type="button"
      disabled={acceptDisabled}
      onClick={setIsAccepting}
    >
      {t('Hyväksy tarjous')}
    </button>
    <button
      className={cx(styles.acceptDeclineButton, styles.declineButton)}
      type="button"
      disabled={acceptDisabled}
      onClick={setIsRejecting}
    >
      {t('Hylkää tarjous')}
    </button>
  </div>
);

const isAccepting = (
  t,
  styles,
  viewForm,
  handleViewFormChange,
  acceptOffer,
  setIsNotAccepting,
  acceptDisabled
) => (
  <div>
    <div className={styles.formWrap}>
      <div>
        <label htmlFor="reasonOfAccept">{t('Viesti tarjoajalle')}</label>
      </div>
      <textarea
        id="reasonOfAccept"
        name="reasonOfAccept"
        type="text"
        rows={3}
        className={styles.reason}
        value={viewForm.reasonOfAccept || ''}
        onChange={handleViewFormChange}
      />
    </div>
    <div className={styles.buttonWrap}>
      <button className={'cancel'} type="button" onClick={setIsNotAccepting}>
        {t('Peruuta')}
      </button>
      <button
        className={cx(styles.acceptDeclineButton, styles.acceptButton)}
        type="button"
        disabled={acceptDisabled}
        onClick={acceptOffer}
      >
        {t('Hyväksy tarjous')}
      </button>
    </div>
  </div>
);

const isRejecting = (
  t,
  styles,
  viewForm,
  handleViewFormChange,
  declineOffer,
  textAreaDisabled,
  declineDisabled,
  setIsNotRejecting
) => (
  <div>
    <h3>{t('Hylkää tarjous')}</h3>
    <div className={styles.formWrap}>
      <label>{t('Tarjouksen hylkäämisen syy')}:</label>
      <div>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_NOT_WASTE_LAW_PRIORITY}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_NOT_WASTE_LAW_PRIORITY}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-1"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-1" className={'radioButtonLabel'}>
          {t('offer-reject-reason-10')}
        </label>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_DOES_NOT_MATCH_REQUEST}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_DOES_NOT_MATCH_REQUEST}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-2"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-2" className={'radioButtonLabel'}>
          {t('offer-reject-reason-20')}
        </label>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_HAS_DISCARDED_OBLICATIONS}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_HAS_DISCARDED_OBLICATIONS}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-3"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-3" className={'radioButtonLabel'}>
          {t('offer-reject-reason-30')}
        </label>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_TIMING}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_TIMING}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-4"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-4" className={'radioButtonLabel'}>
          {t('offer-reject-reason-40')}
        </label>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_SERVICE_QUALITY}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_SERVICE_QUALITY}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-5"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-5" className={'radioButtonLabel'}>
          {t('offer-reject-reason-50')}
        </label>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_LONG_TRANSPORT}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_LONG_TRANSPORT}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-6"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-6" className={'radioButtonLabel'}>
          {t('offer-reject-reason-60')}
        </label>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_PRICE}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_PRICE}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-7"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-7" className={'radioButtonLabel'}>
          {t('offer-reject-reason-70')}
        </label>
        <input
          type="radio"
          name="reasonOfDeclineOption"
          value={OFFER_REJECT_REASON_OTHER}
          checked={viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_OTHER}
          onChange={handleViewFormChange}
          id="reasonOfDeclineOption-0"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfDeclineOption-0" className={'radioButtonLabel'}>
          {t('offer-reject-reason-0')}
        </label>
        {!textAreaDisabled && (
          <textarea
            name="otherReasonOfDecline"
            type="text"
            rows={3}
            className={styles.reason}
            disabled={textAreaDisabled}
            value={viewForm.otherReasonOfDecline || ''}
            onChange={handleViewFormChange}
          />
        )}
      </div>
      <div className={styles.buttonWrap}>
        <button className={'cancel'} type="button" onClick={setIsNotRejecting}>
          {t('Peruuta')}
        </button>
        <button
          className={cx(styles.acceptDeclineButton, styles.declineButton)}
          type="button"
          disabled={declineDisabled}
          onClick={declineOffer}
        >
          {t('Hylkää tarjous')}
        </button>
      </div>
    </div>
  </div>
);

class OfferActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRejecting: false,
      isAccepting: false
    };
  }

  acceptDisabled = loading => loading;

  declineDisabled = (viewForm, loading) => {
    return (
      loading ||
      !viewForm.reasonOfDeclineOption ||
      (viewForm.reasonOfDeclineOption === OFFER_REJECT_REASON_OTHER &&
        !viewForm.otherReasonOfDecline)
    );
  };

  textAreaDisabled = (viewForm, loading) => {
    return loading || viewForm.reasonOfDeclineOption !== OFFER_REJECT_REASON_OTHER;
  };

  render() {
    const {
      t,
      acceptOffer,
      viewForm,
      declineOffer,
      handleViewFormChange,
      loading,
      styles
    } = this.props;

    const setIsAccepting = () => {
      this.setState({ isAccepting: true });
    };

    const setIsNotAccepting = () => {
      this.setState({ isAccepting: false });
    };

    const setIsRejecting = () => {
      this.setState({ isRejecting: true });
    };

    const setIsNotRejecting = () => {
      this.setState({ isRejecting: false });
    };

    return (
      <>
        <h2>
          {t('Tarjouksen arviointi') + ' '}
          <InfoBox
            infoText={t(
              'Tarjouksia arvioidessa huomioi ainakin seuraavat asiat:\n\n 1) Jätteen saa luovuttaa vain vastaanottajalle, jolla on jätelain mukainen hyväksyntä vastaanottaa jätettä. Jätteen haltijan tulee varmistaa ennen jätehuoltopalvelua koskevan sopimuksen tekemistä, että kyseisellä palveluntarjoajalla on tarvittavat viranomaisluvat ja -hyväksynnät vastaanottaa jäte.\n\n 2) Noudata jätelain etusijajärjestystä. Jätteen haltijan on ensisijaisesti valmisteltava jäte uudelleenkäyttöä varten tai toissijaisesti kierrätettävä se. Jos kierrätys ei ole mahdollista, jätteen haltijan on hyödynnettävä jäte muulla tavoin, mukaan lukien hyödyntäminen energiana. Jos hyödyntäminen ei ole mahdollista, jäte on loppukäsiteltävä.'
            )}
          />
        </h2>
        {this.state.isRejecting &&
          isRejecting(
            t,
            styles,
            viewForm,
            handleViewFormChange,
            declineOffer,
            this.textAreaDisabled(viewForm, loading),
            this.declineDisabled(viewForm, loading),
            setIsNotRejecting
          )}
        {this.state.isAccepting &&
          isAccepting(
            t,
            styles,
            viewForm,
            handleViewFormChange,
            acceptOffer,
            setIsNotAccepting,
            this.acceptDisabled(loading)
          )}
        {!this.state.isRejecting &&
          !this.state.isAccepting &&
          initialLevel(t, styles, this.acceptDisabled(loading), setIsAccepting, setIsRejecting)}
      </>
    );
  }
}

export default withNamespaces()(OfferActionButtons);
