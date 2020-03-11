import { visit } from "../utils/login-util";
import { addDays, getDateString } from "../utils/form-utils";
import { makeRequestWithToken } from "../utils/common-utils";

const DEFAULT_CLASSIFICATION = "muovi";
const DEFAULT_INDUSTRY = "muu_teollisuus";
const DEFAULT_CONTINUITY = "onetime";
const DEFAULT_QUANTITY_UNIT = "m2";
const DEFAULT_SERVICE = "kuljetus_kasittely";
const DEFAULT_ADDITIONAL_SERVICE = "kierratys";
const DEFAULT_LOCATION_CITY = "Helsinki";
const DEFAULT_LOCATION_CITY_ID = "M_33";
const DEFAULT_LOCATION_REGION = "Uusimaa";
const DEFAULT_LOCATION_REGION_ID = "R_1";

export const navigateToRfoView = rfoId => {
  return visit("/ilmoitukset/" + rfoId);
};

const createContact = () => {
  return {
    name: "offeringMaterial contact name",
    title: "offeringMaterial contact title",
    phone: "+35840123456",
    email: "offeringMaterial@solita.fi"
  };
};

const createLocation = () => {
  return {
    name: "offeringMaterial location name",
    address: "Alvar Aallon katu 5",
    postalCode: "00550",
    countryCode: "fi",
    city: DEFAULT_LOCATION_CITY,
    cityId: DEFAULT_LOCATION_CITY_ID,
    region: DEFAULT_LOCATION_REGION,
    regionId: DEFAULT_LOCATION_REGION_ID,
    coordinates: [{ type: "EUREF_FIN", lat: "6672864.688", lon: "385634.467" }]
  };
};

export const postRfo = (createFn, token, requestOptionsOverride = {}) => {
  return makeRequestWithToken(
    "/api/rfo",
    createFn,
    token,
    requestOptionsOverride
  );
};

export const postRfoWithoutChecks = (createFn, token) => {
  return makeRequestWithToken("/api/test/create-rfodoc", createFn, token);
};

export const createOfferingMaterial = () => {
  return {
    type: "offeringMaterial",
    data: {
      materials: [
        {
          classification: DEFAULT_CLASSIFICATION,
          industry: DEFAULT_INDUSTRY,
          isWaste: false,
          description: "qa testing rfo create offeringMaterial description",
          quantity: { amount: 158.5, unitOfMeasure: DEFAULT_QUANTITY_UNIT },
          continuity: DEFAULT_CONTINUITY,
          amountDescription: "offeringMaterial amount description",
          location: createLocation(),
          locationIsPublic: true
        }
      ],
      title: "qa testing rfo create offeringMaterial title",
      expires: getDateString(addDays(new Date(), 10)),
      contactIsPublic: true,
      contact: createContact(),
      attachments: []
    }
  };
};

export const createOfferingServices = () => {
  return {
    type: "offeringServices",
    data: {
      title: "qa testing rfo create offeringServices title ",
      attachments: [],
      expires: getDateString(addDays(new Date(), 10)),
      contactIsPublic: true,
      regions: [
        {
          id: DEFAULT_LOCATION_CITY_ID,
          nameFi: DEFAULT_LOCATION_CITY,
          nameSv: "Helsingfors"
        },
        {
          id: DEFAULT_LOCATION_REGION_ID,
          nameFi: DEFAULT_LOCATION_REGION,
          nameSv: "Nyland"
        }
      ],
      materials: [
        {
          locationIsPublic: true,
          location: createLocation()
        }
      ],
      contact: createContact(),
      service: {
        serviceIds: ["kuljetus_kasittely", "kierratys"],
        serviceDescription: "qa testing rfo create offeringMaterial description"
      }
    }
  };
};

export const createReceivingMaterial = () => {
  return {
    type: "receivingMaterial",
    data: {
      materials: [
        {
          classification: DEFAULT_CLASSIFICATION,
          description: "qa testing rfo create receivingMaterial description"
        }
      ],
      regions: [
        {
          id: DEFAULT_LOCATION_CITY_ID,
          nameFi: DEFAULT_LOCATION_CITY,
          nameSv: "Helsingfors"
        },
        {
          id: DEFAULT_LOCATION_REGION_ID,
          nameFi: DEFAULT_LOCATION_REGION,
          nameSv: "Nyland"
        }
      ],
      title: "qa testing rfo create receivingMaterial title",
      attachments: [],
      expires: getDateString(addDays(new Date(), 10)),
      contactIsPublic: true,
      contact: createContact()
    }
  };
};

export const createOfferingWaste = () => {
  return {
    type: "offeringWaste",
    data: {
      materials: [
        {
          classification: DEFAULT_CLASSIFICATION,
          industry: DEFAULT_INDUSTRY,
          isWaste: true,
          useTsv: true,
          description: "qa testing rfo create offeringWaste description",
          quantity: { amount: 158.5, unitOfMeasure: DEFAULT_QUANTITY_UNIT },
          continuity: DEFAULT_CONTINUITY,
          amountDescription: "offeringWaste amount description",
          location: createLocation(),
          service: {
            serviceIds: [DEFAULT_SERVICE, DEFAULT_ADDITIONAL_SERVICE],
            requirements: "offeringWaste service requirements",
            duration: "offeringWaste service duration"
          },
          locationIsPublic: true
        }
      ],
      title: "qa testing rfo create offeringWaste title",
      // waste offer needs to be open at least 14 days
      expires: getDateString(addDays(new Date(), 15)),
      contactIsPublic: true,
      contact: createContact(),
      attachments: []
    }
  };
};

export const editOfferingWaste = () => {
  let rfo = createOfferingWaste();
  rfo.data.materials[0].permanent = false; // A field that is added to the rfo when saving into db.
  rfo.data.expires =
    addDays(new Date(), 15)
      .toISOString()
      .split(".")[0] + "Z"; // the date without milliseconds, because that is the format that is got from backend
  return rfo;
};

const createTsvCapableRfoBase = () => {
  return JSON.parse(
    `{
    "PartitionKey": "d",
    "RfoType": "offeringWaste",
    "StatusName": "open",
    "StatusDate": "2019-04-20T09:25:52.8411568Z",
    "StatusChangedBy": "d5570472-ef66-45b0-9ddf-684ebc41027c",
    "Company": {
        "Id": "e8a3c44e-5a2b-18ab-0297-337701e5fc26",
        "Name": "Solita Oy",
        "BusinessId": "1060155-5",
        "Address": {
            "Name": "",
            "Address": "Alvar Aallon katu 5",
            "PostalCode": "",
            "City": "Helsinki",
            "CityId": "M_33",
            "Region": "Uusimaa",
            "RegionId": "R_1",
            "CountryCode": null,
            "CoordinatesPoint": {
                "type": "Point",
                "coordinates": [
                    24.93839719204329,
                    60.17660323126781
                ]
            },
            "Coordinates": [
                {
                    "Type": "WGS84",
                    "Lon": 24.93839719204329,
                    "Lat": 60.17660323126781
                },
                {
                    "Type": "EUREF_FIN",
                    "Lon": 385634.467,
                    "Lat": 6672864.688
                }
            ]
        },
        "Email": "",
        "Type": 10
    },
    "BusinessId": "1060155-5",
    "Title": "qa testing tsv - tsv capable rfo",
    "Created": "2019-04-20T09:25:52.8411568Z",
    "CreatedBy": "d5570472-ef66-45b0-9ddf-684ebc41027c",
    "Updated": null,
    "Expires": "2019-06-03T21:00:00Z",
    "ContactIsPublic": true,
    "Contact": {
        "Name": "Nordea Demo",
        "Title": "Nordea Demon rooli",
        "Phone": "+358 88 9900990",
        "Email": "testiosoite@solita.fi"
    },
    "Materials": [
        {
            "Classification": "puu",
            "Industry": "rakentaminen_ja_purkaminen",
            "EwcCode": "02 05 01",
            "IsWaste": true,
            "UseTsv": true,
            "Type": "nondangerous",
            "Permanent": false,
            "Description": "jätteen kuvaus",
            "Quantity": {
                "Amount": 20,
                "UnitOfMeasure": "t"
            },
            "Continuity": "onetime",
            "AmountDescription": "Lisätietoja määrästä",
            "LocationIsPublic": true,
            "Location": {
                "Name": null,
                "Address": null,
                "PostalCode": null,
                "City": "Haapajärvi",
                "CityId": "M_20",
                "Region": "Pohjois-Pohjanmaa",
                "RegionId": "R_16",
                "CountryCode": "fi",
                "CoordinatesPoint": {
                    "type": "Point",
                    "coordinates": [
                        25.319573563896448,
                        63.74851275088416
                    ]
                },
                "Coordinates": [
                    {
                        "Type": "WGS84",
                        "Lon": 25.319573563896448,
                        "Lat": 63.74851275088416
                    },
                    {
                        "Type": "EUREF_FIN",
                        "Lon": 417076.009,
                        "Lat": 7070081.603
                    }
                ]
            },
            "Service": {
                "ServiceIds": [
                    "kuljetus_kasittely",
                    "hyodyntaminen_maantaytossa_tai_maisemoinnissa"
                ],
                "Requirements": "Palvelun kuvaus",
                "Duration": "Palvelun ajankohta"
            }
        }
    ],
    "MaterialsWanted": [],
    "Regions": [],
    "Service": null,
    "Attachments": [],
    "TextIndex": "tsv-kelpoinen ilmoitus testien pohjaksilisätietoja määrästäpuujätteen kuvaus02 05 01rakentaminen_ja_purkaminenhaapajärvipohjois-pohjanmaapalvelun kuvaus",
    "LocationIndex": [
        "M_20",
        "R_16"
    ],
    "Offers": [],
    "LatestTsv": null
}`
  );
};

export const createTsvCapableRfo = () => {
  let tsvCapableRfo = createTsvCapableRfoBase();

  let now = new Date();
  let created = new Date(now);
  let expires = new Date(now);
  created.setMonth(now.getMonth() - 8);
  expires.setMonth(now.getMonth() - 2);
  tsvCapableRfo.Created = created; // created 8 months ago
  tsvCapableRfo.StatusDate = created; // modified 8 months ago
  tsvCapableRfo.Expires = expires; // expired 2 months ago

  return tsvCapableRfo;
};
