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

const expectConfigirations = alias => {
  cy.route({
    url: "/api/configurations",
    method: "GET",
    onResponse: xhr => {
      expect(xhr.status).to.equal(200);

      expect(Array.isArray(xhr.response.body.ewcs)).to.be.true;
      expect(Array.isArray(xhr.response.body.industries)).to.be.true;
      expect(Array.isArray(xhr.response.body.materials)).to.be.true;
      expect(Array.isArray(xhr.response.body.municipalities)).to.be.true;
      expect(Array.isArray(xhr.response.body.services)).to.be.true;
      expect(Array.isArray(xhr.response.body.units)).to.be.true;

      expect(xhr.response.body.ewcs.length).to.be.greaterThan(1);
      expect(xhr.response.body.industries.length).to.be.greaterThan(1);
      expect(xhr.response.body.materials.length).to.be.greaterThan(1);
      expect(xhr.response.body.municipalities.length).to.be.greaterThan(1);
      expect(xhr.response.body.services.length).to.be.greaterThan(1);
      expect(xhr.response.body.units.length).to.be.greaterThan(1);
    }
  }).as(alias);
};

describe("Other pages", () => {
  it("Front page loads", () => {
    cy.server();
    const typeReceivingMaterial = ["receivingMaterial"];
    const typeOfferingMaterial = ["offeringWaste", "offeringMaterial"];
    const typeOfferingServices = ["offeringServices"];
    const aliasTypeReceivingMaterial =
      "getRfos" + typeReceivingMaterial.join("");
    const aliasTypeOfferingMaterial = "getRfos" + typeOfferingMaterial.join("");
    const aliasTypeOfferingServices = "getRfos" + typeOfferingServices.join("");
    const aliasGetStats = "getBasicStats";
    const aliasGetConfigurations = "getConfigurations";
    expectRfosRequest(typeReceivingMaterial, aliasTypeReceivingMaterial);
    expectRfosRequest(typeOfferingMaterial, aliasTypeOfferingMaterial);
    expectRfosRequest(typeOfferingServices, aliasTypeOfferingServices);
    expectBasicStatsRequest(aliasGetStats);
    expectConfigirations(aliasGetConfigurations);
    cy.visit("/");
    cy.wait("@" + aliasTypeReceivingMaterial).then(xhr => {
      expect(xhr.status).to.equal(200);
    });

    cy.wait("@" + aliasTypeOfferingMaterial).then(xhr => {
      expect(xhr.status).to.equal(200);
    });
    cy.wait("@" + aliasTypeOfferingServices).then(xhr => {
      expect(xhr.status).to.equal(200);
    });
    cy.wait("@" + aliasGetStats).then(xhr => {
      expect(xhr.status).to.equal(200);
    });
    cy.wait("@" + aliasGetConfigurations).then(xhr => {
      expect(xhr.status).to.equal(200);
    });
  });

  it("static pages load", () => {
    cy.visit("/tietoa-palvelusta");
    cy.visit("/ohjeet");
    cy.visit("/yhteystiedot");
  });
});
