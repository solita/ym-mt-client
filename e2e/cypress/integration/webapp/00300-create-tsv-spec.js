/// <reference types="cypress" />
import {
  createTsvCapableRfo,
  postRfoWithoutChecks,
  navigateToRfoView
} from "../../utils/create-rfo-utils";
import {
  createTsvData,
  createContractDraftData
} from "../../utils/create-tsv-utils";
import {
  loginSolitaUser,
  tryGetSolitaUserOrLogin,
  tryGetVestiaUserOrLogin,
  loginVestiaMunicipalWasteManagementUser,
  visit
} from "../../utils/login-util";
import {
  setSelectValueWithAssert,
  setTextValueWithAssert,
  dateStringToDate,
  dateToInputString
} from "../../utils/form-utils";
import { getLatestEvents, assertEventCreated } from "../../utils/event-util";
Cypress.env("RETRIES", 2);
const clearPrefilledTexts = () => {
  cy.get('[type="text"]').clear();
  cy.get('[type="phone"]').clear();
  cy.get('[type="email"]').clear();
};

const setFacility = value => {
  setSelectValueWithAssert('select[name="facility"]', value);
};
const setAdditionalInfo = value => {
  setTextValueWithAssert('textarea[name="requestText"]', value);
};
const setContactName = value => {
  setTextValueWithAssert('input[name="contact_name"]', value);
};
const setContactTitle = value => {
  setTextValueWithAssert('input[name="contact_title"]', value);
};
const setContactPhone = value => {
  setTextValueWithAssert('input[name="contact_phone"]', value);
};
const setContactEmail = value => {
  setTextValueWithAssert('input[name="contact_email"]', value);
};

const setContractNumber = value => {
  setTextValueWithAssert('input[name="ContractNumber"]', value);
};
const setContractName = value => {
  setTextValueWithAssert('input[name="ContractName"]', value);
};
const setContractReference = value => {
  setTextValueWithAssert('input[name="ContractReference"]', value);
};
const setWasteDescription = value => {
  setTextValueWithAssert('textarea[name="WasteDescription"]', value);
};
const setServiceName = value => {
  setSelectValueWithAssert('select[name="serviceName"]', value);
};
const setServicePriceEurPerTonne = value => {
  setTextValueWithAssert('input[name="ServicePriceEurPerTonne"]', value);
};
const setServiceStartDate = value => {
  setTextValueWithAssert('input[name="ServiceStartDate"]', value);
};
const setServiceEndDate = value => {
  cy.get('input[name="ServiceEndDate"]')
    .scrollIntoView({ offset: { top: 100, left: 0 } })
    .click();
  setTextValueWithAssert('input[name="ServiceEndDate"]', value);
};
const setServiceDescription = value => {
  cy.get('textarea[name="ServiceDescription"]').click({ force: true });
  setTextValueWithAssert('textarea[name="ServiceDescription"]', value);
};
const setContractEndDate = value => {
  cy.get('input[name="ContractEndDate"]')
    .scrollIntoView({ offset: { top: 100, left: 0 } })
    .click();
  setTextValueWithAssert('input[name="ContractEndDate"]', value);
};
const setContractTerms = value => {
  setTextValueWithAssert('textarea[name="ContractTerms"]', value);
};
const setContractTerminationTerms = value => {
  setTextValueWithAssert('textarea[name="contractTerminationTerms"]', value);
};

const addTsvCapableRfoToDb = token => {
  return postRfoWithoutChecks(createTsvCapableRfo, token).then(response => {
    expect(response.status).to.eq(200); // Confirm that the rfo was successfully added to the db
  });
};

const navigateToCreateTsvForm = rfoId => {
  navigateToRfoView(rfoId).then(f => {
    cy.get(".qa-openTsvCreateForm")
      .should("not.be.disabled")
      .should("be.visible")
      .click();
    cy.url().should("include", "/teetsv");
  });
};

const navigateToCreateTsvContractDraftForm = tsvId => {
  visit("/tsv/pyynnot/" + tsvId);
  cy.get(".qa-openTsvContractDraftCreateForm")
    .should("not.be.disabled")
    .should("be.visible")
    .click();
  cy.url().should("include", "/tsv/sopimusluonnokset/");
};

const navigateToViewTsvContract = tsvId => {
  visit("/tsv/pyynnot/" + tsvId);
};

const fillDataToTsvForm = data => {
  clearPrefilledTexts();
  setFacility(data.facility);
  setAdditionalInfo(data.requestText);
  setContactName(data.contact_name);
  setContactTitle(data.contact_title);
  setContactPhone(data.contact_phone);
  setContactEmail(data.contact_email);
};

const fillDataToContractDraftForm = data => {
  const serviceStartDateStr = dateToInputString(
    dateStringToDate(data.ServiceStartDate)
  );
  const serviceEndDateStr = dateToInputString(
    dateStringToDate(data.ServiceEndDate)
  );
  const contractEndDateStr = dateToInputString(
    dateStringToDate(data.ContractEndDate)
  );

  setContractNumber(data.ContractNumber);
  setContractName(data.ContractName);
  setContractReference(data.ContractReference);
  setWasteDescription(data.WasteDescription);
  setServiceName(data.serviceName);
  setServicePriceEurPerTonne(data.ServicePriceEurPerTonne);

  setServiceStartDate(serviceStartDateStr);
  setServiceEndDate(serviceEndDateStr);
  setServiceDescription(data.ServiceDescription);
  setContractEndDate(contractEndDateStr);
  setContractTerminationTerms(data.ContractTerminationTerms);
  setContractTerms(data.ContractTerms);
};

const assertCreatedTsvView = data => {
  cy.contains(data.facilityName).should("exist");
  cy.contains(data.requestText).should("exist");
  cy.contains(data.contact_name).should("exist");
  cy.contains(data.contact_title).should("exist");
  cy.contains(data.contact_phone).should("exist");
  return cy.contains(data.contact_email).should("exist");
};

const assertTsvContractView = data => {
  cy.contains(data.ContractName).should("exist");
  cy.contains(data.ContractNumber).should("exist");
  cy.contains(data.ContractReference).should("exist");
  cy.contains(data.WasteDescription).should("exist");
  cy.contains(data.ServicePriceEurPerTonne).should("exist");
  cy.contains(data.ServiceDescription).should("exist");
  cy.contains(data.ContractTerms).should("exist");
  cy.contains(data.serviceNameValue).should("exist");
};

const makeTsvRequest = rfoId => {
  cy.server();
  cy.route({
    url: "/api/tsv",
    method: "POST"
  }).as("submitTsvRequest");

  navigateToCreateTsvForm(rfoId);
  cy.get(".qa-submit-tsv").should("be.disabled");
  const tsvData = createTsvData();
  fillDataToTsvForm(tsvData);
  cy.get(".qa-submit-tsv")
    .should("not.be.disabled")
    .click();

  return cy.wait("@submitTsvRequest").then(xhr => {
    cy.url().should("include", "/tsv/pyynnot/");
    return assertCreatedTsvView(tsvData).then(() => {
      return xhr.response.body;
    });
  });
};

const cancelTheTsvRequest = (user, tsv) => {
  cy.visit("/tsv/pyynnot/" + tsv.id);
  cy.server();
  cy.route({
    url: "/api/tsv/id/" + tsv.id + "/cancel",
    method: "PUT",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(xhr.response.body).to.have.property("id");
    }
  }).as("cancelTsv");

  cy.get(".qa-cancelTsvRequest")
    .scrollIntoView()
    .should("not.be.disabled")
    .should("be.visible")
    .click();
  cy.wait("@cancelTsv").then(xhr => {
    assertEventCreated(
      user,
      "TsvRequestCanceled",
      event => event.id === tsv.id && event.rfo.id === tsv.rfo.id,
      user
    );

    tryGetVestiaUserOrLogin().then(vestiaUser => {
      assertEventCreated(
        vestiaUser,
        "TsvRequestCanceledByClient",
        event => event.id === tsv.id && event.rfo.id === tsv.rfo.id,
        user
      );
    });
  });
};

const makeContractDraftByMunicipality = (solitaUser, tsv) => {
  return loginVestiaMunicipalWasteManagementUser().then(user => {
    navigateToCreateTsvContractDraftForm(tsv.id);
    const contractDraft = createContractDraftData();
    fillDataToContractDraftForm(contractDraft);
    cy.get(".qa-submitContractDraft")
      .should("not.be.disabled")
      .click();
    cy.url().should("include", "/tsv/sopimukset/");

    assertEventCreated(
      user,
      "TsvContractDraftMade",
      event => event.id === tsv.id,
      user
    );

    assertEventCreated(
      solitaUser,
      "TsvContractDraftMadeByFacility",
      event => event.id === tsv.id,
      user
    );

    return assertTsvContractView(contractDraft);
  });
};

const acceptContract = tsv => {
  loginSolitaUser().then(solitaUser => {
    navigateToViewTsvContract(tsv.id);

    cy.get(".qa-acceptTsvContract")
      .should("exist")
      .should("not.be.disabled")
      .scrollIntoView()
      .focus()
      .click({ force: true });

    cy.contains("Sopimus tehty").should("exist");

    assertEventCreated(
      solitaUser,
      "TsvContractAccepted",
      event => event.id === tsv.id,
      solitaUser
    );

    tryGetVestiaUserOrLogin().then(vestiaUser => {
      assertEventCreated(
        vestiaUser,
        "TsvContractAcceptedByClient",
        event => event.id === tsv.id,
        solitaUser
      );
    });
  });
};

const getFacilityId = () => {
  return cy.request("/api/tsv/facilities").then(response => {
    expect(response.status).to.eq(200);
  });
};

const createTsvRequest = (rfoId, facilityId) => {
  return {
    rfoId: rfoId,
    facilityId: facilityId,
    requestText: "qa test creates a tsv request",
    requestContactName: "qa Solita user name",
    requestContactTitle: "qa Solita user title",
    requestContactPhone: "qa Solita user phone",
    requestContactEmail: "ym-tori-test.Solita@solita.fi"
  };
};

const postTSVRequest = (token, tsv) => {
  const payload = JSON.stringify(tsv);
  return cy.request({
    url: "/api/tsv",
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      authorization: "Bearer " + token,
      "cache-control": "no-cache",
      "content-type": "application/json;charset=UTF-8",
      pragma: "no-cache"
    },
    body: payload
  });
};

const createNewTsv = token => {
  return addTsvCapableRfoToDb(token).then(response => {
    const rfoId = response.body;
    return getFacilityId().then(facilityResponse => {
      const facility = facilityResponse.body.find(
        f => f.name.indexOf("estia") > 0
      );
      const tsv = createTsvRequest(rfoId, facility.id);
      return postTSVRequest(token, tsv).then(response => {
        expect(response.status).to.eq(200);
        return response.body;
      });
    });
  });
};

describe("Create TSV request", function() {
  it("Can make a tsv request", () => {
    loginSolitaUser().then(user => {
      addTsvCapableRfoToDb(user.access_token).then(response => {
        const rfoId = response.body;

        makeTsvRequest(rfoId).then(tsv => {
          assertEventCreated(
            user,
            "TsvRequestSent",
            event => event.id === tsv.id && event.rfo.id === rfoId,
            user
          );

          tryGetVestiaUserOrLogin().then(vestiaUser => {
            assertEventCreated(
              vestiaUser,
              "TsvRequestReceived",
              event => event.id === tsv.id && event.rfo.id === rfoId,
              user
            );
          });
        });
      });
    });
  });

  it("Can cancel a tsv request and create another request on same rfo", () => {
    loginSolitaUser().then(user => {
      createNewTsv(user.access_token).then(tsv => {
        cancelTheTsvRequest(user, tsv);

        const newTsv = createTsvRequest(tsv.rfo.id, tsv.tsvFacility.id);
        postTSVRequest(user.access_token, newTsv).then(response => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it("Can make a contract from a tsv request", () => {
    loginSolitaUser().then(user => {
      createNewTsv(user.access_token).then(tsv => {
        makeContractDraftByMunicipality(user, tsv).then(() => {
          acceptContract(tsv);
        });
      });
    });
  });
});
