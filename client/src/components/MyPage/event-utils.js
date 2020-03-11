import { TARJOUKSET, TSV_PYYNNOT } from '../../routes';
import { formatDate, formatTime } from '../../utils/date-utils';
import { isWaste } from '../RequestForOffer/rfo-utils';

const getTypeRelated = event => {
  switch (event.eventType) {
    case 'RequestForOfferStatusChanged':
    case 'RequestForOfferUpdated':
    case 'RequestForOfferCreated':
      return {
        link: '/ilmoitukset/' + event.event.id
      };

    case 'OfferReceived':
    case 'OfferCreated':
      return {
        linkTextKey: isWaste(event.event.rfo)
          ? 'event-link-' + event.eventType
          : 'event-link-answer-' + event.eventType,
        link: TARJOUKSET + '/' + event.event.id
      };

    case 'OfferRejectedByCustomer':
    case 'OfferRejected':
    case 'OfferAcceptedByCustomer':
    case 'OfferAccepted':
      return {
        link: TARJOUKSET + '/' + event.event.id
      };

    case 'TsvRequestCanceled':
    case 'TsvRequestCanceledByClient':
    case 'TsvRequestRejected':
    case 'TsvRequestRejectedByFacility':
    case 'TsvContractDraftMade':
    case 'TsvContractDraftMadeByFacility':
    case 'TsvContractAccepted':
    case 'TsvContractAcceptedByClient':
    case 'TsvContractRejected':
    case 'TsvContractRejectedByClient':
    case 'TsvContractTerminated':
    case 'TsvContractTerminatedByFacility':
    case 'TsvContractImportedByFacility':
    case 'TsvContractImported':
    case 'TsvRequestReceived':
    case 'TsvRequestSent':
      return {
        link: TSV_PYYNNOT + '/' + event.event.id
      };
    case 'TsvAccepted':
    case 'TsvAcceptedByFacility':
      return {};
    case 'UserAuthorizedToCompany':
      return {
        link: null,
        user: event.event.user.name || event.event.user.email
      };

    case 'CompanyDetailsUpdated':
    case 'CompanyRegistrationAdded':
    case 'CompanyRegistrationRemoved':
      return {
        link: '/omasivu/omattiedot'
      };

    default:
      return {
        link: null
      };
  }
};

export const toViewEvent = event => {
  const occured = new Date(event.occured);
  return Object.assign(
    {
      datetime: formatDate(occured) + ' ' + formatTime(occured),
      linkTextKey: 'event-link-' + event.eventType,
      descriptionKey: 'event-description-' + event.eventType,
      company:
        event.responsibleCompany && event.responsibleCompany.name
          ? event.responsibleCompany.name
          : '',
      user: event.responsible.name || event.responsible.email
    },
    getTypeRelated(event)
  );
};
