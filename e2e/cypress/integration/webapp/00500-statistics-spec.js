Cypress.env("RETRIES", 2);
const expectRfosRequest = (rfoTypes, alias) => {
  cy.route({
    url: "/api/rfoc*" + rfoTypes[0] + "*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body), "response is array").to.be.true;
      expect(
        xhr.response.body.every(rfo => rfoTypes.includes(rfo.rfoType)),
        "only give rfoTypes"
      ).to.be.true;
    }
  }).as(alias);
};

const expectBasicStatsRequest = alias => {
  cy.route({
    url: "/api/stats/basic",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(xhr.response.body.userCount).to.be.greaterThan(0);
      expect(xhr.response.body.companyCount).to.be.greaterThan(0);
      expect(xhr.response.body.rfoCount).to.be.greaterThan(0);
    }
  }).as(alias);
};

const expectRfoSummary = alias => {
  cy.route({
    url: "/api/rfosummary*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body)).to.be.true;
    }
  }).as(alias);
};

const expectTsvSummary = alias => {
  cy.route({
    url: "/api/tsvcontractsummary*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body)).to.be.true;
    }
  }).as(alias);
};

const expectWasteBatchSummary = alias => {
  cy.route({
    url: "/api/wastebatch*",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);
      expect(Array.isArray(xhr.response.body)).to.be.true;
    }
  }).as(alias);
};

describe("Statistics", () => {
  it("can load initial page", () => {
    cy.visit("/kokoomatiedot");
    cy.get("body")
      .find("a.buttonStyle")
      .its("length")
      .should("be.eq", 3);
  });

  it("rfo stats load", () => {
    cy.visit("/kokoomatiedot/ilmoitukset");
    cy.server();
    expectRfoSummary("getRfoSummary");
    cy.get("button.buttonStyle")
      .should("not.be.disabled")
      .should("be.visible")
      .click();
    cy.wait("@getRfoSummary").then(xhr => {
      expect(xhr.status).to.equal(200);
    });
  });

  it("tsv stats load", () => {
    cy.visit("/kokoomatiedot/tsv");
    cy.server();
    expectTsvSummary("getTsvSummary");
    cy.get("button.buttonStyle")
      .should("not.be.disabled")
      .should("be.visible")
      .click();
    cy.wait("@getTsvSummary").then(xhr => {
      expect(xhr.status).to.equal(200);
    });
  });

  it("waste batch stats load", () => {
    cy.visit("/kokoomatiedot/pienerat");
    cy.server();
    expectWasteBatchSummary("getWasteBatchSummary");
    cy.get("button.buttonStyle")
      .should("not.be.disabled")
      .should("be.visible")
      .click();
    cy.wait("@getWasteBatchSummary").then(xhr => {
      expect(xhr.status).to.equal(200);
    });
  });
});
