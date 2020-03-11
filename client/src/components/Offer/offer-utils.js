import { createLocationObject } from '../RequestForOffer/rfo-utils';
import { parseNumber } from '../../utils/common-utils';

export const offerStateToOfferPayload = (id, offer, isWaste) => {
  return !isWaste
    ? {
        rfoId: id,
        description: offer.description
      }
    : {
        rfoId: id,
        serviceName: offer.serviceName,
        subServices: offer.subService,
        serviceDescription: offer.serviceDescription,
        timeOfService: offer.timeOfService,
        location: createLocationObject(offer),
        priceOfService: offer.priceOfService
          ? parseNumber(offer.priceOfService).toString() // priceOfService is sent as a string to backend since it is stored as a string in the database
          : undefined,
        priceDescriptionOfService: offer.priceDescriptionOfService,
        otherTermsOfService: offer.otherTermsOfService,
        expires: offer.expires,
        contact: {
          name: offer.contact_name,
          title: offer.contact_title,
          phone: offer.contact_phone,
          email: offer.contact_email
        },
        permissionAssurance: offer.permissionAssurance,
        attachments: offer.attachments
      };
};

export const acceptDeclinePayload = (accept, offerId, reasonText, reasonType = undefined) => {
  return {
    accept: accept,
    offerId: offerId,
    description: reasonText,
    reason: reasonType
  };
};

export const getState = offer => {
  if (offer.state === 'offerMade') {
    return 'offer-state-offerMade';
  } else if (offer.state && offer.state.offerRejected) {
    return 'offer-state-offerRejected';
  } else if (offer.state && offer.state.offerAccepted) {
    return 'offer-state-offerAccepted';
  }
};

export const offerWaitsForReaction = offer => offer.state === 'offerMade';

export const offerStateIsRejected = offer => offer.state && offer.state.offerRejected;

export const offerStateIsAccepted = offer => offer.state && offer.state.offerAccepted;

export const showOfferRejectionCause = (t, reasonCode, reasonText) => {
  const reasonIsOther = reasonCode === 0;
  return reasonIsOther
    ? t('offer-reject-reason-0') + ': ' + reasonText
    : t('offer-reject-reason-' + reasonCode);
};

export const showOfferRejectionCauseWithCount = (t, reasonCode, reasonCount) => {
  return t('offer-reject-reason-' + reasonCode) + ' (' + reasonCount + ')';
};
