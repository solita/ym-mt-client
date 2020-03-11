/// <reference types="cypress" />
const {
  doManualIdentityServerLoginForSolitaUser,
  doManualIdentityServerLoginForAdminUser,
  doIdentityServerLogin,
  VESTIA_BUSINESS_ID
} = require("../../utils/login-util");
const {
  setSelectValueWithAssert,
  setTextValueWithAssert
} = require("../../utils/form-utils");

Cypress.env("RETRIES", 2);

const { uuid } = require("../../utils/common-utils");

const MULTIPLIERS = [7, 9, 10, 5, 8, 4, 2];
const calculateChecksum = idNumbers => {
  let sum = 0;
  for (let i = 0; i < idNumbers.length; i++) {
    sum += parseInt(idNumbers[i], 10) * MULTIPLIERS[i];
  }
  let remainder = sum % 11;
  if (remainder === 1) {
    return -1;
  } else if (remainder > 1) {
    remainder = 11 - remainder;
  }

  return remainder;
};

const randomBusinessId = () => {
  while (true) {
    const businessId = (
      Math.floor(Math.random() * 1000000) + 1000000
    ).toString();
    const checksum = calculateChecksum(businessId);
    if (checksum !== -1) {
      return businessId + "-" + checksum;
    }
  }
};

const assertLoginOkButNeedsConfirmation = (email, pass) => {
  cy.visit("/Account/Logout");
  cy.contains("Olet nyt kirjautunut ulos");
  cy.visit("/Account/Login");
  return doIdentityServerLogin(email, pass).then(() => {
    return cy
      .get("[data-qa]")
      .invoke("attr", "data-qa")
      .then(data => JSON.parse(data));
  });
};

const setCommonRegistrationFieldsAndSubmit = registeration => {
  setTextValueWithAssert("#Phone", registeration.businessId);
  setTextValueWithAssert("#Email", registeration.email);
  setTextValueWithAssert("#Password", registeration.email);
  setTextValueWithAssert("#ConfirmPassword", registeration.email);
  cy.get('label.checkbox-label[for="HasAgreedTerms"]').click();
  cy.get('label.checkbox-label[for="HasAgreedToRepresentingCompany"]').click();
  cy.get('button.btn-primary[type="submit"]').click();
  cy.get('a[href="/Account/ResendEmailConfirmation"]')
    .should("not.be.disabled")
    .should("be.visible");
  return cy
    .get("[data-qa]")
    .invoke("attr", "data-qa")
    .then(data => {
      const registerationData = JSON.parse(data);
      return assertLoginOkButNeedsConfirmation(
        registeration.email,
        registeration.email
      ).then(data => {
        expect(data.Email).to.equal(registeration.email);
        return Object.assign(data, { registerationData: registerationData });
      });
    });
};

const doFakeIdentify = role => {
  cy.visit("/External/Challenge?provider=ci-test-oicd&returnUrl=&role=" + role);
  doManualIdentityServerLoginForSolitaUser();
};

const loginAdmin = () => {
  cy.visit("/Account/Login");
  return doManualIdentityServerLoginForAdminUser();
};

const createRegistrationData = () => {
  return {
    companyName: "QATestCompany",
    businessId: randomBusinessId(),
    phone: "1234567",
    email: "Qa1-" + uuid() + "@solita.fi"
  };
};

const confirmEmail = (userid, token) => {
  cy.visit(
    "/Account/ConfirmEmail?userId=" +
      encodeURIComponent(userid) +
      "&code=" +
      encodeURIComponent(token)
  );
  cy.get('a[href="/Account/Login"]')
    .should("exist")
    .should("not.be.disabled")
    .should("be.visible")
    .click();
  cy.location("pathname").should("contain", "/Account/Login");
};

const ensureCanLogin = (username, pass) => {
  cy.visit("/Account/Login");
  return doIdentityServerLogin(username, pass).then(() => {
    // for some reason auto login does not work with cypress but we assume redirect to client means login was successful
    cy.location("host").should("equal", "test.server.fi"); 
    return undefined;
  });
};

const authorizeAndEnsureSuccess = (email, businessId) => {
  cy.contains(email);
  cy.contains(businessId);
  cy.get('button[type="submit"]')
    .should("exist")
    .should("not.be.disabled")
    .should("be.visible")
    .click();
  cy.location("pathname").should("contain", "Account/DoManualAuthorization");
  cy.get(".alert.alert-success").should("exist");
};

const authorizeUser = (userId, email, businessId) => {
  cy.visit("/Account/AcceptUserAuthorization?userId=" + userId);
  authorizeAndEnsureSuccess(email, businessId);
};

const authorizeUserWithToken = (userId, token, email, businessId) => {
  cy.visit(
    "/Account/AcceptUserAuthorizationWithToken?userId=" +
      userId +
      "&token=" +
      encodeURIComponent(token)
  );
  authorizeAndEnsureSuccess(email, businessId);
};

const ROLE_USER = "User";
const ROLE_TSV = "MunicipalWasteManagement";
const ROLE_COORDINATOR = "RegionalCoordinator";
const ROLE_OFFICER = "PublicOfficer";

describe("Register users", () => {
  it("Can register normal user, confirm email and login", () => {
    doFakeIdentify(ROLE_USER);
    const registeration = createRegistrationData();
    setTextValueWithAssert("#CompanyName", registeration.companyName);
    setTextValueWithAssert("#BusinessId", registeration.businessId);
    setCommonRegistrationFieldsAndSubmit(registeration).then(data => {
      expect(data.Role).to.equal(ROLE_USER);
      expect(data.RequiresAuthorization).to.be.false;
      expect(data.RequiresEmailConfirmation).to.be.true;
      confirmEmail(data.registerationData.UserId, data.registerationData.Token);
      ensureCanLogin(registeration.email, registeration.email);
    });
  });

  it("Can register tsv handler user", () => {
    doFakeIdentify(ROLE_TSV);
    const registeration = Object.assign({}, createRegistrationData(), {
      businessId: VESTIA_BUSINESS_ID
    });
    setSelectValueWithAssert("#SelectedTsvCompany", registeration.businessId);
    setCommonRegistrationFieldsAndSubmit(registeration).then(data => {
      expect(data.Role).to.equal(ROLE_TSV);
      expect(data.RequiresAuthorization).to.be.true;
      expect(data.RequiresEmailConfirmation).to.be.true;
      expect(data.registerationData.UserAuthorizationToken).to.not.be.undefined;
      confirmEmail(data.registerationData.UserId, data.registerationData.Token);
      cy.visit("/Account/Logout");
      authorizeUserWithToken(
        data.registerationData.UserId,
        data.registerationData.UserAuthorizationToken,
        registeration.email,
        registeration.businessId
      );
      ensureCanLogin(registeration.email, registeration.email);
    });
  });

  it("Can register regional coordinator, confirm email, authorize and login", () => {
    doFakeIdentify(ROLE_COORDINATOR);
    const registeration = createRegistrationData();
    setTextValueWithAssert("#CompanyName", registeration.companyName);
    setTextValueWithAssert("#BusinessId", registeration.businessId);
    setCommonRegistrationFieldsAndSubmit(registeration).then(data => {
      expect(data.Role).to.equal(ROLE_COORDINATOR);
      expect(data.RequiresAuthorization).to.be.true;
      expect(data.RequiresEmailConfirmation).to.be.true;
      confirmEmail(data.registerationData.UserId, data.registerationData.Token);
      loginAdmin().then(() => {
        authorizeUser(
          data.UserId,
          registeration.email,
          registeration.businessId
        );
        ensureCanLogin(registeration.email, registeration.email);
      });
    });
  });

  it("Can register public officer, confirm email, authorize and login", () => {
    doFakeIdentify(ROLE_OFFICER);
    const registeration = createRegistrationData();
    setTextValueWithAssert("#CompanyName", registeration.companyName);
    setTextValueWithAssert("#BusinessId", registeration.businessId);
    cy.get(
      'label[for="PublicOfficerFacilities-' + VESTIA_BUSINESS_ID + '"]'
    ).click();
    setCommonRegistrationFieldsAndSubmit(registeration).then(data => {
      expect(data.Role).to.equal(ROLE_OFFICER);
      expect(data.RequiresAuthorization).to.be.true;
      expect(data.RequiresEmailConfirmation).to.be.true;
      confirmEmail(data.registerationData.UserId, data.registerationData.Token);
      loginAdmin().then(() => {
        authorizeUser(
          data.UserId,
          registeration.email,
          registeration.businessId
        );
        ensureCanLogin(registeration.email, registeration.email);
      });
    });
  });

  it("Should not be able to authorize if not admin", () => {
    cy.visit("/Account/AcceptUserAuthorization?userId=qa-test");
    cy.location("pathname").should("contain", "Account/Login");
    doManualIdentityServerLoginForSolitaUser().then(() => {
      cy.location("pathname").should("contain", "Account/AccessDenied");
    });
  });
});
