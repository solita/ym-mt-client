import { getCurrentUserFromSession } from "./test-store";

const {
  saveSessionState,
  restoreSessionState,
  getCachedUserSession
} = require("../utils/test-store");
export const SOLITA_BUSINESS_ID = "1060155-5";
export const YM_BUSINESS_ID = "0519456-1";
export const VESTIA_BUSINESS_ID = "1569793-9";

export const logout = () => {
  return visit("/").then(f => {
    return cy.get("body").then(body => {
      if (body.find(".qa-logout").length > 0) {
        // asume we're logged in if no login found
        cy.get(".qa-logout").click({ force: true });
        cy.get(".qa-login");
      }
      return undefined;
    });
  });
};

const isUserValid = user => {
  return (
    user &&
    new Date(user.expires_at * 1000) >
      new Date(new Date().getTime() + 3 * 60 * 1000)
  );
};

const getCachedSession = email => {
  return getCachedUserSession(email).then(session => {
    if (session && isUserValid(session.currentUser)) {
      return session;
    }
    return false;
  });
};

const loginFromPersitance = session => {
  restoreSessionState(session);
  return cy
    .visit("/", {
      onBeforeLoad: cw => {
        cw.cypress_test_session_in_progress = true;
      }
    })
    .then(f => {
      return cy.get(".qa-logout").then(f => {
        const user = getCurrentUserFromSession();
        return user;
      });
    });
};

export const doIdentityServerLogin = (email, pass) => {
  cy.get("#Username")
    .scrollIntoView()
    .type(email);
  cy.get("#Password")
    .scrollIntoView()
    .type(pass);
  return cy.get("button.btn-primary").click();
};

const loginManual = (email, pass) => {
  return logout().then(() => {
    return visit("/").then(() => {
      // we need to login....
      cy.get(".qa-login").click();
      doIdentityServerLogin(email, pass);
      return cy.get(".qa-logout").then(f => {
        return saveSessionState().then(f => {
          return cy.get(".qa-logout").then(f => {
            const user = getCurrentUserFromSession();
            return user;
          });
        });
      });
    });
  });
};

const loginUser = (email, pass) => {
  return getCachedSession(email).then(session => {
    return session && isUserValid(session.currentUser)
      ? loginFromPersitance(session)
      : loginManual(email, pass);
  });
};

export const SOLITA_USER = {
  username: "xxxxx-Solita@solita.fi",
  pass: "xxxxx"
};

export const YM_USER = {
  username: "xxxxx-YM@solita.fi",
  pass: "xxxxx"
};

export const EXAMPLE_USER = {
  username: "xxxxx-MUNICIPAL-example@solita.fi",
  pass: "xxxxx"
};

export const ADMIN_USER = {
  username: "xxxxx-SYSADMIN@solita.fi",
  pass: "xxxxx"
};

export const doManualIdentityServerLoginForSolitaUser = () => {
  return doIdentityServerLogin(SOLITA_USER.username, SOLITA_USER.pass);
};

export const doManualIdentityServerLoginForAdminUser = () => {
  return doIdentityServerLogin(ADMIN_USER.username, ADMIN_USER.pass);
};

export const tryGetUserOrLogin = user => {
  return getCachedSession(user.username).then(session => {
    return session && isUserValid(session.currentUser)
      ? session.currentUser
      : loginUser(user.username, user.pass);
  });
};

export const tryGetSolitaUserOrLogin = () => {
  return tryGetUserOrLogin(SOLITA_USER);
};

export const tryGetYMUserOrLogin = () => {
  return tryGetUserOrLogin(YM_USER);
};

export const tryGetVestiaUserOrLogin = () => {
  return tryGetUserOrLogin(EXAMPLE_USER);
};

export const loginSolitaUser = () => {
  return loginUser(SOLITA_USER.username, SOLITA_USER.pass);
};

export const loginYMUser = () => {
  return loginUser(YM_USER.username, YM_USER.pass);
};

export const loginVestiaMunicipalWasteManagementUser = () => {
  return loginUser(EXAMPLE_USER.username, EXAMPLE_USER.pass);
};

export const loginAdminUser = () => {
  return loginUser(ADMIN_USER.username, ADMIN_USER.pass);
};

export const getUserBusinessId = user =>
  JSON.parse(user.profile["Tietoalusta-Companies"])[0].businessId;

export const visit = url => {
  return cy.visit(url, {
    onBeforeLoad: cw => {
      cw.cypress_test_session_in_progress = true;
    }
  });
};
