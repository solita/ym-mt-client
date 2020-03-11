/// <reference types="cypress" />

import {
  loginSolitaUser,
  loginVestiaMunicipalWasteManagementUser,
  getUserBusinessId,
  logout,
  tryGetSolitaUserOrLogin,
  YM_BUSINESS_ID,
  tryGetYMUserOrLogin
} from "../../utils/login-util";

import {
  setSelectValueWithAssert,
  setTextValueWithAssert,
  dateToInputString,
  addDays,
  getDateString
} from "../../utils/form-utils";

import { uuid, makeRequestWithToken } from "../../utils/common-utils";
Cypress.env("RETRIES", 2);
const CompanyRfosCachedRequestAlias = "getCompanyRfosCached";
const SavedSearchesRequestAlias = "getSavedSearches";
const CompanyEventsRequestAlias = "getCompanyEvents";
const CompanyTsvWithContractRequestAlias = "getTsvWithContract";
const CompanyTsvWithoutContractRequestAlias = "getTsvWithoutContract";
const CompanyRfosRequestAlias = "getCompanyRfos";
const CompanyDetailsRequestAlias = "getCompanyDetails";

const expectCompanyRfosCachedRequest = userBusinessId => {
  cy.route({
    url: "/api/rfoc?*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
      expect(
        xhr.response.body.every(
          rfo =>
            rfo.businessId === userBusinessId &&
            rfo.company.businessId === userBusinessId
        ),
        "response should contain only own business ids"
      ).to.be.true;
    },
    onRequest: xhr => {
      expect(xhr.url).to.contain("CreatedByBusinessId=" + userBusinessId);
    }
  }).as(CompanyRfosCachedRequestAlias);
};

const expectCompanyRfosRequest = userBusinessId => {
  cy.route({
    url: "/api/rfo?*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
      expect(
        xhr.response.body.every(
          rfo =>
            rfo.businessId === userBusinessId &&
            rfo.company.businessId === userBusinessId
        ),
        "response should contain only own business ids"
      ).to.be.true;
    },
    onRequest: xhr => {
      expect(xhr.url).to.contain("CreatedByBusinessId=" + userBusinessId);
    }
  }).as(CompanyRfosRequestAlias);
};

const expectCompanyDetailsRequest = userBusinessId => {
  cy.route({
    url: "/api/company?*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
      expect(xhr.response.body.length).to.eq(1);
      expect(xhr.response.body[0].businessId).to.eq(userBusinessId);
    },
    onRequest: xhr => {
      expect(xhr.url).to.contain("BusinessIds[]=" + userBusinessId);
    }
  }).as(CompanyDetailsRequestAlias);
};

const expectSavedSearchesRequest = () => {
  cy.route({
    url: "/api/rfo/savesearch",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
    }
  }).as(SavedSearchesRequestAlias);
};

const expectCompanyEventsRequest = userBusinessId => {
  cy.route({
    url: "/api/company/events*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
    },
    onRequest: xhr => {
      expect(xhr.url).to.contain("eventForBusinessIds=" + userBusinessId);
    }
  }).as(CompanyEventsRequestAlias);
};

const expectCompanyTsvWithContractRequest = () => {
  cy.route({
    url: "/api/tsv*withOrWithoutContract=true",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
    }
  }).as(CompanyTsvWithContractRequestAlias);
};

const expectCompanyTsvWithoutContractRequest = () => {
  cy.route({
    url: "/api/tsv*withOrWithoutContract=false",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
    }
  }).as(CompanyTsvWithoutContractRequestAlias);
};

const expectOwnPageRequests = userBusinessId => {
  cy.server();
  expectCompanyRfosCachedRequest(userBusinessId);
  expectSavedSearchesRequest();
  expectCompanyEventsRequest(userBusinessId);
  expectCompanyTsvWithContractRequest();
  expectCompanyTsvWithoutContractRequest();

  cy.visit("/omasivu");
  cy.wait("@" + CompanyRfosCachedRequestAlias).then(xhr => {
    expect(xhr.status).to.equal(200);
  });
  cy.wait("@" + SavedSearchesRequestAlias).then(xhr => {
    expect(xhr.status).to.equal(200);
  });
  cy.wait("@" + CompanyEventsRequestAlias).then(xhr => {
    expect(xhr.status).to.equal(200);
  });
  cy.wait("@" + CompanyTsvWithContractRequestAlias).then(xhr => {
    expect(xhr.status).to.equal(200);
  });
  cy.wait("@" + CompanyTsvWithoutContractRequestAlias).then(xhr => {
    expect(xhr.status).to.equal(200);
  });
};

const visitAndEnsureUnauthorized = url => {
  cy.visit(url, { failOnStatusCode: false });
  cy.get(".qa-unauthorized").should("exist");
};

describe("Own page", () => {
  it("Can not access own pages unauthenticated", () => {
    logout().then(() => {
      visitAndEnsureUnauthorized("/omasivu");
      visitAndEnsureUnauthorized("/omasivu/viestit");
      visitAndEnsureUnauthorized("/omasivu/ilmoitukset");
      visitAndEnsureUnauthorized("/omasivu/omattiedot");
      visitAndEnsureUnauthorized("/tsv/sopimusarkisto");
      visitAndEnsureUnauthorized("/tsv/pyynnot");
    });
  });
  it("makes expected requests for normal user", () => {
    loginSolitaUser().then(user => {
      const userBusinessId = getUserBusinessId(user);
      expectOwnPageRequests(userBusinessId);
    });
  });
  it("makes expected requests for tsv user", () => {
    loginVestiaMunicipalWasteManagementUser().then(user => {
      const userBusinessId = getUserBusinessId(user);
      expectOwnPageRequests(userBusinessId);
    });
  });
  it("can visit company events page", () => {
    loginSolitaUser().then(user => {
      const userBusinessId = getUserBusinessId(user);
      cy.server();
      expectCompanyEventsRequest(userBusinessId);
      cy.visit("/omasivu/viestit");
      cy.wait("@" + CompanyEventsRequestAlias).then(xhr => {
        expect(xhr.status).to.equal(200);
      });
      cy.get("table").should("exist");
      cy.get("table")
        .find("tr")
        .its("length")
        .should("be.gte", 4);
    });
  });
  it("can visit company rfos page", () => {
    loginSolitaUser().then(user => {
      const userBusinessId = getUserBusinessId(user);
      cy.server();
      expectCompanyRfosRequest(userBusinessId);
      expectCompanyRfosCachedRequest(userBusinessId);
      cy.visit("/omasivu/ilmoitukset");
      cy.wait("@" + CompanyRfosCachedRequestAlias).then(xhr => {
        expect(xhr.status).to.equal(200);
      });
      cy.wait("@" + CompanyRfosRequestAlias).then(xhr => {
        expect(xhr.status).to.equal(200);
      });
    });
  });
  it("can visit own company details page and modify data", () => {
    loginSolitaUser().then(user => {
      const userBusinessId = getUserBusinessId(user);
      cy.server();
      expectCompanyDetailsRequest(userBusinessId);
      cy.visit("/omasivu/omattiedot");
      cy.wait("@" + CompanyDetailsRequestAlias).then(xhr => {
        expect(xhr.status).to.equal(200);
      });
      cy.get(".qa-editCompanyDetailsButton")
        .should("be.visible")
        .should("not.be.disabled")
        .click();
      const postalCodeSelector = 'input[name="locationPostalCode"]';
      let companyName = "";
      cy.get('input[name="name"]')
        .invoke("val")
        .then(v => {
          companyName = v;
        });
      cy.get(postalCodeSelector).clear();
      const newPostal = "" + Math.floor(Math.random() * 99999) + 1;
      setTextValueWithAssert(postalCodeSelector, newPostal);
      cy.route({
        url: "/api/company/details",
        method: "POST",
        onResponse: xhr => {
          expect(xhr.status).to.equal(200);
          expect(xhr.response.body.businessId).to.eq(userBusinessId);
          expect(xhr.response.body.address.postalCode).to.eq(newPostal);
          expect(xhr.response.body.name).to.eq(companyName);
        },
        onRequest: xhr => {
          expect(xhr.request.body.businessId).to.eq(userBusinessId);
          expect(xhr.request.body.address.postalCode).to.eq(newPostal);
          expect(xhr.request.body.name).to.eq(companyName);
        }
      }).as("saveCompanyDetails");
      cy.get(".qa-saveCompanyDetailsButton")
        .should("be.visible")
        .should("not.be.disabled")
        .click();
      cy.wait("@saveCompanyDetails").then(xhr => {
        expect(xhr.status).to.equal(200);
      });
      cy.get(".qa-editCompanyDetailsButton")
        .should("be.visible")
        .should("not.be.disabled");
    });
  });
  it("can add and remove own company registrations", () => {
    loginSolitaUser().then(user => {
      cy.visit("/omasivu/omattiedot");
      const userBusinessId = getUserBusinessId(user);
      const identification = "qa-id-" + uuid();
      const authority = "qa-authority";
      const registrationDate = new Date(2019, 5, 15);
      const validUntil = addDays(new Date(), 400);
      cy.get(".qa-addCompanyRegistration")
        .should("be.visible")
        .should("not.be.disabled")
        .scrollIntoView()
        .click({ force: true });
      setSelectValueWithAssert('select[name="type"]', "100");
      setTextValueWithAssert('input[name="identification"]', identification);
      setTextValueWithAssert('input[name="authority"]', authority);
      setTextValueWithAssert(
        'input[name="registrationDate"]',
        dateToInputString(registrationDate)
      );
      cy.get('input[name="authority"]').click();
      setTextValueWithAssert(
        'input[name="validUntil"]',
        dateToInputString(validUntil)
      );
      cy.get('input[name="authority"]').click();
      cy.server();
      cy.route({
        url: "/api/company/registrations",
        method: "POST",
        onResponse: xhr => {
          expect(xhr.status).to.equal(200);
          expect(xhr.response.body.businessId).to.eq(userBusinessId);
          expect(
            Array.isArray(xhr.response.body.registrationDocuments),
            "registrationDocuments is array"
          ).to.be.true;
          expect(
            xhr.response.body.registrationDocuments.find(
              f => f.identification === identification
            )
          ).to.not.be.undefined;
        },
        onRequest: xhr => {
          expect(xhr.request.body.businessId).to.eq(userBusinessId);
          expect(xhr.request.body.companyRegistration.identification).to.eq(
            identification
          );
          expect(xhr.request.body.companyRegistration.authority).to.eq(
            authority
          );
          expect(xhr.request.body.companyRegistration.registrationDate).to.eq(
            getDateString(registrationDate)
          );
          expect(xhr.request.body.companyRegistration.validUntil).to.eq(
            getDateString(validUntil)
          );
        }
      }).as("saveCompanyRegistration");
      cy.get(".qa-saveCompanyRegistration")
        .should("be.visible")
        .should("not.be.disabled")
        .scrollIntoView()
        .click();
      cy.wait("@saveCompanyRegistration").then(xhr => {
        const createdRegistration = xhr.response.body.registrationDocuments.find(
          f => f.identification === identification
        );
        expect(createdRegistration).to.not.be.undefined;
        expect(createdRegistration.authority).to.eq(authority);
        expect(
          createdRegistration.registrationDate.replace("00:00Z", "00:00.000Z")
        ).to.eq(getDateString(registrationDate));
        expect(
          createdRegistration.validUntil.replace("00:00Z", "00:00.000Z")
        ).to.eq(getDateString(validUntil));
        cy.get(".qa-removeCompanyRegistration-" + createdRegistration.id)
          .should("be.visible")
          .should("not.be.disabled")
          .scrollIntoView()
          .click();
        cy.route({
          url: `/api/company/${userBusinessId}/registrations/${createdRegistration.id}`,
          method: "DELETE",
          onResponse: xhr => {
            expect(xhr.status).to.equal(200);
            expect(xhr.response.body.businessId).to.eq(userBusinessId);
          }
        }).as("removeCompanyRegistration");
        cy.get(".qa-confirmRemoveCompanyRegistration")
          .should("be.visible")
          .should("not.be.disabled")
          .click();
        cy.wait("@removeCompanyRegistration").then(xhr => {
          expect(xhr.status).to.equal(200);
          const removedRegistration = xhr.response.body.registrationDocuments.find(
            f => f.identification === identification
          );
          expect(removedRegistration).to.be.undefined;
        });
      });
    });
  });

  it("cannot add and remove other company registartions", () => {
    const validYMRequest = {
      businessId: YM_BUSINESS_ID,
      companyRegistration: {
        type: "200",
        authority: "adsf",
        identification: "qa-id-" + uuid(),
        registrationDate: "2019-08-26T21:00:00.000Z",
        validUntil: getDateString(addDays(new Date(), 400)),
        attachments: []
      }
    };
    tryGetSolitaUserOrLogin().then(solitaUser => {
      makeRequestWithToken(
        "/api/company/registrations",
        () => validYMRequest,
        solitaUser.access_token,
        { failOnStatusCode: false }
      ).then(xhr => {
        expect(xhr.status).to.be.greaterThan(399);
      });

      tryGetYMUserOrLogin().then(ymUser => {
        makeRequestWithToken(
          "/api/company/registrations",
          () => validYMRequest,
          ymUser.access_token
        ).then(xhr => {
          expect(xhr.status).to.eq(200);

          const created = xhr.body.registrationDocuments.find(
            f =>
              f.identification ===
              validYMRequest.companyRegistration.identification
          );
          expect(created).to.not.be.undefined;

          makeRequestWithToken(
            `/api/company/${YM_BUSINESS_ID}/registrations/${created.id}`,
            () => validYMRequest,
            solitaUser.access_token,
            { failOnStatusCode: false, method: "DELETE" }
          ).then(xhr => {
            expect(xhr.status).to.be.greaterThan(399);
          });
        });
      });
    });
  });

  it("can visit company tsv contracts page", () => {
    loginSolitaUser().then(user => {
      const userBusinessId = getUserBusinessId(user);
      cy.server();
      expectCompanyTsvWithContractRequest();
      cy.visit("/tsv/sopimusarkisto");
      cy.wait("@" + CompanyTsvWithContractRequestAlias).then(xhr => {
        expect(xhr.status).to.equal(200);
      });
    });
  });

  it("can visit company tsv request page", () => {
    loginSolitaUser().then(user => {
      const userBusinessId = getUserBusinessId(user);
      cy.server();
      expectCompanyTsvWithoutContractRequest();
      cy.visit("/tsv/pyynnot");
      cy.wait("@" + CompanyTsvWithoutContractRequestAlias).then(xhr => {
        expect(xhr.status).to.equal(200);
      });
    });
  });
});
