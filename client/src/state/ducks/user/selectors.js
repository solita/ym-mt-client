import { path } from 'ramda';

export const givenName = user => {
  return path(['user', 'profile', 'given_name'], user);
};

export const familyName = user => {
  return path(['user', 'profile', 'family_name'], user);
};

export const fullName = user => {
  const userProfile = path(['user', 'profile'])(user);
  return userProfile ? `${userProfile.given_name} ${userProfile.family_name}` : 'Anonymous';
};

export const phone = user => {
  return path(['user', 'profile', 'phone_number'], user);
};

export const email = user => {
  return path(['user', 'profile', 'email'], user);
};

export const roles = user => {
  const role = path(['user', 'profile', 'role'], user) || '';
  return role.toLowerCase().split(',') || [];
};

export const isLoggedIn = user => {
  return user && user.loggedIn;
};

export const getOwnBusinessId = user => {
  var company = getOwnCompany(user);
  return company ? company.businessId : null;
};

export const publicOfficerFacilities = user => {
  if (isLoggedIn(user)) {
    const facilityIdStr = path(['user', 'profile', 'Tietoalusta-PublicOfficerFacilities'], user);
    var facilityIds = facilityIdStr ? JSON.parse(facilityIdStr) : [];
    if (Array.isArray(facilityIds)) {
      return facilityIds;
    }
  }
  return [];
};

export const publicOfficerFacilityIds = user => {
  return publicOfficerFacilities(user).map(f => f.businessId);
};

export const isAdmin = user => {
  const userRoles = roles(user);
  return (
    user &&
    Array.isArray(userRoles) &&
    (userRoles.includes('admin') || userRoles.includes('systemadmin'))
  );
};

// MunicipalWasteManagement
export const isMunicipalWasteManagement = user => {
  const userRoles = roles(user);
  return user && Array.isArray(userRoles) && userRoles.includes('municipalwastemanagement');
};

// PublicOfficer
export const isPublicOfficer = user => {
  const userRoles = roles(user);
  return user && Array.isArray(userRoles) && userRoles.includes('publicofficer');
};

export const isStronglyAuthenticated = user =>
  path(['user', 'profile', 'idp'], user) === 'Saml2' ? true : false;

// @TODO: If the user belongs to many companies, return all of them. Now returns only the first company.
export const getOwnCompany = user => {
  if (!isLoggedIn(user)) {
    return null;
  } else {
    var companies = JSON.parse(path(['user', 'profile', 'Tietoalusta-Companies'], user));
    if (Array.isArray(companies) && companies.length > 0) {
      return companies[0];
    }
    return null;
  }
};
