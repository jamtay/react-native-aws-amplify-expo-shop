import {getFilterOptions} from '../filterOptions';

describe('getFilterOptions()', () => {
  it('should return empty for empty search criteria', () => {
    const filterOptions = getFilterOptions({});
    expect(filterOptions).toEqual({
      filter: {
        and: [],
      },
    });
  });

  it('should return empty for empty string search criteria', () => {
    const filterOptions = getFilterOptions({
      name: '',
      address: '',
    });
    expect(filterOptions).toEqual({
      filter: {
        and: [],
      },
    });
  });

  it('should not search for name less than 3 characters', () => {
    const filterOptions = getFilterOptions({
      name: 'te',
      address: 'ADDRESS',
    });
    expect(filterOptions).toEqual({
      filter: {
        and: [
          {
            fullAddress: {
              regexp: 'address.*',
            },
          },
        ],
      },
    });
  });
  it('should not search for an address less than 3 characters', () => {
    const filterOptions = getFilterOptions({
      name: 'NAME',
      address: 'a',
    });
    expect(filterOptions).toEqual({
      filter: {
        and: [
          {
            description: {
              regexp: 'name.*',
            },
          },
        ],
      },
    });
  });

  it('should return filter options for name and address more than 3 characters with lowercase search', () => {
    const filterOptions = getFilterOptions({
      name: 'MiN',
      address: 'aDd',
    });
    expect(filterOptions).toEqual({
      filter: {
        and: [
          {
            description: {
              regexp: 'min.*',
            },
          },
          {
            fullAddress: {
              regexp: 'add.*',
            },
          },
        ],
      },
    });
  });

  it('should split separate worded search into multiple search strings', () => {
    const filterOptions = getFilterOptions({
      name: 'Here is a search',
      address: 'And another',
    });
    expect(filterOptions).toEqual({
      filter: {
        and: [
          {
            description: {
              regexp: 'here.*',
            },
          },
          {
            description: {
              regexp: 'is.*',
            },
          },
          {
            description: {
              regexp: 'a.*',
            },
          },
          {
            description: {
              regexp: 'search.*',
            },
          },
          {
            fullAddress: {
              regexp: 'and.*',
            },
          },
          {
            fullAddress: {
              regexp: 'another.*',
            },
          },
        ],
      },
    });
  });
});
