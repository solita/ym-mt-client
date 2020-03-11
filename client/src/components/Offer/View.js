import cx from 'classnames';
import { path } from 'ramda';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ILMOITUKSET } from '../../routes';
import { filterImageAttachments, nonImageAttachmentList } from '../../utils/attachment-utils';
import { formatDate } from '../../utils/date-utils';
import { splitTextToParagraphsOnLinebreak } from '../../utils/text-utils';
import PrivateComponent from '../Auth/PrivateComponent';
import Registrations from '../Company/Registrations';
import ImageList from '../ImageList/ImageList';
import InfoBox from '../InfoBox/InfoBox';
import { default as ViewRfoContainer } from '../RequestForOffer/ViewContainer';
import {
  getState,
  offerStateIsAccepted,
  offerStateIsRejected,
  offerWaitsForReaction,
  showOfferRejectionCause
} from './offer-utils';
import styles from './Offer.module.css';
import OfferActionButtons from './OfferActionButtons';

const View = ({
  offer,
  viewForm,
  handleViewFormChange,
  acceptOffer,
  declineOffer,
  loadingReaction,
  t
}) => {
  const rfoId = path(['rfoId'])(offer);
  const rfoBusinessId = path(['rfo', 'businessId'], offer);

  const isWasteRfoOffer = offer => {
    return offer.description === undefined; // description field is only for those offers that reply to a non-waste rfo
  };

  const isWasteRfo = isWasteRfoOffer(offer);
  const offerStateIsWaiting = offerWaitsForReaction(offer);

  const mainHeadingText = (offerBusinessId, rfoBusinessId, isWasteRfo) => {
    const renderMainHeadingDefaultText = () => {
      return isWasteRfo ? <>{t('Tarjous ilmoitukseen')}</> : <>{t('Vastaus ilmoitukseen')}</>;
    };

    const renderMainHeadingText = () => {
      return (
        <>
          <PrivateComponent
            belongsToBusiness={rfoBusinessId}
            renderInstead={renderMainHeadingDefaultText}
          >
            {isWasteRfo ? <>{t('Tarjous ilmoitukseesi')}</> : <>{t('Vastaus ilmoitukseesi')}</>}
          </PrivateComponent>
        </>
      );
    };

    return (
      <>
        <PrivateComponent belongsToBusiness={offerBusinessId} renderInstead={renderMainHeadingText}>
          {isWasteRfo ? <>{t('Tarjouksesi')}</> : <>{t('Vastauksesi')}</>}
        </PrivateComponent>
      </>
    );
  };

  const mainHeading = (offerBusinessId, rfoBusinessId, isWasteRfo, styles) => {
    const text = mainHeadingText(offerBusinessId, rfoBusinessId, isWasteRfo);

    return isWasteRfo ? (
      <h1 className={styles.mainHeading}>
        {text} <InfoBox infoText={t('Tarjous on sitova.')} />
      </h1>
    ) : (
      <h1 className={styles.mainHeading}>{text}</h1>
    );
  };

  const offerCompany = offer =>
    offer.offerer && (
      <>
        {path(['offerer', 'name'])(offer)}
        <br />
        {path(['offerer', 'address', 'address'])(offer)}
        <br />
        {path(['offerer', 'address', 'postalCode'])(offer)}{' '}
        {path(['offerer', 'address', 'city'])(offer)}
        <br />
        {path(['offerer', 'businessId'])(offer) ? t('Y-tunnus') + ':' : ''}{' '}
        {path(['offerer', 'businessId'])(offer)}
      </>
    );

  const nonWasteSender = (offer, styles) => (
    <div className={styles.detailWrapper}>
      <div className={styles.detailContainerHalf}>
        {path(['contact', 'name'])(offer)}
        <br />
        {path(['contact', 'title'])(offer)}
        <br />
        {path(['contact', 'phone'])(offer) ? t('Puh') + '.' : ''}{' '}
        {path(['contact', 'phone'])(offer)}
        <br />
        {path(['contact', 'email'])(offer)}
      </div>
      <div className={styles.detailContainerHalf}>{offerCompany(offer)}</div>
    </div>
  );

  const showNonWasteRfoOfferFields = (offer, styles) => (
    <div className={styles.verticalMargin1em}>
      <div className={styles.boldHeading}>{t('Vastauksen vapaa teksti')}:</div>
      {splitTextToParagraphsOnLinebreak(offer.description)}
    </div>
  );

  const showWasteRfoOfferFields = offer => (
    <>
      <h2>{t('Palvelun kuvaus')}</h2>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Tarjottava palvelu')}: </div>
        {t(offer.serviceName)}
      </div>
      {offer.subservices && Array.isArray(offer.subservices) && (
        <div className={styles.verticalMargin1em}>
          <div className={styles.boldHeading}>{t('Tarkenteet tarjottavalle palvelulle')}:</div>
          {offer.subservices.map(subservice => t(subservice)).join(', ')}
        </div>
      )}
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Palvelun kuvaus')}:</div>
        {splitTextToParagraphsOnLinebreak(offer.serviceDescription)}
      </div>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Palvelun ajankohta ja kesto')}:</div>
        {offer.timeOfService}
      </div>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Palvelun hinta')}:</div>
        {offer.priceOfService} €
      </div>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Hintaa koskeva lisätieto')}:</div>
        {splitTextToParagraphsOnLinebreak(offer.priceDescriptionOfService)}
      </div>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Palvelun ehdot')}:</div>
        {splitTextToParagraphsOnLinebreak(offer.otherTermsOfService)}
      </div>
      <h2>{t('Palvelun sijainti')}</h2>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Kohteen nimi')}:</div>
        {path(['location', 'name'])(offer)}
      </div>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Katuosoite')}:</div>
        {path(['location', 'address'])(offer)}
      </div>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Postinumero')}:</div>
        {path(['location', 'postalCode'])(offer)}
      </div>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Kunta')}:</div>
        {path(['location', 'city'])(offer)}
      </div>
      <h2>{t('Tarjouksen voimassaoloaika')}</h2>
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Voimassaoloaika')}:</div>
        {formatDate(new Date(offer.expires))}
      </div>
    </>
  );

  const showSenderInfo = (offer, isWasteRfo, styles) => (
    <>
      <h2>{isWasteRfo ? t('Tarjoajan yhteystiedot') : t('Lähettäjän yhteystiedot')}</h2>
      {isWasteRfo && (
        <>
          <div className={styles.verticalMargin1em}>
            <div className={styles.boldHeading}>{t('Nimi')}:</div>
            {path(['contact', 'name'])(offer)}
          </div>
          <div className={styles.verticalMargin1em}>
            <div className={styles.boldHeading}>{t('Rooli organisaatiossa')}:</div>
            {path(['contact', 'title'])(offer)}
          </div>
          <div className={styles.verticalMargin1em}>
            <div className={styles.boldHeading}>{t('Puhelinnumero')}:</div>
            {path(['contact', 'phone'])(offer)}
          </div>
          <div className={styles.verticalMargin1em}>
            <div className={styles.boldHeading}>{t('Sähköpostiosoite')}:</div>
            {path(['contact', 'email'])(offer)}
          </div>
          <div className={styles.verticalMargin1em}>
            <div className={styles.boldHeading}>
              {t(
                'Vakuutan, että organisaatiolla on tarvittavat viranomaisluvat ja hyväksynnät vastaanottaa kyseistä jätettä'
              )}
              :{' '}
              <InfoBox
                infoText={t(
                  'Jätteen saa luovuttaa vain vastaanottajalle, jolla on jätelain mukainen hyväksyntä vastaanottaa jätettä. Jätteen haltijan tulee varmistaa ennen jätehuoltopalvelua koskevan sopimuksen tekemistä, että kyseisellä palveluntarjoajalla on tarvittava viranomaislupa ja -hyväksyntä vastaanottaa jäte.'
                )}
              />
            </div>
            {offer.permissionAssurance ? t('Kyllä') : t('Ei')}
          </div>
          <div className={styles.boldHeading}>{t('Yrityksen tiedot')}:</div>
          {offerCompany(offer)}
        </>
      )}
      {!isWasteRfo && nonWasteSender(offer, styles)}
    </>
  );

  const showAttachments = offer => (
    <>
      <h2>{t('Liitteet')}</h2>
      {(!offer.attachments || (offer.attachments && offer.attachments.length === 0)) &&
        t('Ei liitteitä')}
      {offer.attachments &&
        offer.attachments.length > 0 &&
        nonImageAttachmentList(offer.attachments)}
      <div>
        <ImageList images={filterImageAttachments(offer.attachments)} />
      </div>
    </>
  );

  const offerStateRejected = offer => {
    const reasonCode = path(['state', 'offerRejected', 'reasonCode'])(offer);
    const reasonText = path(['state', 'offerRejected', 'reasonText'])(offer);
    return (
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Hylkäyksen syy')}:</div>
        {showOfferRejectionCause(t, reasonCode, reasonText)}
      </div>
    );
  };

  const offerStateAccepted = offer => {
    const reasonText = path(['state', 'offerAccepted', 'reasonText'])(offer);
    return (
      <div className={styles.verticalMargin1em}>
        <div className={styles.boldHeading}>{t('Viesti tarjoajalle')}:</div>
        {reasonText}
      </div>
    );
  };

  const showOfferState = offer => {
    const isRejected = offerStateIsRejected(offer);
    const isAccepted = offerStateIsAccepted(offer);

    return (
      <>
        <h2>{t('Tarjouksen tila')}</h2>
        <div className={styles.verticalMargin1em}>
          <div className={styles.boldHeading}>{t('Tarjouksen tila')}:</div>
          {t(getState(offer))}
        </div>
        {isRejected && offerStateRejected(offer)}
        {isAccepted && offerStateAccepted(offer)}
      </>
    );
  };

  const showRfo = (rfoId, rfoBusinessId, styles) => {
    const renderRfoTitle = () => {
      return <h2 className={styles.upperCase}>{t('Ilmoitus')}</h2>;
    };

    return (
      <>
        <PrivateComponent belongsToBusiness={rfoBusinessId} renderInstead={renderRfoTitle}>
          <h2 className={styles.upperCase}>{t('Ilmoituksesi')}</h2>
        </PrivateComponent>

        <ViewRfoContainer id={rfoId} viewOnly={true} />
      </>
    );
  };

  return (
    <>
      {mainHeading(path(['businessId'], offer), rfoBusinessId, isWasteRfo, styles)}
      <div className={'divider'} />
      <Link className={'backButton'} to={`${ILMOITUKSET}/${offer.rfoId}`}>
        {t('Takaisin')}
      </Link>
      <div className={styles.verticalMargin3em}>
        {!isWasteRfo && showNonWasteRfoOfferFields(offer, styles)}
        {isWasteRfo && showWasteRfoOfferFields(offer)}
        {showAttachments(offer)}
        {showSenderInfo(offer, isWasteRfo, styles)}
        <div className={styles.marginTop2em}>
          <PrivateComponent>
            <Registrations
              businessId={offer.businessId}
              title={t('Lähettäjän jätteen vastaanottoon liittyvät luvat ja rekisteritiedot')}
            />
          </PrivateComponent>
        </div>
      </div>
      <div className={styles.verticalMargin3em}>{isWasteRfo && showOfferState(offer)}</div>
      <div className={styles.verticalMargin3em}>
        {isWasteRfo && offerStateIsWaiting && (
          <PrivateComponent belongsToBusiness={offer.rfoBusinessId}>
            <OfferActionButtons
              viewForm={viewForm}
              acceptOffer={acceptOffer}
              declineOffer={declineOffer}
              handleViewFormChange={handleViewFormChange}
              loading={loadingReaction}
              styles={styles}
            />
          </PrivateComponent>
        )}
      </div>
      <div
        className={cx(
          'divider',
          styles.marginTop8em,
          styles.marginBottom2em,
          styles.horizontalMargin0
        )}
      />
      {showRfo(rfoId, rfoBusinessId, styles)}
    </>
  );
};

export default withNamespaces()(View);
