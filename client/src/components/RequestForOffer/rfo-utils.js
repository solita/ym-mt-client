import { compose, either, find, is, lensProp, map, pick, prop, propEq, set } from 'ramda';
import { parseNumber } from '../../utils/common-utils';
import { dateIsInThePast } from '../../utils/date-utils';
import {
  RFO_OFFERING_MATERIAL,
  RFO_OFFERING_SERVICES,
  RFO_OFFERING_WASTE,
  RFO_RECEIVING_MATERIAL
} from './types';

export const wasteStateToRequestPayload = map(material => ({
  classification: material.classification,
  industry: material.industry,
  ewcCode: material.ewcCode,
  isWaste: true,
  useTsv: material.useTsv,
  type: material.type,
  permanent: material.permanent,
  description: material.description,
  quantity: {
    amount: parseNumber(material.quantityAmount),
    unitOfMeasure: material.quantityUnit
  },
  continuity: material.continuity,
  amountDescription: material.amountDescription,
  location: material.location
}));

export const offeringServicesStateToRequestPayload = map(material => ({
  location: material.location
}));

export const materialStateToRequestPayload = map(material => ({
  classification: material.classification,
  industry: material.industry,
  isWaste: false,
  description: material.description,
  quantity: {
    amount: parseNumber(material.quantityAmount),
    unitOfMeasure: material.quantityUnit
  },
  continuity: material.continuity,
  amountDescription: material.amountDescription,
  location: material.location
}));

export const receivingMaterialStateToRequestPayload = map(material => ({
  classification: material.classification,
  description: material.description
}));

export const createLocationObject = form => {
  const location = {
    name: form.locationName,
    address: form.locationStreetAddress,
    postalCode: form.locationPostalCode,
    countryCode: 'fi'
  };

  if (is(Object, form.locationCity)) {
    location.city = form.locationCity.nameFi;
    location.cityId = form.locationCity.id;
    location.region = form.locationCity.regionNameFi;
    location.regionId = form.locationCity.regionId;
  } else {
    location.city = form.locationCity;
  }

  if (form.mapLocation) {
    location.coordinates = [
      {
        type: 'EUREF_FIN',
        lat: form.mapLocation.lat,
        lon: form.mapLocation.lon
      }
    ];
  }

  return location;
};

export const transformWasteData = rfo => {
  const location = createLocationObject(rfo);

  const service = {
    serviceIds: rfo.serviceName
      ? [rfo.serviceName].concat(
          rfo.subService && Array.isArray(rfo.subService) ? rfo.subService : []
        )
      : [],
    requirements: rfo.serviceRequirements,
    duration: rfo.serviceDuration
  };

  const addLocationPublicity = map(set(lensProp('locationIsPublic'), !rfo.locationIsPrivate));
  const addLocation = map(set(lensProp('location'), location));
  const addService = map(set(lensProp('service'), service));
  const materialsWithLocationAndService = compose(
    addLocationPublicity,
    addLocation,
    addService,
    wasteStateToRequestPayload
  )(rfo.materials);

  return {
    type: rfo.type,
    data: {
      materials: materialsWithLocationAndService,
      title: rfo.title,
      expires: rfo.expires,
      contactIsPublic: !rfo.contactIsPrivate,
      contact: {
        name: rfo.contact_name,
        title: rfo.contact_title,
        phone: rfo.contact_phone,
        email: rfo.contact_email
      },
      attachments: rfo.attachments
    }
  };
};

export const offeringServicesLocationToMaterialsRequestPayload = rfo => {
  return [
    {
      locationIsPublic: !rfo.locationIsPrivate,
      location: createLocationObject(rfo)
    }
  ];
};

export const transformRegionData = regions => {
  return regions.map(region => {
    switch (region.configurationType) {
      case 'Municipality': {
        return {
          id: region.id,
          nameFi: region.nameFi,
          nameSv: region.nameSv
        };
      }

      case 'Region': {
        return {
          id: region.regionId,
          nameFi: region.regionNameFi,
          nameSv: region.regionNameSv
        };
      }

      default:
        return {};
    }
  });
};

export const transformMaterialData = rfo => {
  const location = createLocationObject(rfo);

  const addLocationPublicity = map(set(lensProp('locationIsPublic'), !rfo.locationIsPrivate));
  const addLocation = map(set(lensProp('location'), location));
  const materialsWithLocation = compose(
    addLocationPublicity,
    addLocation,
    materialStateToRequestPayload
  )(rfo.materials);

  return {
    type: rfo.type,
    data: {
      materials: materialsWithLocation,
      title: rfo.title,
      expires: rfo.expires,
      contactIsPublic: !rfo.contactIsPrivate,
      contact: {
        name: rfo.contact_name,
        title: rfo.contact_title,
        phone: rfo.contact_phone,
        email: rfo.contact_email
      },
      attachments: rfo.attachments
    }
  };
};

export const transformReceivingMaterialData = rfo => {
  return {
    type: rfo.type,
    data: {
      materials: receivingMaterialStateToRequestPayload(rfo.materials),
      regions: transformRegionData(rfo.regions),
      title: rfo.title,
      attachments: rfo.attachments,
      expires: rfo.expires,
      contactIsPublic: !rfo.contactIsPrivate,
      contact: {
        name: rfo.contact_name,
        title: rfo.contact_title,
        phone: rfo.contact_phone,
        email: rfo.contact_email
      }
    }
  };
};

export const transformOfferingServicesData = rfo => {
  return {
    type: rfo.type,
    data: {
      title: rfo.title,
      attachments: rfo.attachments,
      expires: rfo.expires,
      contactIsPublic: !rfo.contactIsPrivate,
      regions: transformRegionData(rfo.regions),
      materials: offeringServicesLocationToMaterialsRequestPayload(rfo),
      contact: {
        name: rfo.contact_name,
        title: rfo.contact_title,
        phone: rfo.contact_phone,
        email: rfo.contact_email
      },
      service: {
        serviceIds: [rfo.serviceName].concat(
          rfo.subService && Array.isArray(rfo.subService) ? rfo.subService : []
        ),
        serviceDescription: rfo.serviceDescription
      }
    }
  };
};

export const rfoStateToRequestPayload = rfo => {
  const { type } = rfo;

  switch (type) {
    case RFO_OFFERING_WASTE:
      return transformWasteData(rfo);

    case RFO_OFFERING_MATERIAL:
      return transformMaterialData(rfo);

    case RFO_RECEIVING_MATERIAL:
      return transformReceivingMaterialData(rfo);

    case RFO_OFFERING_SERVICES:
      return transformOfferingServicesData(rfo);

    default:
      return {};
  }
};

export const shortenText = (text, maxLength) => {
  const maxLen = maxLength || 500;
  if (text && text.length > maxLen) {
    let clipped = text.substring(0, text.indexOf(' ', maxLen - 15 || 0));
    if (clipped && clipped.length) {
      return clipped + '...';
    } else {
      return text.substring(0, maxLength) + '...';
    }
  }
  return text;
};

export const getCurrentSubServices = (selectedServiceId, services) => {
  var currentService = services.filter(f => f.id === selectedServiceId);
  let currentSubServices = [];
  if (currentService.length && currentService[0].subServices.length) {
    currentSubServices = currentService[0].subServices;
  }
  return currentSubServices;
};

export const idEquals = (rfo, id) => {
  return rfo !== undefined && prop('id', rfo) === id;
};

export const isWaste = rfo => {
  const { rfoType } = rfo;
  return rfoType === RFO_OFFERING_WASTE;
};

export const isTsv = rfo => {
  if (rfo.materials) {
    return rfo.materials.some(material => {
      return material.useTsv === true;
    });
  }

  return false;
};

export const isExpired = rfo => {
  const now = new Date();
  return new Date(rfo.expires) < now;
};

export const isClosed = rfo => {
  return rfo.status === 'closed';
};

export const isTSVActive = rfo => {
  return rfo.tsvStatus === 'tsv-requested';
};

export const isTsvAllowed = rfo => {
  return rfo.tsvStatus === 'tsv-allowed';
};

export const mapRfoDataToForm = (data, municipalitiesAndRegions) => {
  const regionDataFlat = municipalitiesAndRegions;

  const mapRegionData = (regionsOnRfoData, regionDataFlat) =>
    regionsOnRfoData.map(dataRegion => {
      return find(either(propEq('id', dataRegion.id), propEq('regionId', dataRegion.id)))(
        regionDataFlat
      );
    });

  const configurationMunicipalityFromLocationCity = (cityId, regionDataFlat) => {
    return find(propEq('id', cityId))(regionDataFlat);
  };

  switch (data.rfoType) {
    case RFO_OFFERING_WASTE: {
      let formData = pick(['title', 'expires'])(data);
      formData.rfoHasExpired = dateIsInThePast(new Date(prop(['expires'], formData)));
      formData.businessId = data.businessId;
      formData.contactIsPrivate = !data.contactIsPublic;
      formData.type = data.rfoType;
      formData.contact_name = data.contact.name;
      formData.contact_title = data.contact.title;
      formData.contact_email = data.contact.email;
      formData.contact_phone = data.contact.phone;

      formData.materials = data.materials.map(material => ({
        ...pick([
          'classification',
          'industry',
          'ewcCode',
          'isWaste',
          'useTsv',
          'type',
          'permanent',
          'description',
          'continuity',
          'amountDescription'
        ])(material),
        quantityAmount: material.quantity.amount,
        quantityUnit: material.quantity.unitOfMeasure
      }));

      const locationFromMaterial = data.materials[0].location;
      const locationIsPublicFromMaterial = data.materials[0].locationIsPublic;
      const servicesFromMaterial = data.materials[0].service;

      formData.locationIsPrivate = !locationIsPublicFromMaterial;
      formData.locationName = locationFromMaterial.name;
      formData.locationStreetAddress = locationFromMaterial.address;
      formData.locationPostalCode = locationFromMaterial.postalCode;
      formData.locationCity = configurationMunicipalityFromLocationCity(
        locationFromMaterial.cityId,
        regionDataFlat
      );

      const [servicesFromRfo, ...subServicesFromRfo] = servicesFromMaterial.serviceIds;

      formData.serviceName = servicesFromRfo;
      formData.status = data.status;
      formData.subService = subServicesFromRfo;
      formData.serviceRequirements = servicesFromMaterial.requirements;
      formData.serviceDuration = servicesFromMaterial.duration;

      formData.attachments = data.attachments || [];
      formData.regions = [];

      return formData;
    }

    case RFO_OFFERING_MATERIAL: {
      let formData = pick(['title', 'expires'])(data);
      formData.rfoHasExpired = dateIsInThePast(new Date(prop(['expires'], formData)));
      formData.businessId = data.businessId;
      formData.contactIsPrivate = !data.contactIsPublic;
      formData.type = data.rfoType;
      formData.contact_name = data.contact.name;
      formData.contact_title = data.contact.title;
      formData.contact_email = data.contact.email;
      formData.contact_phone = data.contact.phone;

      formData.materials = data.materials.map(material => ({
        ...pick([
          'classification',
          'industry',
          'isWaste',
          'useTsv',
          'permanent',
          'description',
          'continuity',
          'amountDescription'
        ])(material),
        quantityAmount: material.quantity.amount,
        quantityUnit: material.quantity.unitOfMeasure
      }));

      const locationFromMaterial = data.materials[0].location;
      const locationIsPublicFromMaterial = data.materials[0].locationIsPublic;

      formData.locationIsPrivate = !locationIsPublicFromMaterial;
      formData.locationName = locationFromMaterial.name;
      formData.locationStreetAddress = locationFromMaterial.address;
      formData.locationPostalCode = locationFromMaterial.postalCode;
      formData.locationCity = configurationMunicipalityFromLocationCity(
        locationFromMaterial.cityId,
        regionDataFlat
      );

      formData.attachments = data.attachments || [];
      formData.regions = [];
      formData.status = data.status;

      return formData;
    }

    case RFO_RECEIVING_MATERIAL: {
      let formData = pick(['title', 'expires'])(data);
      formData.rfoHasExpired = dateIsInThePast(new Date(prop(['expires'], formData)));
      formData.businessId = data.businessId;
      formData.contactIsPrivate = !data.contactIsPublic;
      formData.type = data.rfoType;
      formData.contact_name = data.contact.name;
      formData.contact_title = data.contact.title;
      formData.contact_email = data.contact.email;
      formData.contact_phone = data.contact.phone;
      formData.materials = data.materialsWanted;
      formData.regions = data.regions ? mapRegionData(data.regions, regionDataFlat) : [];
      formData.attachments = data.attachments || [];
      formData.status = data.status;

      return formData;
    }

    case RFO_OFFERING_SERVICES: {
      let formData = pick(['title', 'expires'])(data);
      formData.rfoHasExpired = dateIsInThePast(new Date(prop(['expires'], formData)));
      formData.businessId = data.businessId;
      formData.contactIsPrivate = !data.contactIsPublic;
      formData.type = data.rfoType;
      formData.contact_name = data.contact.name;
      formData.contact_title = data.contact.title;
      formData.contact_email = data.contact.email;
      formData.contact_phone = data.contact.phone;

      const locationFromMaterial = data.materials[0].location;
      const locationIsPublicFromMaterial = data.materials[0].locationIsPublic;

      formData.locationIsPrivate = !locationIsPublicFromMaterial;
      formData.locationName = locationFromMaterial.name;
      formData.locationStreetAddress = locationFromMaterial.address;
      formData.locationPostalCode = locationFromMaterial.postalCode;
      formData.locationCity = configurationMunicipalityFromLocationCity(
        locationFromMaterial.cityId,
        regionDataFlat
      );

      const [servicesFromRfo, ...subServicesFromRfo] = data.service.serviceIds;

      formData.serviceName = servicesFromRfo;
      formData.subService = subServicesFromRfo;
      formData.serviceDescription = data.service.serviceDescription;
      formData.status = data.status;

      formData.attachments = data.attachments || [];

      formData.regions = data.regions ? mapRegionData(data.regions, regionDataFlat) : [];

      return formData;
    }

    default:
      return {};
  }
};
