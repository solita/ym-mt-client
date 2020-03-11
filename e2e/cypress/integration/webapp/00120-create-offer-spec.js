/// <reference types="cypress" />
import {
  addCreatedOfferToStore,
  addCreatedRfoToStore,
  getCreatedRfos,
  getCurrentUserFromSession
} from "../../utils/test-store";
import {
  loginSolitaUser,
  loginYMUser,
  logout,
  SOLITA_BUSINESS_ID,
  YM_BUSINESS_ID
} from "../../utils/login-util";
import { postRfo } from "../../utils/create-rfo-utils";
import {
  setTextValueWithAssert,
  setSelectValueWithAssert,
  setCustomSelectorValueWithAssert,
  setContact,
  setLocation,
  dateToInputString,
  dateStringToDate,
  addDays,
  getDateString
} from "../../utils/form-utils";
import {
  createOfferingMaterial,
  createOfferingServices,
  createReceivingMaterial,
  createOfferingWaste,
  navigateToRfoView
} from "../../utils/create-rfo-utils";
import { getLatestEvents } from "../../utils/event-util";
Cypress.env("RETRIES", 2);
describe("Create offer", () => {
  const localStore = {};

  after(() => {
    // we could delete created rfos here.....
  });

  const ensureSolitaRfo = (createFn, type, token) => {
    return getCreatedRfos().then(rfos => {
      const found = rfos.filter(
        f => f.company.businessId === SOLITA_BUSINESS_ID && f.rfoType === type
      );
      if (found.length > 0) {
        const key = "Solita" + type.charAt(0).toUpperCase() + type.slice(1);
        localStore[key] = found[0];
        return cy.wrap(found[0]);
      } else {
        return postRfo(createFn, token).then(response => {
          return addCreatedRfoToStore(response.body).then(f => {
            const key = "Solita" + type.charAt(0).toUpperCase() + type.slice(1);
            localStore[key] = response.body;
            return response.body;
          });
        });
      }
    });
  };

  before(() => {
    loginSolitaUser().then(f => {
      const user = getCurrentUserFromSession();
      const token = user.access_token;
      ensureSolitaRfo(createOfferingMaterial, "offeringMaterial", token);
      ensureSolitaRfo(createOfferingServices, "offeringServices", token);
      ensureSolitaRfo(createReceivingMaterial, "receivingMaterial", token);
      ensureSolitaRfo(createOfferingWaste, "offeringWaste", token);
    });
  });

  const submitOffer = (rfo, offer, offererBusinessId) => {
    const rfoId = rfo.id;
    cy.server();
    cy.route({
      url: "/api/rfo/" + rfo.id + "/offer",
      method: "POST",
      onResponse: xhr => {
        expect(xhr.status).to.equal(201);
        expect(xhr.response.body).to.have.property("id");
        expect(xhr.response.body).to.have.property("rfoId", rfoId);
        if (offer.description) {
          expect(xhr.response.body).to.have.property(
            "description",
            offer.description
          );
        } else {
          expect(xhr.response.body).to.have.property(
            "serviceDescription",
            offer.serviceDescription
          );
        }

        expect(xhr.response.body).to.have.property("offerer");
        expect(xhr.response.body.offerer).to.have.property(
          "businessId",
          offererBusinessId
        );
      },
      onRequest: xhr => {
        expect(xhr.request.body).to.deep.equal(offer);
        expect(xhr.request.headers["Authorization"] ? true : false).to.be.true;
      }
    }).as("submitOffer");
    cy.get(".qa-submit-offer")
      .should("not.be.disabled")
      .should("be.visible")
      .click();

    cy.wait("@submitOffer").then(xhr => {
      assertOfferCreatedEvent(
        xhr.response.body,
        xhr.request.headers["Authorization"].split(" ")[1]
      );
      addCreatedOfferToStore(xhr.response.body);
    });
  };

  const getContactFromUser = user => {
    return {
      name:
        (user.profile.given_name || "") +
        " " +
        (user.profile.family_name || ""),
      phone: user.profile.phone_number || "",
      email: user.profile.email || "",
      title: "qa-title"
    };
  };

  const createSimpleOffer = (rfo, user) => {
    return {
      rfoId: rfo.id,
      description: "qa offer description for " + rfo.rfoType
    };
  };

  const createWasteOffer = (rfo, user) => {
    return {
      rfoId: rfo.id,
      serviceName: "kuljetus_kasittely",
      subServices: ["esikasittely"],
      serviceDescription: "qa offer service description for " + rfo.rfoType,
      timeOfService: "qa offer time of service",
      location: {
        name: "Solita HKI",
        address: "alvar aallon katu 5",
        postalCode: "00550",
        countryCode: "fi",
        city: "Helsinki",
        cityId: "M_33",
        region: "Uusimaa",
        regionId: "R_1",
        coordinates: [
          { type: "EUREF_FIN", lat: "6672864.688", lon: "385634.467" }
        ]
      },
      priceOfService: "5000",
      priceDescriptionOfService: "qa offer price description",
      otherTermsOfService: "qa offer terms of service ",
      expires: getDateString(addDays(new Date(), 5)),
      contact: getContactFromUser(user),
      permissionAssurance: true,
      attachments: []
    };
  };

  const setDescription = value => {
    setTextValueWithAssert('textarea[name="description"]', value);
  };

  // waste offer fields--->
  const setService = value => {
    setSelectValueWithAssert('select[name="serviceName"]', value);
  };
  const setServiceDescription = value => {
    setTextValueWithAssert('textarea[name="serviceDescription"]', value);
  };
  const setServiceTime = value => {
    setTextValueWithAssert('input[name="timeOfService"]', value);
  };
  const setPrice = value => {
    setTextValueWithAssert('input[name="priceOfService"]', value);
  };
  const setPriceDescription = value => {
    setTextValueWithAssert('textarea[name="priceDescriptionOfService"]', value);
  };
  const setTerms = value => {
    setTextValueWithAssert('textarea[name="otherTermsOfService"]', value);
  };
  const setExpires = dateStr => {
    setTextValueWithAssert('input[name="expires"]', dateStr);
  };
  const setSubservice = value => {
    setCustomSelectorValueWithAssert(".qa-subservice-selector", value);
  };

  const testSimpleOffer = rfo => {
    return loginYMUser().then(user => {
      return navigateToRfoView(rfo.id).then(f => {
        cy.get(".qa-createOfferBtn")
          .should("not.be.disabled")
          .should("be.visible")
          .click();

        cy.get(".qa-submit-offer").should("be.disabled");
        cy.get("body").then(body => {
          assert.equal(
            body.find("textarea").length,
            1,
            "Should have only one textarea"
          );
        });
        let offer = createSimpleOffer(rfo, user);
        setDescription(offer.description);
        submitOffer(rfo, offer, YM_BUSINESS_ID);
        assertCreatedOfferView(offer);
      });
    });
  };

  const createOfferViaRequest = (rfo, user, createFn) => {
    const offer = createFn(rfo, user);
    const headers = user.access_token
      ? {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          authorization: "Bearer " + user.access_token,
          "cache-control": "no-cache",
          "content-type": "application/json;charset=UTF-8",
          pragma: "no-cache"
        }
      : {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json;charset=UTF-8",
          pragma: "no-cache"
        };
    return cy.request({
      url: "/api/rfo/" + offer.rfoId + "/offer",
      method: "POST",
      body: JSON.stringify(offer),
      failOnStatusCode: false,
      headers: headers
    });
  };

  const assertCreatedOfferView = offer => {
    if (offer.description) {
      cy.contains(offer.description).should("exist");
    } else {
      cy.contains(offer.serviceDescription).should("exist");
      cy.contains(offer.timeOfService).should("exist");
      cy.contains(offer.priceOfService).should("exist");
      cy.contains(offer.priceDescriptionOfService).should("exist");
      cy.contains(offer.otherTermsOfService).should("exist");

      cy.contains(offer.contact.name).should("exist");
      cy.contains(offer.contact.phone).should("exist");
      cy.contains(offer.contact.email).should("exist");

      cy.contains(offer.location.address).should("exist");
      cy.contains(offer.location.postalCode).should("exist");
      cy.contains(offer.location.city).should("exist");
    }
  };

  const assertOfferCreatedEvent = (offer, token) => {
    getLatestEvents(token, 10, "OfferCreated").then(response => {
      let offersCreated = response.body.filter(
        f =>
          f.eventType === "OfferCreated" &&
          f.event.id === offer.id &&
          f.event.rfoId === offer.rfoId
      );
      expect(offersCreated.length).to.be.equal(1);
    });
  };

  const assertNoOfferButton = () => {
    cy.get(".qa-createOfferBtn").should("not.exist");
  };

  const asserNoOfferButtonInLocalRfos = () => {
    // check button is not there

    navigateToRfoView(localStore.SolitaOfferingMaterial.id).then(f =>
      assertNoOfferButton()
    ),
      navigateToRfoView(localStore.SolitaOfferingServices.id).then(f =>
        assertNoOfferButton()
      ),
      navigateToRfoView(localStore.SolitaReceivingMaterial.id).then(f =>
        assertNoOfferButton()
      ),
      navigateToRfoView(localStore.SolitaOfferingWaste.id).then(f =>
        assertNoOfferButton()
      );
  };

  const assertServerRefusesCreation = user => {
    createOfferViaRequest(
      localStore.SolitaOfferingMaterial,
      user,
      createSimpleOffer
    ).then(response => {
      expect(response.status).to.greaterThan(399);
    }),
      createOfferViaRequest(
        localStore.SolitaOfferingServices,
        user,
        createSimpleOffer
      ).then(response => {
        expect(response.status).to.greaterThan(399);
      }),
      createOfferViaRequest(
        localStore.SolitaReceivingMaterial,
        user,
        createSimpleOffer
      ).then(response => {
        expect(response.status).to.greaterThan(399);
      }),
      createOfferViaRequest(
        localStore.SolitaOfferingWaste,
        user,
        createWasteOffer
      ).then(response => {
        expect(response.status).to.greaterThan(399);
      });
  };

  it("should not be able to create offer for own rfo", () => {
    loginSolitaUser().then(user => {
      asserNoOfferButtonInLocalRfos();
      assertServerRefusesCreation(user);
    });
  });

  it("should not be able to create offer when not logged in", () => {
    logout().then(f => {
      const user = {
        profile: {
          given_name: "foo",
          email: "foo.bar@solita.fi",
          family_name: "bar",
          phone_number: "04077889944"
        }
      };
      assertServerRefusesCreation(user);
      asserNoOfferButtonInLocalRfos();
    });
  });

  it("can respond to offering material", () => {
    testSimpleOffer(localStore.SolitaOfferingMaterial);
  });

  it("can respond to offering services", () => {
    testSimpleOffer(localStore.SolitaOfferingServices);
  });

  it("can respond to receiving material", () => {
    testSimpleOffer(localStore.SolitaReceivingMaterial);
  });

  it("can respond to offering waste", () => {
    const rfo = localStore.SolitaOfferingWaste;
    loginYMUser().then(user => {
      navigateToRfoView(rfo.id);
      cy.get(".qa-createOfferBtn")
        .should("not.be.disabled")
        .should("be.visible")
        .click();

      cy.get(".qa-submit-offer").should("be.disabled");

      const offer = createWasteOffer(rfo, user);
      setService(offer.serviceName);
      setSubservice(offer.subServices[0]);
      setServiceDescription(offer.serviceDescription);
      setServiceTime(offer.timeOfService);
      setPrice(offer.priceOfService);
      setPriceDescription(offer.priceDescriptionOfService);
      setTerms(offer.otherTermsOfService);
      setLocation(offer.location);
      const dateStr = dateToInputString(dateStringToDate(offer.expires));
      setExpires(dateStr);
      setContact(offer.contact);
      cy.get(".qa-submit-offer").should("be.disabled");
      cy.get('label[for="permissionAssurance"]').click();
      cy.get(".qa-submit-offer").should("not.be.disabled");
      submitOffer(rfo, offer, YM_BUSINESS_ID);
      assertCreatedOfferView(offer);
    });
  });
});
