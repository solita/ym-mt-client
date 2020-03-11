export const getElementIntoView = selector => {
  const elem = cy.get(selector);
  const elemScrolled = elem
    .first()
    .scrollIntoView()
    .focus();
  elemScrolled.scrollIntoView().should("be.visible");
  return elem;
};

export const setSelectValueWithAssert = (selector, value) => {
  getElementIntoView(selector)
    .select(value, { force: true })
    .should("have.value", value);
};
export const setTextValueWithAssert = (selector, value) => {
  getElementIntoView(selector)
    .click({ force: true })
    .clear()
    .type(value)
    .should("have.value", value);
};

export const setRadioValueWithAssert = (selector, value) => {
  getElementIntoView(selector)
    .check(value)
    .should("have.value", value);
};

export const setCustomSelectorValueWithAssert = (selectorWrap, value, id) => {
  cy.get(selectorWrap + " .qa-custom-select-input")
    .click()
    .type(value);
  const val = id || value;
  cy.get(selectorWrap + ' [data-value="' + val + '"]').click();
  cy.get(
    selectorWrap + ' .qa-custom-select-value[data-value="' + val + '"]'
  ).should("be.visible");
};

const setContactName = value => {
  cy.get('input[name="contact_name"]').clear();
  setTextValueWithAssert('input[name="contact_name"]', value);
};

const setContactTitle = value => {
  cy.get('input[name="contact_title"]').clear();
  setTextValueWithAssert('input[name="contact_title"]', value);
};

const setContactPhone = value => {
  cy.get('input[name="contact_phone"]').clear();
  setTextValueWithAssert('input[name="contact_phone"]', value);
};

const setContactEmail = value => {
  cy.get('input[name="contact_email"]').clear();
  setTextValueWithAssert('input[name="contact_email"]', value);
};

export const setContact = contact => {
  setContactName(contact.name);
  setContactTitle(contact.title);
  setContactPhone(contact.phone);
  setContactEmail(contact.email);
};

const setLocationName = value => {
  setTextValueWithAssert('input[name="locationName"]', value);
};

const setLocationStreetAddress = value => {
  setTextValueWithAssert('input[name="locationStreetAddress"]', value);
};

const setLocationPostalCode = value => {
  setTextValueWithAssert('input[name="locationPostalCode"]', value);
};

const setLocationCity = (name, id) => {
  setCustomSelectorValueWithAssert(".qa-location-selector", name, id);
};

export const setLocation = location => {
  setLocationName(location.name);
  setLocationStreetAddress(location.address);
  setLocationPostalCode(location.postalCode);
  setLocationCity(location.city, location.cityId);
};

export const dateStringToDate = ds => {
  return new Date(ds);
};

export const dateToInputString = date => {
  return (
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  );
};

export const getDateString = d => {
  return JSON.parse(JSON.stringify(d));
};

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() + days);
  return result;
};
