/// <reference types="cypress" />

import { addCreatedRfoToStore } from "../../utils/test-store";
import {
  createOfferingMaterial,
  createOfferingServices,
  createReceivingMaterial,
  createOfferingWaste,
  editOfferingWaste,
  navigateToRfoView,
  postRfo
} from "../../utils/create-rfo-utils";
import {
  setSelectValueWithAssert,
  setTextValueWithAssert,
  setRadioValueWithAssert,
  setCustomSelectorValueWithAssert,
  dateStringToDate,
  dateToInputString,
  setContact,
  setLocation
} from "../../utils/form-utils";
import {
  loginSolitaUser,
  tryGetYMUserOrLogin,
  tryGetSolitaUserOrLogin
} from "../../utils/login-util";
import { getLatestEvents } from "../../utils/event-util";
Cypress.env("RETRIES", 2);
describe("Create, edit, and copy rfo", () => {
  after(() => {
    // we could delete created rfos here.....
  });

  const navigateToAddRfo = () => {
    cy.get('a[href="/ilmoitukset/lisaa"]')
      .last()
      .click({ force: true });
  };

  const navigateToCopyRfo = rfoId => {
    navigateToRfoView(rfoId);
    cy.get(".qa-copyRfoBtn")
      .should("not.be.disabled")
      .should("be.visible")
      .click();
    cy.url().should("include", "/lisaa");
    cy.url().should("include", rfoId);
  };

  const navigateToEditRfo = rfoId => {
    navigateToRfoView(rfoId);
    cy.get(".qa-editRfoBtn")
      .should("not.be.disabled")
      .should("be.visible")
      .click();
    cy.url().should("include", "/muokkaa");
    cy.url().should("include", rfoId);
  };

  const selectClassificationByValue = value => {
    setSelectValueWithAssert('select[name="classification"]', value);
  };

  const selectIndustryByValue = value => {
    setSelectValueWithAssert('select[name="industry"]', value);
  };

  const setTitle = title => {
    setTextValueWithAssert('input[name="title"]', title);
  };

  const setDescription = text => {
    setTextValueWithAssert('textarea[name="description"]', text);
  };

  const setContinuity = value => {
    setRadioValueWithAssert('input[name="continuity"]', value);
  };

  const setQuantityAmount = value => {
    setTextValueWithAssert('input[name="quantityAmount"]', value);
  };

  const setQuantityUnit = value => {
    setSelectValueWithAssert('select[name="quantityUnit"]', value);
  };

  const setAmountDescription = value => {
    setTextValueWithAssert('textarea[name="amountDescription"]', value);
  };

  const setService = value => {
    setSelectValueWithAssert('select[name="serviceName"]', value);
  };

  const setServiceRequirements = value => {
    setTextValueWithAssert('textarea[name="serviceRequirements"]', value);
  };

  const setServiceDuration = value => {
    setTextValueWithAssert('textarea[name="serviceDuration"]', value);
  };

  const setSubservice = value => {
    setCustomSelectorValueWithAssert(".qa-subservice-selector", value);
  };

  const setServiceDescription = value => {
    setTextValueWithAssert('textarea[name="serviceDescription"]', value);
  };

  const setExpires = dateStr => {
    setTextValueWithAssert('input[name="expires"]', dateStr);
  };

  const previewRfo = () => {
    cy.get("button.qa-preview-rfo")
      .should("not.be.disabled")
      .click();
  };

  const assertRfoView = rfo => {
    const rfoDataMaterial = rfo.data.materials[0];

    if (rfoDataMaterial.description) {
      cy.contains(rfoDataMaterial.description).should("exist");
    }
    if (rfoDataMaterial.quantity) {
      cy.contains(rfoDataMaterial.quantity.amount).should("exist");
      cy.contains(rfoDataMaterial.amountDescription).should("exist");
    }
    // cy.contains(rfo.data.materials[0].location.name).should("exist");
    if (rfoDataMaterial.location) {
      cy.contains(rfoDataMaterial.location.address).should("exist");
      cy.contains(rfoDataMaterial.location.postalCode).should("exist");
      cy.contains(rfoDataMaterial.location.city).should("exist");
    }
    if (rfoDataMaterial.service) {
      cy.contains(rfoDataMaterial.service.requirements).should("exist");
      cy.contains(rfoDataMaterial.service.duration).should("exist");
    }
    cy.contains(rfo.data.title).should("exist");
    cy.contains(rfo.data.contact.name).should("exist");
    cy.contains(rfo.data.contact.title).should("exist");
    cy.contains(rfo.data.contact.phone).should("exist");
    cy.contains(rfo.data.contact.email).should("exist");
    if (rfo.data.service) {
      cy.contains(rfo.data.service.serviceDescription);
    }
    if (Array.isArray(rfo.data.regions)) {
      rfo.data.regions.forEach(r => {
        cy.contains(r.nameFi);
      });
    }
  };

  const clickSubmitRfo = () => {
    cy.get("button.qa-submit-rfo")
      .scrollIntoView()
      .should("not.be.disabled")
      .should("be.visible")
      .click();
  };

  const submitRfo = rfo => {
    cy.server();
    cy.route({
      url: "/api/rfo",
      method: "POST",
      onResponse: xhr => {
        expect(xhr.status).to.equal(201);
        expect(xhr.response.body).to.have.property("id");
      },
      onRequest: xhr => {
        expect(xhr.request.body).to.deep.equal(rfo);
      }
    }).as("submitRfo");

    clickSubmitRfo();

    return cy.wait("@submitRfo").then(xhr => {
      addCreatedRfoToStore(xhr.response.body).then(() => {
        return xhr.response.body.id;
      });
    });
  };

  const submitEditedRfo = (rfo, id) => {
    cy.server();
    cy.route({
      url: "/api/rfo/" + id,
      method: "PUT",
      onResponse: xhr => {
        expect(xhr.status).to.equal(201);
        expect(xhr.response.body).to.have.property("id");
      },
      onRequest: xhr => {
        expect(xhr.request.body).to.deep.equal(rfo);
      }
    }).as("submitEditedRfo");

    clickSubmitRfo();

    return cy.wait("@submitEditedRfo").then(xhr => {
      addCreatedRfoToStore(xhr.response.body).then(() => {
        return xhr.response.body.id;
      });
    });
  };

  const setServiceData = rfoDataMaterial => {
    setService(rfoDataMaterial.service.serviceIds[0]);
    setSubservice(rfoDataMaterial.service.serviceIds[1]);
    setServiceRequirements(rfoDataMaterial.service.requirements);
    setServiceDuration(rfoDataMaterial.service.duration);
  };

  const setOfferingServicesData = rfo => {
    setService(rfo.data.service.serviceIds[0]);
    setSubservice(rfo.data.service.serviceIds[1]);
    setServiceDescription(rfo.data.service.serviceDescription);
  };

  const setQuantity = rfoDataMaterial => {
    setQuantityAmount("" + rfoDataMaterial.quantity.amount);
    setQuantityUnit(rfoDataMaterial.quantity.unitOfMeasure);
    setAmountDescription(rfoDataMaterial.amountDescription);
  };

  const setRegions = regions => {
    regions.forEach(r => {
      setCustomSelectorValueWithAssert(".qa-region-selector", r.nameFi, r.id);
    });
  };

  const testPostWithInvalidCodes = (access_token, rfo) => {
    postRfo(() => rfo, access_token, {
      failOnStatusCode: false
    }).then(response => expect(response.status).to.greaterThan(399));
  };

  const assertCreatedRfoEvent = (token, rfoId) => {
    getLatestEvents(token, 10, "RequestForOfferCreated").then(response => {
      let rfosCreated = response.body.filter(
        f => f.eventType === "RequestForOfferCreated" && f.event.id === rfoId
      );
      expect(rfosCreated.length).to.be.equal(1);
    });
  };

  it("can create offeringServices rfo", () => {
    loginSolitaUser().then(user => {
      navigateToAddRfo();
      cy.get(".qa-offeringServices").click();
      const rfo = createOfferingServices();
      const rfoDataMaterial = rfo.data.materials[0];
      setTitle(rfo.data.title);
      setOfferingServicesData(rfo);
      setLocation(rfoDataMaterial.location);
      setRegions(rfo.data.regions);
      const dateStr = dateToInputString(dateStringToDate(rfo.data.expires));
      setExpires(dateStr);
      setContact(rfo.data.contact);
      previewRfo();
      assertRfoView(rfo); // preview
      submitRfo(rfo).then(rfoId => {
        assertRfoView(rfo); // view
        assertCreatedRfoEvent(user.access_token, rfoId);
      });
    });
  });

  it("can create offeringWaste rfo", () => {
    loginSolitaUser().then(user => {
      navigateToAddRfo();
      cy.get(".qa-wasteOrMaterial").click();
      cy.get(".qa-offeringWaste").click();
      const rfo = createOfferingWaste();
      const rfoDataMaterial = rfo.data.materials[0];
      setTitle(rfo.data.title);
      selectClassificationByValue(rfo.data.materials[0].classification);
      selectIndustryByValue(rfoDataMaterial.industry);
      setDescription(rfo.data.materials[0].description);
      setContinuity(rfoDataMaterial.continuity);
      setQuantity(rfoDataMaterial);
      setServiceData(rfoDataMaterial);
      setLocation(rfoDataMaterial.location);
      const dateStr = dateToInputString(dateStringToDate(rfo.data.expires));
      setExpires(dateStr);
      setContact(rfo.data.contact);
      previewRfo();
      assertRfoView(rfo); // preview
      submitRfo(rfo).then(rfoId => {
        assertRfoView(rfo); // view
        assertCreatedRfoEvent(user.access_token, rfoId);
      });
    });
  });

  it("can create offeringMaterial rfo", () => {
    loginSolitaUser().then(user => {
      navigateToAddRfo();
      cy.get(".qa-wasteOrMaterial").click();
      cy.get(".qa-offeringMaterial").click();
      const rfo = createOfferingMaterial();
      const rfoDataMaterial = rfo.data.materials[0];
      setTitle(rfo.data.title);
      selectClassificationByValue(rfo.data.materials[0].classification);
      selectIndustryByValue(rfoDataMaterial.industry);
      setDescription(rfo.data.materials[0].description);
      setContinuity(rfoDataMaterial.continuity);
      setQuantity(rfoDataMaterial);
      setLocation(rfoDataMaterial.location);
      const dateStr = dateToInputString(dateStringToDate(rfo.data.expires));
      setExpires(dateStr);
      setContact(rfo.data.contact);
      previewRfo();
      assertRfoView(rfo); // preview
      submitRfo(rfo).then(rfoId => {
        assertRfoView(rfo); // view
        assertCreatedRfoEvent(user.access_token, rfoId);
      });
    });
  });

  it("can create receivingMaterial rfo", () => {
    loginSolitaUser().then(user => {
      navigateToAddRfo();
      cy.get(".qa-receivingMaterial").click();
      const rfo = createReceivingMaterial();
      const rfoDataMaterial = rfo.data.materials[0];
      setTitle(rfo.data.title);
      selectClassificationByValue(rfoDataMaterial.classification);
      setDescription(rfoDataMaterial.description);
      setRegions(rfo.data.regions);
      const dateStr = dateToInputString(dateStringToDate(rfo.data.expires));
      setExpires(dateStr);
      setContact(rfo.data.contact);
      previewRfo();
      assertRfoView(rfo); // preview
      submitRfo(rfo).then(rfoId => {
        assertRfoView(rfo); // view
        assertCreatedRfoEvent(user.access_token, rfoId);
      });
    });
  });

  it("can copy rfo", () => {
    let rfoData = editOfferingWaste();
    rfoData.data.title = "qa testing rfo offeringWaste";

    loginSolitaUser().then(user => {
      postRfo(() => rfoData, user.access_token).then(response => {
        expect(response.status).to.lessThan(300);

        navigateToCopyRfo(response.body.id);

        cy.wait(5000); // Wait for the map to load. 

        rfoData.data.title = "qa testing rfo offeringWaste copy";
        rfoData.data.materials[0].amountDescription =
          "offeringWaste amount description copy";
        rfoData.data.materials[0].service.requirements =
          "offeringWaste service requirements copy";
        setTitle(rfoData.data.title);
        setAmountDescription(rfoData.data.materials[0].amountDescription);
        setServiceRequirements(rfoData.data.materials[0].service.requirements);

        previewRfo();
        //cy.wait(5000); // If there is a problem with the map loading, uncomment this to wait for the map to load. 
        assertRfoView(rfoData);
        submitRfo(rfoData);
        assertRfoView(rfoData);
      });
    });
  });

  it("can edit rfo", () => {
    let rfoData = editOfferingWaste();
    rfoData.data.title = "qa testing rfo offeringWaste";

    loginSolitaUser().then(user => {
      postRfo(() => rfoData, user.access_token).then(response => {
        expect(response.status).to.lessThan(300);

        const rfoId = response.body.id;
        navigateToEditRfo(rfoId);

        cy.wait(5000); // Wait for the map to load. 

        rfoData.data.title = "qa testing rfo edit offeringWaste";
        rfoData.data.materials[0].amountDescription =
          "offeringWaste amount description edited";
        rfoData.data.materials[0].service.requirements =
          "offeringWaste service requirements edited";
        setTitle(rfoData.data.title);
        setAmountDescription(rfoData.data.materials[0].amountDescription);
        setServiceRequirements(rfoData.data.materials[0].service.requirements);

        previewRfo();
        //cy.wait(5000); // If there is a problem with the map loading, uncomment this to wait for the map to load. 
        assertRfoView(rfoData);
        submitEditedRfo(rfoData, rfoId);
        assertRfoView(rfoData);
      });
    });
  });

  it("offeringWaste: should allow valid ews code", () => {
    tryGetSolitaUserOrLogin().then(user => {
      postRfo(() => {
        let rfo = createOfferingWaste();
        rfo.data.materials[0].ewcCode = "01 01 01";
        return rfo;
      }, user.access_token).then(response =>
        expect(response.status).to.lessThan(300)
      );
    });
  });

  it("offeringWaste: should allow valid empty service if not tsv", () => {
    tryGetSolitaUserOrLogin().then(user => {
      postRfo(() => {
        let rfo = createOfferingWaste();
        rfo.data.materials[0].useTsv = false;
        rfo.data.materials[0].service.serviceIds = [];
        return rfo;
      }, user.access_token).then(response =>
        expect(response.status).to.lessThan(300)
      );
    });
  });

  it("offeringWaste: should not allow invalid codes on POST", () => {
    tryGetSolitaUserOrLogin().then(user => {
      const originalRfo = createOfferingWaste();
      let rfo = createOfferingWaste();

      //invalid ewc
      rfo.data.materials[0].ewcCode = "this is not a valid ewc";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].ewcCode = originalRfo.data.materials[0].ewcCode;

      //invalid industry
      rfo.data.materials[0].industry = "this is not a valid industry";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].industry = originalRfo.data.materials[0].industry;

      //invalid classification
      rfo.data.materials[0].classification =
        "this is not a valid classification";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].classification =
        originalRfo.data.materials[0].classification;

      //invalid cityId
      rfo.data.materials[0].location.cityId = "this is not a valid cityId";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].location.cityId =
        originalRfo.data.materials[0].location.cityId;

      //invalid serviceid
      rfo.data.materials[0].service.serviceIds = [
        "this is not a valid serviceId"
      ];
      testPostWithInvalidCodes(user.access_token, rfo);

      //subserviceId as first service id
      rfo.data.materials[0].service.serviceIds = ["kierratys"];
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].service.serviceIds =
        originalRfo.data.materials[0].service.serviceIds;

      //subserviceIds not given and tsv selected
      rfo.data.materials[0].service.serviceIds = ["kierratys"];
      rfo.data.materials[0].useTsv = true;
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].service.serviceIds =
        originalRfo.data.materials[0].service.serviceIds;
      rfo.data.materials[0].useTsv = rfo.data.materials[0].useTsv;
      //invalid unit
      rfo.data.materials[0].quantity.unitOfMeasure = "this is not a valid unit";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].quantity.unitOfMeasure =
        originalRfo.data.materials[0].industry;
    });
  });

  it("offeringMaterial: should not allow invalid codes on POST", () => {
    tryGetSolitaUserOrLogin().then(user => {
      const originalRfo = createOfferingMaterial();
      let rfo = createOfferingMaterial();

      //invalid industry
      rfo.data.materials[0].industry = "this is not a valid industry";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].industry = originalRfo.data.materials[0].industry;

      //invalid classification
      rfo.data.materials[0].classification =
        "this is not a valid classification";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].classification =
        originalRfo.data.materials[0].classification;

      //invalid cityId
      rfo.data.materials[0].location.cityId = "this is not a valid cityId";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].location.cityId =
        originalRfo.data.materials[0].location.cityId;

      //invalid unit
      rfo.data.materials[0].quantity.unitOfMeasure = "this is not a valid unit";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].quantity.unitOfMeasure =
        originalRfo.data.materials[0].industry;
    });
  });

  it("receivingMaterial: should not allow invalid codes on POST", () => {
    tryGetSolitaUserOrLogin().then(user => {
      const originalRfo = createReceivingMaterial();
      let rfo = createReceivingMaterial();

      //invalid classification
      rfo.data.materials[0].classification =
        "this is not a valid classification";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].classification =
        originalRfo.data.materials[0].classification;

      //invalid cityId regions
      rfo.data.regions = [{ id: "M_33" }, { id: "this is not a valid cityId" }];
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.regions = originalRfo.data.regions;
    });
  });

  it("offeringService: should not allow invalid codes on POST", () => {
    tryGetSolitaUserOrLogin().then(user => {
      const originalRfo = createOfferingServices();
      let rfo = createOfferingServices();

      //invalid cityId
      rfo.data.materials[0].location.cityId = "this is not a valid cityId";
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.materials[0].location.cityId =
        originalRfo.data.materials[0].location.cityId;

      //invalid cityId regions
      rfo.data.regions = [{ id: "M_33" }, { id: "this is not a valid cityId" }];
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.regions = originalRfo.data.regions;

      //invalid serviceId
      rfo.data.service.serviceIds = ["this is not a valid serviceId"];
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.service.serviceIds = originalRfo.data.service.serviceIds;

      //invalid serviceId (subservice as 1st item)
      rfo.data.service.serviceIds = ["kierratys"];
      testPostWithInvalidCodes(user.access_token, rfo);
      rfo.data.service.serviceIds = originalRfo.data.service.serviceIds;
    });
  });

  it("should not show private location for anonymous user", () => {
    tryGetSolitaUserOrLogin().then(user => {
      let wasteRfo = createOfferingWaste();
      wasteRfo.data.materials[0].locationIsPublic = false;
      postRfo(() => wasteRfo, user.access_token).then(response => {
        expect(response.status).to.lessThan(300);
        cy.request({
          url: "/api/rfo/" + response.body.id,
          method: "GET",
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            pragma: "no-cache"
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.payload.materials[0].location.name.length).to.eq(
            0
          );
          expect(
            response.body.payload.materials[0].location.address.length
          ).to.eq(0);
          expect(
            response.body.payload.materials[0].location.postalCode.length
          ).to.eq(0);
        });
      });
    });
  });

  it("should not show private contact for anonymous user", () => {
    tryGetSolitaUserOrLogin().then(user => {
      let wasteRfo = createOfferingWaste();
      wasteRfo.data.contactIsPublic = false;
      postRfo(() => wasteRfo, user.access_token).then(response => {
        expect(response.status).to.lessThan(300);
        cy.request({
          url: "/api/rfo/" + response.body.id,
          method: "GET",
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            pragma: "no-cache"
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.payload.company.name.length).to.eq(0);
          expect(response.body.payload.company.address.address.length).to.eq(0);
          expect(response.body.payload.company.address.name.length).to.eq(0);
          expect(response.body.payload.company.address.postalCode.length).to.eq(
            0
          );
          expect(response.body.payload.company.businessId.length).to.eq(0);
          expect(response.body.payload.contact.email.length).to.eq(0);
          expect(response.body.payload.contact.name.length).to.eq(0);
          expect(response.body.payload.contact.phone.length).to.eq(0);
          expect(response.body.payload.contact.title.length).to.eq(0);
        });
      });
    });
  });

  it("should be able to close only own rfo", () => {
    loginSolitaUser().then(user => {
      postRfo(() => createOfferingWaste(), user.access_token).then(response => {
        expect(response.status).to.lessThan(300);
        cy.visit("/ilmoitukset/" + response.body.id);
        cy.server();
        cy.route({
          url: "/api/rfo/" + response.body.id + "/close",
          method: "POST",
          onResponse: xhr => {
            expect(xhr.status).to.equal(200);
          }
        }).as("closeRfo");
        const stub = cy.stub();
        cy.on("window:confirm", stub);
        cy.get(".qa-rfoCloseButton")
          .scrollIntoView()
          .should("not.be.disabled")
          .should("be.visible")
          .click()
          .then(() => {
            expect(stub).to.be.called;
          });
        cy.wait("@closeRfo");

        tryGetYMUserOrLogin().then(ymUser => {
          postRfo(() => createOfferingWaste(), user.access_token).then(
            response => {
              // should not be able to close other company rfo
              cy.request({
                url: "/api/rfo/" + response.body.id + "/close",
                method: "POST",
                failOnStatusCode: false,
                headers: {
                  accept: "application/json, text/plain, */*",
                  "accept-language": "en-US,en;q=0.9",
                  authorization: "Bearer " + ymUser.access_token,
                  "cache-control": "no-cache",
                  "content-type": "application/json;charset=UTF-8",
                  pragma: "no-cache"
                }
              }).then(response => expect(response.status).to.greaterThan(399));

              // anon should not be able to delete rfo
              cy.request({
                url: "/api/rfo/" + response.body.id + "/close",
                method: "POST",
                failOnStatusCode: false,
                headers: {
                  accept: "application/json, text/plain, */*",
                  "accept-language": "en-US,en;q=0.9",
                  "cache-control": "no-cache",
                  "content-type": "application/json;charset=UTF-8",
                  pragma: "no-cache"
                }
              }).then(response => expect(response.status).to.greaterThan(399));
            }
          );
        });
      });
    });
  });
});
