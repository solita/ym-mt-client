import { isAllowed } from './PrivateComponent';
import { clone } from 'ramda';

describe('test PrivateComponent', function() {
  const initialProps = {
    user: {
      loggedIn: true,
      user: {
        profile: {
          'Tietoalusta-PublicOfficerFacilities': JSON.stringify([
            { businessId: 'ThisFacilityId', name: 'TehFacility' },
            { businessId: 'ThatFacilityId', name: 'Facilityh' }
          ]),
          'Tietoalusta-Companies': JSON.stringify([
            {
              name: 'CompanyName',
              businessId: 'CompanyBusinessId'
            }
          ]),
          role: 'User'
        }
      }
    }
  };

  it('should not allow User role on isAdmin prop', function() {
    const props = Object.assign({ isAdmin: {} }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should allow Admin role and SystemAdmin on isAdmin prop', function() {
    let props = Object.assign({ isAdmin: {} }, clone(initialProps));
    props.user.user.profile.role = 'Admin';
    expect(isAllowed(props.user, props)).toBe(true);
    props.user.user.profile.role = 'SystemAdmin';
    expect(isAllowed(props.user, props)).toBe(true);
  });

  it('should not allow user not beloning to prop belongsToBusiness', function() {
    const props = Object.assign(
      { belongsToBusiness: "These Aren't The Droids You're Looking For" },
      initialProps
    );
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should allow user beloning to prop belongsToBusiness', function() {
    const props = Object.assign({ belongsToBusiness: 'CompanyBusinessId' }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should allow admin user beloning to prop belongsToBusiness', function() {
    let props = Object.assign(
      { belongsToBusiness: 'CompanyBusinessId', isAdmin: {} },
      clone(initialProps)
    );
    props.user.user.profile.role = 'Admin';
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should allow user not beloning to prop doesNotBelongToBusiness', function() {
    const props = Object.assign(
      { doesNotBelongToBusiness: "These Aren't The Droids You're Looking For" },
      initialProps
    );
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should not allow user beloning to prop doesNotBelongToBusiness', function() {
    const props = Object.assign({ doesNotBelongToBusiness: 'CompanyBusinessId' }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should allow user beloning to prop isAdminOrBelongsToBusiness', function() {
    const props = Object.assign({ isAdminOrBelongsToBusiness: 'CompanyBusinessId' }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should allow Admin not beloning to prop isAdminOrBelongsToBusiness', function() {
    let props = Object.assign({ isAdminOrBelongsToBusiness: 'foo' }, clone(initialProps));
    props.user.user.profile.role = 'Admin';
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should not allow user not beloning to prop isAdminOrBelongsToBusiness', function() {
    const props = Object.assign({ isAdminOrBelongsToBusiness: 'bar' }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should not allow user without businessId', function() {
    let props = Object.assign({ belongsToBusiness: 'CompanyBusinessId' }, clone(initialProps));
    props.user.user.profile['Tietoalusta-Companies'] = JSON.stringify([]);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should not allow users that are not logged in', function() {
    let props = {
      user: {
        loggedIn: false
      }
    };
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should not allow if has no MunicipalWasteManagement', () => {
    const props = Object.assign({ isMunicipalWasteManagement: undefined }, initialProps);
    props.user.user.profile.role = 'User';
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should allow if has MunicipalWasteManagement role', () => {
    const props = Object.assign({ isMunicipalWasteManagement: undefined }, initialProps);
    props.user.user.profile.role = 'MunicipalWasteManagement';
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should not allow user with local idp for strong auth', () => {
    const props = Object.assign({ requireStrongAuth: undefined }, initialProps);
    props.user.user.profile.idp = 'local';
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should not allow user with Saml2 idp for strong auth', () => {
    const props = Object.assign({ requireStrongAuth: undefined }, initialProps);
    props.user.user.profile.idp = 'Saml2';
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should not allow user with Saml2 idp for strong auth', () => {
    const props = Object.assign({ requireStrongAuth: undefined }, initialProps);
    props.user.user.profile.idp = 'Saml2';
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should not allow user not beloning to prop belongsToBusiness array', () => {
    const props = Object.assign({ belongsToBusiness: ['foo', 'bar'] }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should allow user not beloning to prop belongsToBusiness array', () => {
    const props = Object.assign(
      { belongsToBusiness: ['foo', 'bar', 'CompanyBusinessId', 'foobar'] },
      initialProps
    );
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should allow user with facilityId', () => {
    const props = Object.assign({ isPublicOfficerFacility: 'ThatFacilityId' }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should not allow user without correct facilityId', () => {
    const props = Object.assign({ isPublicOfficerFacility: 'IAreHasesFacility' }, initialProps);
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });

  it('should allow user with one in isAny failing', () => {
    const props = Object.assign(
      {
        isAny: [
          { isPublicOfficerFacility: 'IAreHasesFacility' },
          { isPublicOfficerFacility: 'ThatFacilityId' }
        ]
      },
      initialProps
    );
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(true);
  });

  it('should not allow user with all in isAny check failing', () => {
    const props = Object.assign(
      {
        isAny: [
          { isPublicOfficerFacility: 'IAreHasesFacility' },
          { belongsToBusiness: ['ThisIHasesAlso'] }
        ]
      },
      initialProps
    );
    const actual = isAllowed(props.user, props);
    expect(actual).toBe(false);
  });
});
