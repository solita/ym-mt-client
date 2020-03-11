import { sortFacilities } from './CreateContainer';

describe('Create TSV', () => {
  it('should sort alphabetically by facility', () => {
    const order = 'facility_name';
    const facilities = [
      { name: 'B-luokan firma', address: { city: 'Ypäjä' }, distance: 50 },
      { name: 'A-luokan firma', address: { city: 'Helsinki' }, distance: 150 }
    ];

    const result = sortFacilities(facilities, order);

    const expected = [
      { name: 'A-luokan firma', address: { city: 'Helsinki' }, distance: 150 },
      { name: 'B-luokan firma', address: { city: 'Ypäjä' }, distance: 50 }
    ];

    expect(result).toEqual(expected);
  });

  it('should sort alphabetically by municipality', () => {
    const order = 'municipality_name';
    const facilities = [
      { name: 'B-luokan firma', address: { city: 'Ypäjä' }, distance: 50 },
      { name: 'A-luokan firma', address: { city: 'Helsinki' }, distance: 150 }
    ];

    const result = sortFacilities(facilities, order);

    const expected = [
      { name: 'A-luokan firma', address: { city: 'Helsinki' }, distance: 150 },
      { name: 'B-luokan firma', address: { city: 'Ypäjä' }, distance: 50 }
    ];

    expect(result).toEqual(expected);
  });

  it('should sort alphabetically by municipality', () => {
    const order = 'distance';
    const facilities = [
      { name: 'A-luokan firma', address: { city: 'Helsinki' }, distance: 150 },
      { name: 'B-luokan firma', address: { city: 'Ypäjä' }, distance: 50 }
    ];

    const result = sortFacilities(facilities, order);

    const expected = [
      { name: 'B-luokan firma', address: { city: 'Ypäjä' }, distance: 50 },
      { name: 'A-luokan firma', address: { city: 'Helsinki' }, distance: 150 }
    ];

    expect(result).toEqual(expected);
  });
});
