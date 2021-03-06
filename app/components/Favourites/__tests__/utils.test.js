import {
  getFavouriteIds,
  getImageFromStoreName,
  isAlreadyFavourite,
} from '../utils';

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

// For checking require() returns, test a '1' is returned and an error is not thrown
// Using 'react-native' jest preset instead of 'jest-expo' will result in {testUri: '../../../app/assets/tesco.png'}
// Being returned. But 'jest-expo' preset returns 1 and an error if the file is missing
describe.skip('getImageFromStoreName() unit tests', () => {
  const boothsTestCases = [
    'booths',
    'Booths',
    'bOOtHs',
    'Booths ',
    ' Booths random place',
    'BOOTHS TEST STRING',
    'TEST BOOTHS_STRING',
    'tes_BoOths-string',
    'aBoothsA',
  ];
  boothsTestCases.forEach(testCase => {
    it(`should get booths when variants of booths are supplied - ${testCase}`, () => {
      const imageName = getImageFromStoreName(testCase);
      expect(imageName).toEqual({testUri: '../../../app/assets/booths.png'});
    });
  });

  const tescoTestCases = [
    'tesco',
    'Tesco',
    'tEsCo',
    'Tesco  ',
    ' Tesco random place',
    'TESCO TEST STRING',
    'TEST TESCO_STRING',
    'tes_TesCO-string',
    'aTescoa',
  ];
  tescoTestCases.forEach(testCase => {
    it(`should get tesco when variants of tesco are supplied - ${testCase}`, () => {
      const imageName = getImageFromStoreName(testCase);
      expect(imageName).toEqual({testUri: '../../../app/assets/tesco.png'});
    });
  });

  const closeProximityStringTests = [
    'tesca',
    'bootha',
    'ooths',
    'Tescho',
    'Baooths',
    'SBooth',
  ];

  closeProximityStringTests.forEach(testCase => {
    it(`should return the default when a string is close (but is not) to tesco/booths - ${testCase}`, () => {
      const imageName = getImageFromStoreName(testCase);
      expect(imageName).toEqual({testUri: '../../../app/assets/default.png'});
    });
  });

  const emptyTestCases = [
    {value: '', message: 'empty string'},
    {value: '   ', message: 'empty string with spaces'},
    {value: undefined, message: 'undefined'},
    {value: null, message: 'null'},
  ];

  emptyTestCases.forEach(testCase => {
    it(`should return the default when ${testCase.message} is supplied`, () => {
      const imageName = getImageFromStoreName(testCase.value);
      expect(imageName).toEqual({testUri: '../../../app/assets/default.png'});
    });
  });

  const testCases = [
    {
      value: 'Booths',
      image: 'booths.png',
    },
    {
      value: 'tesco',
      image: 'tesco.png',
    },
    {
      value: 'Sainsbury',
      image: 'sainsburys.png',
    },
    {
      value: 'waitrose',
      image: 'waitrose.jpg',
    },
    {
      value: 'Spencer',
      image: 'marksSpencer.png',
    },
    {
      value: 'B and Q',
      image: 'B-Q.png',
    },
    {
      value: 'b&q',
      image: 'B-Q.png',
    },
    {
      value: 'asda',
      image: 'asda.png',
    },
    {
      value: 'Morrisons',
      image: 'morrisons.png',
    },
    {
      value: 'spar',
      image: 'spar.png',
    },
    {
      value: 'Nisa',
      image: 'nisa.png',
    },
    {
      value: 'aldi',
      image: 'aldi.jpg',
    },
    {
      value: 'Lidl',
      image: 'lidl.jpg',
    },
  ];

  testCases.forEach(testCase => {
    it(`should map correctly for ${testCase.value} to ${
      testCase.image
    }`, () => {
      const imageName = getImageFromStoreName(testCase.value);
      expect(imageName).toEqual({
        testUri: `../../../app/assets/${testCase.image}`,
      });
    });
  });
});
