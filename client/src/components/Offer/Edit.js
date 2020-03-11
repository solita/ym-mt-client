import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Offer.module.css';
import cx from 'classnames';
import { withNamespaces } from 'react-i18next';
import WasteOffer from './WasteOffer';
import InfoBox from '../InfoBox/InfoBox';
import Attachment from '../Attachment/Attachment';
import { Link } from 'react-router-dom';
import { ILMOITUKSET } from '../../routes';

const Edit = ({
  isWasteRfo,
  isTsvRfo,
  offer,
  handleChange,
  handleServiceChange,
  handleMunicipalityChange,
  handleMapLocation,
  addFiles,
  deleteFile,
  isTouchDevice,
  rfoId,
  handleSubmit,
  onSubServiceAdd,
  onSubServiceRemove,
  services,
  getCurrentSubServices,
  redirectTo,
  loading,
  t
}) => {
  // Prevent form submit if the form is loading or some of the obligatory fields are missing:
  const disableSubmit = (offer, loading, isWasteRfo, isTsvRfo, services) => {
    const currentSubServices = getCurrentSubServices(offer.serviceName, services);
    const subServiceIsNeeded = currentSubServices && currentSubServices.length > 0;
    const subServiceIsSelected = offer.subService && offer.subService.length > 0;

    if (!isWasteRfo) {
      // Non-waste reply
      return loading || !offer.description;
    }
    if (!isTsvRfo) {
      // Waste but not TSV offer
      return (
        loading ||
        !offer.serviceName ||
        (!subServiceIsSelected && subServiceIsNeeded) ||
        !offer.serviceDescription ||
        !offer.locationCity ||
        !offer.expires ||
        !offer.contact_name ||
        !offer.contact_email ||
        !offer.permissionAssurance
      );
    } else {
      // Waste and TSV offer
      return (
        loading ||
        !offer.serviceName ||
        (!subServiceIsSelected && subServiceIsNeeded) ||
        !offer.serviceDescription ||
        !offer.timeOfService ||
        !offer.priceOfService ||
        !offer.locationCity ||
        !offer.expires ||
        !offer.contact_name ||
        !offer.contact_email ||
        !offer.permissionAssurance
      );
    }
  };

  const mainHeading = (isWasteRfo, t) => {
    return isWasteRfo ? (
      <h1 className={styles.mainHeading}>
        {t('Tee tarjous')}
        <InfoBox infoText={t('Tarjous on sitova.')} />
      </h1>
    ) : (
      <h1 className={styles.mainHeading}>
        {t('Vastaa ilmoitukseen')}
        <InfoBox
          infoText={t(
            'Tämä on vapaamuotoinen yhteydenotto ilmoituksen tekijään. Voitte halutessanne jatkaa yhteydenpitoa palvelun ulkopuolella.'
          )}
        />
      </h1>
    );
  };

  const doSubmit = e => {
    if (!disableSubmit(offer, loading, isWasteRfo, isTsvRfo, services)) {
      handleSubmit(e);
    }
  };

  const nonWasteField = (offer, handleChange) => (
    <div>
      <label htmlFor="description">
        {t('Vapaamuotoinen viesti')}{' '}
        <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
      </label>
      <textarea
        name="description"
        id="description"
        type="text"
        rows={8}
        value={offer.description || ''}
        onChange={handleChange}
      />
    </div>
  );

  const commonAttachmentField = (offer, addFiles, deleteFile, t, isWasteRfo) => {
    const infoBoxText = isWasteRfo
      ? t(
          'Lisätiedot palvelusta liitteiden, kuten kuvien ja muiden liitetiedostojen muodossa. Sallitut tiedostomuodot ovat jpg, png, gif, pdf, doc(x), xls(x) ja ppt(x).'
        )
      : t(
          'Lisätiedot liitteiden, kuten kuvien ja muiden liitetiedostojen muodossa. Sallitut tiedostomuodot ovat jpg, png, gif, pdf, doc(x), xls(x) ja ppt(x).'
        );
    const titleInnerJsx = (
      <>
        {t('Liitteet') + ' '}
        <InfoBox infoText={infoBoxText} />
      </>
    );
    return (
      <>
        {isWasteRfo ? <h2>{titleInnerJsx}</h2> : <h3>{titleInnerJsx}</h3>}
        <Attachment
          t={t}
          addFiles={addFiles}
          attachments={offer.attachments}
          deleteFile={deleteFile}
          multiple={true}
        />
      </>
    );
  };

  const buttons = (t, styles, rfoId, disableSubmit) => (
    <div className={cx(styles.buttonWrap, styles.marginTop2em)}>
      <Link className={cx('buttonStyle', 'cancel')} to={`${ILMOITUKSET}/${rfoId}`}>
        {t('Peruuta')}
      </Link>
      <input
        className={cx('buttonStyle', 'qa-submit-offer')}
        type="submit"
        disabled={disableSubmit(offer, loading, isWasteRfo, isTsvRfo, services)}
        value={t('Lähetä')}
      />
    </div>
  );

  return (
    <>
      <div>
        {mainHeading(isWasteRfo, t)}
        <form onSubmit={doSubmit}>
          {!isWasteRfo && nonWasteField(offer, handleChange)}
          {isWasteRfo && (
            <WasteOffer
              offer={offer}
              handleChange={handleChange}
              handleServiceChange={handleServiceChange}
              handleMunicipalityChange={handleMunicipalityChange}
              handleMapLocation={handleMapLocation}
              isTouchDevice={isTouchDevice}
              onSubServiceAdd={onSubServiceAdd}
              onSubServiceRemove={onSubServiceRemove}
              services={services}
              getCurrentSubServices={getCurrentSubServices}
              isTsvRfo={isTsvRfo}
            />
          )}
          {commonAttachmentField(offer, addFiles, deleteFile, t, isWasteRfo)}
          {buttons(t, styles, rfoId, disableSubmit)}
        </form>
        {redirectTo && <Redirect to={redirectTo} />}
      </div>
      <div
        className={cx(
          'divider',
          styles.marginTop8em,
          styles.marginBottom2em,
          styles.horizontalMargin0
        )}
      />
    </>
  );
};

export default withNamespaces()(Edit);
