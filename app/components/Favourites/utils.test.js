import {getFavouriteIds, isAlreadyFavourite} from './utils';

describe('getFavouriteIds() util', () => {
  it('should get the favourite ids from an array of favourites', () => {
    const favourites = [
      {
        id: '1',
        prop: 'a',
        anotherProp: 'b',
      },
      {
        id: '2',
        prop: 'c',
        anotherProp: 'd',
      },
      {
        id: '3',
        prop: 'e',
        anotherProp: 'f',
      },
    ];
    const expectedFavouriteIds = ['1', '2', '3'];
    const actualFavouriteIds = getFavouriteIds(favourites);

    expect(actualFavouriteIds).toEqual(expectedFavouriteIds);
  });

  it('should get the favourite ids as an empty array if favourites is empty', () => {
    const favourites = [];
    const expectedFavouriteIds = [];
    const actualFavouriteIds = getFavouriteIds(favourites);

    expect(actualFavouriteIds).toEqual(expectedFavouriteIds);
  });

  it('should get the favourite ids as an empty array if favourites is undefined', () => {
    const favourites = undefined;
    const expectedFavouriteIds = [];
    const actualFavouriteIds = getFavouriteIds(favourites);

    expect(actualFavouriteIds).toEqual(expectedFavouriteIds);
  });
});

describe('isAlreadyFavourite() util', () => {
  it('should return true if the dataId exists within favourite ids', () => {
    const favourites = ['1', '2', '3'];
    const actual = isAlreadyFavourite('2', favourites);

    expect(actual).toEqual(true);
  });

  it('should return false if the dataId does not exists within favourite ids', () => {
    const favourites = ['1', '2', '3'];
    const actual = isAlreadyFavourite('5', favourites);

    expect(actual).toEqual(false);
  });

  it('should return false if the dataId does not exists within favourite ids as favouriteIds is empty', () => {
    const favourites = [];
    const actual = isAlreadyFavourite('1', favourites);

    expect(actual).toEqual(false);
  });

  it('should return false if the dataId does not exists within favourite ids as favouriteIds is undefined', () => {
    const favourites = undefined;
    const actual = isAlreadyFavourite('1', favourites);

    expect(actual).toEqual(false);
  });
});
