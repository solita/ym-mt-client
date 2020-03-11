import {
  doIdentityServerLogin,
  logout,
  ADMIN_USER,
  SOLITA_USER,
  EXAMPLE_USER
} from "../../utils/login-util";
Cypress.env("RETRIES", 2);
const clickToFirstDetailPage = () => {
  return cy
    .get("table")
    .find(".btn.btn-primary")
    .first()
    .click()
    .then(btn => {
      cy.location("pathname").should("contain", btn.attr("href"));
    });
};

describe("Admin pages", () => {

  it.skip("cannot visit admin pages as normal user", () => {
    logout().then(() => {
      cy.visit("/");
      cy.location("pathname").should("contain", "/Account/Login");
      doIdentityServerLogin(SOLITA_USER.username, SOLITA_USER.pass);
      cy.location("pathname").should("contain", "/Account/AccessDenied");
    });
  });

  it.skip("cannot visit admin pages as municipal user", () => {
    logout().then(() => {
      cy.visit("/");
      cy.location("pathname").should("contain", "/Account/Login");
      doIdentityServerLogin(EXAMPLE_USER.username, EXAMPLE_USER.pass);
      cy.location("pathname").should("contain", "/Account/AccessDenied");
    });
  });

  it.skip("can browse admin pages as admin user", () => {
    logout().then(() => {
      cy.visit("/Configuration/Clients");
      cy.location("pathname").should("contain", "/Account/Login");
      doIdentityServerLogin(ADMIN_USER.username, ADMIN_USER.pass);
      cy.wait(2000); //initial login can take some time...
      cy.location("pathname").should("contain", "/Configuration/Clients");
      clickToFirstDetailPage();

      cy.visit("/Configuration/IdentityResources");
      cy.location("pathname").should(
        "contain",
        "/Configuration/IdentityResources"
      );
      clickToFirstDetailPage();

      cy.visit("/Configuration/ApiResources");
      cy.location("pathname").should("contain", "/Configuration/ApiResources");
      clickToFirstDetailPage();

      cy.visit("/Grant/PersistedGrants");
      cy.location("pathname").should("contain", "/Grant/PersistedGrants");
      clickToFirstDetailPage();

      cy.visit("/Identity/Users");
      cy.location("pathname").should("contain", "/Identity/Users");
      clickToFirstDetailPage();

      cy.visit("/Identity/Roles");
      cy.location("pathname").should("contain", "/Identity/Roles");
      clickToFirstDetailPage();

      cy.visit("/Company/Companies");
      cy.location("pathname").should("contain", "/Company/Companies");

      cy.visit("/Log/Files");
      cy.location("pathname").should("contain", "/Log/Files");
    });
  });
});
