import * as offerUtils from './offer-utils';

describe('Utils: offer', () => {
  it('should transform offer state to offer payload', () => {
    const rfoId = 1;
    const offerState = {
      description: 'jätepalvelu',
      serviceType: 'serviceType1',
      descriptionOfService: 'viikottainen jätehaku',
      permissionAssurance: true,
      timeOfService: 'sopimus vuodeksi kerrallaan',
      locationOfService: 'Espoo',
      priceOfService: '100 €/kk',
      otherTermsOfService: 'irtisanomisaika 2kk',
      expirationOfService: '2020-01-01'
    };

    const result = offerUtils.offerStateToOfferPayload(rfoId, offerState, true);

    const expected = {
      rfoId: 1,
      description: 'jätepalvelu',
      serviceType: 'serviceType1',
      descriptionOfService: 'viikottainen jätehaku',
      permissionAssurance: true,
      timeOfService: 'sopimus vuodeksi kerrallaan',
      locationOfService: 'Espoo',
      priceOfService: '100 €/kk',
      otherTermsOfService: 'irtisanomisaika 2kk',
      expirationOfService: '2020-01-01'
    };

    expect(result).toEqual(expected);
  });
});
