//TODO: Fix this test file
//When migrating to expo this broke. Because you cannot use @react-native-community/async-storage with expo and therefore cannot use the mock - https://github.com/react-native-community/async-storage/issues/72
//So need to update __jestSetup__/setupAsyncStorage.js to work with a different mock e.g maybe v1 of https://www.npmjs.com/package/mock-async-storage

describe('adding a single test to keep the below file', () => {
  it('TODO: Fix localStorage mocking for tests', () => {
    expect(true).toEqual(true);
  });
});
// import AsyncStorageMock from '@react-native-community/async-storage/jest/async-storage-mock';
// import AsyncStorage from '@react-native-community/async-storage';
// import {getFavouriteData, addFavourite, removeFavourite} from '../localStorage';
//
// const fakeData = [
//   {
//     id: 'ID_1',
//     name: 'Booths',
//     description: 'Booths Burscough',
//     fullAddress:
//       'Unit 1 Ringtail Retail Park Burscough Ormskirk L40 8AD Lancashire United Kingdom Great Britain',
//     addressLine1: 'Unit 1 Ringtail Retail Park',
//     addressLine2: 'Burscough Ormskirk',
//     postcode: 'L40 8AD',
//     county: 'Lancashire',
//     country: 'GB',
//   },
//   {
//     id: 'ID_2',
//     name: 'Booths',
//     description: 'Booths Carnforth',
//     fullAddress:
//       'Scotland Road Carnforth LA5 9JZ Lancashire United Kingdom Great Britain',
//     addressLine1: 'Scotland Road',
//     addressLine2: 'Carnforth',
//     postcode: 'LA5 9JZ',
//     county: 'Lancashire',
//     country: 'GB',
//   },
// ];
//
// const FAVOURITES_KEY = '@favourites';
// describe('getFavouriteData() from local storage', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       return null;
//     });
//   });
//
//   it('should get the favourites using the correct key', async () => {
//     await getFavouriteData();
//     expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//   });
//
//   it('should get the favourites and parse to an object', async () => {
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Return an array with 2 favourites in
//       return JSON.stringify(fakeData);
//     });
//     const data = await getFavouriteData();
//     //Check that the array with two favourites in is returned
//     expect(data).toEqual(fakeData);
//   });
//
//   it('should return an empty array if favourite data is empty', async () => {
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Null is the value return for when storage is empty
//       return null;
//     });
//     const data = await getFavouriteData();
//     expect(data).toEqual([]);
//   });
//
//   it('should throw an error if an error occurs retrieving data', async () => {
//     const error = new Error(
//       'FAKE error thrown during testing of getFavouriteData when calling get item',
//     );
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Throw a fake error when attempting to get items
//       throw error;
//     });
//     try {
//       await getFavouriteData();
//       //Should fail if it reaches this expect statement because an error should be thrown
//       expect(
//         'Should not reach this step',
//         'Error expected but no error occured when calling getFavouriteData and AsyncStorageMock.getItem throws an error',
//       ).toEqual('Because an error is expected');
//     } catch (e) {
//       expect(e).toEqual(error);
//     }
//   });
// });
//
// describe('addFavourite() from local storage', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       return null;
//     });
//
//     AsyncStorageMock.setItem = jest.fn(([keys], callback) => {
//       return null;
//     });
//   });
//
//   it('should get the favourites using the correct key and the update them if favourites was empty', async () => {
//     //Attempt to add a favourite to an empty favourites storage item
//     const data = await addFavourite(fakeData[0]);
//     expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//
//     //Check array is not set to the one element that has been added
//     expect(AsyncStorage.setItem).toBeCalledWith(
//       FAVOURITES_KEY,
//       JSON.stringify([fakeData[0]]),
//     );
//     expect(data).toEqual([fakeData[0]]);
//   });
//
//   it('should add to favourites array if favourites already present', async () => {
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Return an array with 1 favourite in
//       return JSON.stringify([fakeData[0]]);
//     });
//     //Attempt to add a second element to favourites
//     const data = await addFavourite(fakeData[1]);
//     expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//
//     //Check that the full array of two elements is added to local storage
//     expect(AsyncStorage.setItem).toBeCalledWith(
//       FAVOURITES_KEY,
//       JSON.stringify(fakeData),
//     );
//     expect(data).toEqual(fakeData);
//   });
//
//   it('should throw an error if an error occurs retrieving data', async () => {
//     const error = new Error(
//       'FAKE error thrown during testing of addFavourite when calling getTtem',
//     );
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Throw a fake error when getting an item
//       throw error;
//     });
//     try {
//       await addFavourite(fakeData[0]);
//       //Should fail if it reaches this expect statement because an error should be thrown
//       expect(
//         'Should not reach this step',
//         'Error expected but no error occured when calling addFavourite and AsyncStorageMock.getItem throws an error',
//       ).toEqual('Because an error is expected');
//     } catch (e) {
//       // Check that the getItem method is called but setItem is not called. And check error is correctly thrown
//       expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//       expect(AsyncStorage.setItem).toBeCalledTimes(0);
//       expect(e).toEqual(error);
//     }
//   });
//
//   it('should throw an error if an error occurs setting data', async () => {
//     const error = new Error(
//       'FAKE error thrown during testing of addFavourite when calling setItem',
//     );
//     AsyncStorageMock.setItem = jest.fn(([keys], callback) => {
//       //Throw a fake error when setting an item
//       throw error;
//     });
//     try {
//       await addFavourite(fakeData[0]);
//       //Should fail if it reaches this expect statement because an error should be thrown
//       expect(
//         'Should not reach this step',
//         'Error expected but no error occured when calling addFavourite and AsyncStorageMock.getItem throws an error',
//       ).toEqual('Because an error is expected');
//     } catch (e) {
//       // Check that the getItem and setItem methods are called. And check error is correctly thrown
//       expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//       expect(AsyncStorage.setItem).toBeCalledWith(
//         FAVOURITES_KEY,
//         JSON.stringify([fakeData[0]]),
//       );
//       expect(e).toEqual(error);
//     }
//   });
// });
//
// describe('removeFavourite() from local storage', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       return null;
//     });
//
//     AsyncStorageMock.setItem = jest.fn(([keys], callback) => {
//       return null;
//     });
//   });
//
//   it('should get the favourites using the correct key and remove the favourite using the id supplied', async () => {
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Return an array with 2 favourites in
//       return JSON.stringify(fakeData);
//     });
//
//     //Remove the second favourite
//     const data = await removeFavourite(fakeData[1].id);
//     expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//
//     //Check that only the first element exists in the array
//     expect(AsyncStorage.setItem).toBeCalledWith(
//       FAVOURITES_KEY,
//       JSON.stringify([fakeData[0]]),
//     );
//     expect(data).toEqual([fakeData[0]]);
//   });
//
//   it('should get the favourites using the correct key and return the array stored in favourites if the id does not exist in local storage', async () => {
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Return an array with 2 favourites in
//       return JSON.stringify(fakeData);
//     });
//
//     //Attempt to remove an element that does not exist
//     const data = await removeFavourite('SOME_RANDOM_KEY');
//     expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//
//     //Check that the original array is set again
//     expect(AsyncStorage.setItem).toBeCalledWith(
//       FAVOURITES_KEY,
//       JSON.stringify(fakeData),
//     );
//     expect(data).toEqual(fakeData);
//   });
//
//   it('should get the favourites using the correct key and the update them if favourites was empty to an empty array', async () => {
//     //Attempt ot remove an element from the array when the array is empty
//     const data = await removeFavourite(fakeData[0].id);
//     expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//
//     //Check that the array is set back to empty
//     expect(AsyncStorage.setItem).toBeCalledWith(
//       FAVOURITES_KEY,
//       JSON.stringify([]),
//     );
//     expect(data).toEqual([]);
//   });
//
//   it('should throw an error if an error occurs retrieving data', async () => {
//     const error = new Error(
//       'FAKE error thrown during testing of removeFavourite when calling getTtem',
//     );
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Throw a fake error when getting an item
//       throw error;
//     });
//     try {
//       await removeFavourite(fakeData[0].id);
//       //Should fail if it reaches this expect statement because an error should be thrown
//       expect(
//         'Should not reach this step',
//         'Error expected but no error occured when calling removeFavourite and AsyncStorageMock.getItem throws an error',
//       ).toEqual('Because an error is expected');
//     } catch (e) {
//       // Check that the getItem method is called but setItem is not called. And check error is correctly thrown
//       expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//       expect(AsyncStorage.setItem).toBeCalledTimes(0);
//       expect(e).toEqual(error);
//     }
//   });
//
//   it('should throw an error if an error occurs setting data', async () => {
//     AsyncStorageMock.getItem = jest.fn(([keys], callback) => {
//       //Return an array with 2 favourites in
//       return JSON.stringify(fakeData);
//     });
//
//     const error = new Error(
//       'FAKE error thrown during testing of removeFavourite when calling setItem',
//     );
//     AsyncStorageMock.setItem = jest.fn(([keys], callback) => {
//       //Throw a fake error when setting an item
//       throw error;
//     });
//
//     try {
//       await removeFavourite(fakeData[1].id);
//       //Should fail if it reaches this expect statement because an error should be thrown
//       expect(
//         'Should not reach this step',
//         'Error expected but no error occured when calling removeFavourite and AsyncStorageMock.getItem throws an error',
//       ).toEqual('Because an error is expected');
//     } catch (e) {
//       // Check that the getItem and setItem methods are called. And check error is correctly thrown
//       expect(AsyncStorage.getItem).toBeCalledWith(FAVOURITES_KEY);
//       expect(AsyncStorage.setItem).toBeCalledWith(
//         FAVOURITES_KEY,
//         JSON.stringify([fakeData[0]]),
//       );
//       expect(e).toEqual(error);
//     }
//   });
// });
