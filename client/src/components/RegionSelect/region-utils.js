import { either, propEq, find, both, cond, equals, always, T } from 'ramda';

export const mapRegionData = (ids, regionsAndMunicipalities) => {
  return ids.map(id => {
    return find(either(propEq('id', id), propEq('regionId', id)))(regionsAndMunicipalities);
  });
};

export const mapRegion = (ids, regionsAndMunicipalities) => {
  return ids.map(id => {
    return find(both(propEq('configurationType', 'Region'), propEq('regionId', id)))(
      regionsAndMunicipalities
    );
  });
};

export const mapMunicipality = (ids, regionsAndMunicipalities) => {
  return ids.map(id => {
    return find(both(propEq('configurationType', 'Municipality'), propEq('id', id)))(
      regionsAndMunicipalities
    );
  });
};

export const getEurefCoordinates = coordinates => {
  if (coordinates) {
    const eurefCoordinates = find(propEq('type', 'EUREF_FIN'))(coordinates);
    return eurefCoordinates
      ? {
          lon: eurefCoordinates.lon,
          lat: eurefCoordinates.lat
        }
      : {};
  }
  return {};
};

export const localeMunicipalityPropName = cond([
  [equals('fi-FI'), always('nameFi')],
  [equals('sv-FI'), always('nameSv')],
  [T, always('nameFi')]
]);

export const localeRegionPropName = cond([
  [equals('fi-FI'), always('regionNameFi')],
  [equals('sv-FI'), always('regionNameSv')],
  [T, always('regionNameFi')]
]);
