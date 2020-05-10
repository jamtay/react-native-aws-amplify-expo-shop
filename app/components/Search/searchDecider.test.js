import {
  isSearchEmpty,
  isGreaterThanSearchLength,
  shouldSearch,
} from './searchDecider';

describe('isSearchEmpty()', () => {
  it('should return true if search criteria is an empty object', () => {
    const actual = isSearchEmpty({});
    expect(actual).toEqual(true);
  });

  it('should return true if both name and address are empty strings', () => {
    const actual = isSearchEmpty({
      name: '',
      address: '',
    });
    expect(actual).toEqual(true);
  });

  it('should return false if name is an empty string but address is present', () => {
    const actual = isSearchEmpty({
      name: '',
      address: 'ADDRESS',
    });
    expect(actual).toEqual(false);
  });

  it('should return false if address is an empty string but name is present', () => {
    const actual = isSearchEmpty({
      name: 'NAME',
      address: '',
    });
    expect(actual).toEqual(false);
  });

  it('should return false if both name and address are present', () => {
    const actual = isSearchEmpty({
      name: 'NAME',
      address: 'ADDRESS',
    });
    expect(actual).toEqual(false);
  });
});

describe('isGreaterThanSearchLength()', () => {
  it('should return true if search criteria property is greater than 2 and currentSearch criteria is equal to searched property', () => {
    const actual = isGreaterThanSearchLength(
      {
        name: 'NAME',
        address: 'a',
        other: 'other',
        another: 'a',
        currentSearch: 'name',
      },
      'name',
    );

    expect(actual).toEqual(true);
  });

  it('should return false if search criteria property is greater than 2 but the currentSearch criteria is not equal to searched property', () => {
    const actual = isGreaterThanSearchLength(
      {
        name: 'NAME',
        address: 'a',
        other: 'other',
        another: 'a',
        currentSearch: 'address',
      },
      'name',
    );

    expect(actual).toEqual(false);
  });

  it('should return false if search criteria property is greater than 2 but the currentSearch criteria is not present', () => {
    const actual = isGreaterThanSearchLength(
      {
        name: 'NAME',
        address: 'a',
        other: 'other',
        another: 'a',
      },
      'name',
    );

    expect(actual).toEqual(false);
  });

  it('should return false if search criteria property is less than 2', () => {
    const actual = isGreaterThanSearchLength(
      {
        name: 'a',
        address: 'ADDRESS',
        other: 'other',
        another: 'another',
        currentSearch: 'name',
      },
      'name',
    );

    expect(actual).toEqual(false);
  });

  it('should return false if search criteria property is an empty string', () => {
    const actual = isGreaterThanSearchLength(
      {
        name: '',
        address: 'ADDRESS',
        other: 'other',
        another: 'another',
        currentSearch: 'name',
      },
      'name',
    );

    expect(actual).toEqual(false);
  });

  it('should return false if search criteria is an empty object', () => {
    const actual = isGreaterThanSearchLength({}, 'name');

    expect(actual).toEqual(false);
  });

  it('should return false if key is not present in search criteria', () => {
    const actual = isGreaterThanSearchLength(
      {
        address: 'ADDRESS',
        other: 'other',
        another: 'another',
        currentSearch: 'name',
      },
      'name',
    );

    expect(actual).toEqual(false);
  });
});

describe('shouldSearch()', () => {
  it('should return true if searchCriteria name is greater than 3 characters and currentSearch is name', () => {
    const actual = shouldSearch({
      name: 'a'.repeat(3),
      address: 'a',
      currentSearch: 'name',
    });

    expect(actual).toEqual(true);
  });

  it('should return true if searchCriteria address is greater than 3 characters and currentSearch is address', () => {
    const actual = shouldSearch({
      name: 'a',
      address: 'a'.repeat(3),
      currentSearch: 'address',
    });

    expect(actual).toEqual(true);
  });

  it('should return true if searchCriteria address is empty and currentSearch is address', () => {
    const actual = shouldSearch({
      name: 'a',
      address: '',
      currentSearch: 'address',
    });

    expect(actual).toEqual(true);
  });

  it('should return true if searchCriteria address is empty and currentSearch is address', () => {
    const actual = shouldSearch({
      name: '',
      address: 'a',
      currentSearch: 'name',
    });

    expect(actual).toEqual(true);
  });

  it('should return false if searchCriteria address is greater than 3 characters but currentSearch is name', () => {
    const actual = shouldSearch({
      name: 'a',
      address: 'a'.repeat(3),
      currentSearch: 'name',
    });

    expect(actual).toEqual(false);
  });

  it('should return false if searchCriteria address is greater than 3 characters but currentSearch is not address', () => {
    const actual = shouldSearch({
      name: 'a',
      address: 'a'.repeat(3),
      currentSearch: 'other',
    });

    expect(actual).toEqual(false);
  });

  it('should return false if both searchCriteria address and name are greater than 3 characters but currentSearch is not address', () => {
    const actual = shouldSearch({
      name: 'a'.repeat(3),
      address: 'a'.repeat(3),
      currentSearch: 'other',
    });

    expect(actual).toEqual(false);
  });

  it('should return false if searchCriteria address is not greater than 3 characters but currentSearch is address', () => {
    const actual = shouldSearch({
      name: 'a'.repeat(3),
      address: 'a'.repeat(2),
      currentSearch: 'address',
    });

    expect(actual).toEqual(false);
  });

  it('should return false if searchCriteria name is not greater than 3 characters but currentSearch is name', () => {
    const actual = shouldSearch({
      name: 'a'.repeat(2),
      address: 'a'.repeat(3),
      currentSearch: 'name',
    });

    expect(actual).toEqual(false);
  });
});
