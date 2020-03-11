import { localeMunicipalityPropName, localeRegionPropName } from './region-utils';

describe('Utils: region', () => {
  it('should return correct prop name for municipalities depending on locale', () => {
    const resultFi = localeMunicipalityPropName('fi-FI');
    const resultSv = localeMunicipalityPropName('sv-FI');
    const resultInvalidLocale = localeMunicipalityPropName(undefined);

    const expectedFi = 'nameFi';
    const expectedSv = 'nameSv';
    const expectedInvalidLocale = 'nameFi';

    expect(resultFi).toEqual(expectedFi);
    expect(resultSv).toEqual(expectedSv);
    expect(resultInvalidLocale).toEqual(expectedInvalidLocale);
  });

  it('should return correct prop name for regions depending on locale', () => {
    const resultFi = localeRegionPropName('fi-FI');
    const resultSv = localeRegionPropName('sv-FI');
    const resultInvalidLocale = localeRegionPropName(undefined);

    const expectedFi = 'regionNameFi';
    const expectedSv = 'regionNameSv';
    const expectedInvalidLocale = 'regionNameFi';

    expect(resultFi).toEqual(expectedFi);
    expect(resultSv).toEqual(expectedSv);
    expect(resultInvalidLocale).toEqual(expectedInvalidLocale);
  });
});
