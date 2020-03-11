/// <reference types="cypress" />
Cypress.env("RETRIES", 2);
describe("RfoListing", () => {
  it("api returns valid JSON", () => {
    cy.request("/api/rfo").then(response => {
      assert.isTrue(response.isOkStatusCode);
      assert.isArray(response.body);
    });
  });
});
