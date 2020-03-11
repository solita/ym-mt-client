const CREATED_RFOS = "createdRfos";
const CREATED_OFFERS = "createdOffers";
const CURRENT_USER = "currentUser";
const STORE_UPDATED = "storeUpdateTime";
const USER_SESSIONS = "userSessions";
let testStore = {};

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const persistStore = () => {
  testStore[STORE_UPDATED] = new Date();
  return cy.writeFile("testStore.json", testStore).then(f => {
    return testStore;
  });
};

const loadStore = () => {
  return cy.readFile("testStore.json").then(f => {
    const minUpdated = new Date(new Date().getTime() - 30 * 60 * 1000);
    const updated = new Date(f[STORE_UPDATED]);
    if (updated && updated > minUpdated) {
      testStore = f;
      return testStore;
    } else {
      // store timed out or not found
      testStore = {};
      testStore[STORE_UPDATED] = new Date(); // no more empty
      return persistStore().then(store => {
        return store;
      });
    }
  });
};
const ensureStore = () => {
  if (isEmpty(testStore)) {
    return loadStore();
  } else {
    return cy.wrap(testStore);
  }
};

const addToStoreArray = (key, val) => {
  if (testStore[key]) {
    testStore[key].push(val);
  } else {
    testStore[key] = [val];
  }
  return persistStore();
};

export const addCreatedRfoToStore = rfo => addToStoreArray(CREATED_RFOS, rfo);

export const getCreatedRfos = () => {
  return ensureStore().then(store => {
    if (Array.isArray(store[CREATED_RFOS])) {
      return store[CREATED_RFOS];
    } else {
      return [];
    }
  });
};

export const addCreatedOfferToStore = offer =>
  addToStoreArray(CREATED_OFFERS, offer);

export const getCreatedOffers = () => {
  return ensureStore().then(store => {
    if (Array.isArray(store[CREATED_OFFERS])) {
      store[CREATED_OFFERS];
    } else {
      return [];
    }
  });
};

export const getCurrentUser = () => {
  return ensureStore().then(store => {
    return store[CURRENT_USER] || false;
  });
};

export const getCurrentUserFromSession = () => {
  setCurrenUserFromCurrentSession();
  return testStore.currentUser;
};

const setCurrenUserFromCurrentSession = () => {
  Object.keys(sessionStorage).forEach(key => {
    if (key.indexOf("oidc.user:") > -1) {
      let user = JSON.parse(sessionStorage.getItem(key));
      if (user && Number.isInteger(user.expires_at)) {
        testStore.currentUser = user;
      }
    }
  });
};

export const saveSessionState = () => {
  testStore.localStorage = {};
  testStore.sessionStorage = {};
  Object.keys(localStorage).forEach(key => {
    testStore.localStorage[key] = localStorage[key];
  });
  Object.keys(sessionStorage).forEach(key => {
    testStore.sessionStorage[key] = sessionStorage[key];
  });
  setCurrenUserFromCurrentSession();
  if (!testStore[USER_SESSIONS]) {
    testStore[USER_SESSIONS] = {};
  }
  testStore[USER_SESSIONS][testStore.currentUser.profile.email] = {
    localStorage: testStore.localStorage,
    sessionStorage: testStore.sessionStorage,
    currentUser: testStore.currentUser
  };
  return persistStore();
};

export const getCachedUserSession = email => {
  return ensureStore().then(store => {
    if (store[USER_SESSIONS] && store[USER_SESSIONS][email]) {
      return store[USER_SESSIONS][email];
    }
    return false;
  });
};

export const restoreSessionState = session => {
  Object.keys(session.localStorage).forEach(function(key) {
    localStorage[key] = session.localStorage[key];
  });
  Object.keys(session.sessionStorage).forEach(function(key) {
    sessionStorage[key] = session.sessionStorage[key];
  });
  setCurrenUserFromCurrentSession();
};
