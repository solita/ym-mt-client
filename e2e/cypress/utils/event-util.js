const { getUserBusinessId } = require("./login-util");
export const getLatestEvents = (token, count = 10, eventType = null) => {
  return cy.request({
    url:
      "/api/company/events?pageSize=" +
      count +
      (eventType ? "&eventTypes=" + eventType : ""),
    method: "GET",
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      authorization: "Bearer " + token,
      "cache-control": "no-cache",
      "content-type": "application/json;charset=UTF-8",
      pragma: "no-cache"
    }
  });
};

export const assertEventCreated = (
  user,
  eventType,
  eventFilter,
  responsible
) => {
  getLatestEvents(user.access_token, 10, eventType).then(response => {
    let foundEvent = response.body.filter(
      f => f.eventType === eventType && eventFilter(f.event)
    );

    expect(foundEvent.length).to.be.equal(1);
    foundEvent = foundEvent[0];
    expect(foundEvent.responsible.email).to.be.eq(responsible.profile.email);
    const expectedBusinessId = getUserBusinessId(responsible);
    expect(foundEvent.responsibleCompany.businessId).to.be.eq(
      expectedBusinessId
    );
  });
};
