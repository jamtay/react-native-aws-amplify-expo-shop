import {AsyncStorage} from 'react-native';
export const KEYS = Object.freeze({
  FAVOURITES: '@favourites',
});

/**
 * Get all favourites data from local storage
 * @returns The favourites as an Array of Favourite objects
 */
export const getFavouriteData = async () => {
  try {
    const value = await AsyncStorage.getItem(KEYS.FAVOURITES);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Add a new favourite to the current list of saved favourites. This is done by manually reading the current favourites and adding a new one to that list
 * @param {Object} newFavourite
 * @returns The updated favourites as an Array of Favourite objects
 */
export const addFavourite = async newFavourite => {
  try {
    const value = await AsyncStorage.getItem(KEYS.FAVOURITES);
    let updatedFavourites = [];
    if (value !== null) {
      const favourites = JSON.parse(value);
      updatedFavourites = [...favourites, newFavourite];
    } else {
      updatedFavourites = [newFavourite];
    }
    await AsyncStorage.setItem(
      KEYS.FAVOURITES,
      JSON.stringify(updatedFavourites),
    );
    return updatedFavourites;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * A test function to add a group of favourites to localstorage
 * @param {Array} allFavouritesToAdd An array of favourites to add to local storage
 */
export const addAllFavourites = async allFavouritesToAdd => {
  try {
    const value = await AsyncStorage.getItem(KEYS.FAVOURITES);
    let updatedFavourites = [];
    if (value !== null) {
      const favourites = JSON.parse(value);
      updatedFavourites = [...favourites, ...allFavouritesToAdd];
    } else {
      updatedFavourites = allFavouritesToAdd;
    }
    await AsyncStorage.setItem(
      KEYS.FAVOURITES,
      JSON.stringify(updatedFavourites),
    );
    return updatedFavourites;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * From an id, remove the favourite from the saved list. This is done by getting the list of favourites and filtering out the one with the supplied favourite id.
 * Then resetting the favourites list with the filtered list
 * @param {string} favouriteId
 * @returns The updated favourites as an Array of Favourite objects
 */
export const removeFavourite = async favouriteId => {
  try {
    const value = await AsyncStorage.getItem(KEYS.FAVOURITES);
    let updatedFavourites = [];
    if (value !== null) {
      const favourites = JSON.parse(value);
      updatedFavourites = favourites.filter(
        favourite => favourite.id !== favouriteId,
      );
    } else {
      updatedFavourites = [];
    }
    await AsyncStorage.setItem(
      KEYS.FAVOURITES,
      JSON.stringify(updatedFavourites),
    );
    return updatedFavourites;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Remove all favourites from local storage
 * @returns An empty array as all favourites have been removed
 */
export const removeAllFavourites = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.FAVOURITES);
    return [];
  } catch (e) {
    console.error(e);
    throw e;
  }
};
