/**
 * From an array of favourites (with ids), get the ids of all favourites
 * @param {Array} favourites
 * @returns {Array} An array of ids in string format
 */
export const getFavouriteIds = favourites => {
  if (!favourites) {
    return [];
  }
  return favourites.map(favourite => favourite.id);
};

/**
 * Determine if the dataId exists within the favouritesId array
 * @param {string} dataId
 * @param {Array} favouriteIds
 * @returns {Boolean} If dataId exists in favouriteIds
 */
export const isAlreadyFavourite = (dataId, favouriteIds) => {
  if (!favouriteIds) {
    return false;
  }
  const idExists = favouriteIds.find(favouriteId => favouriteId === dataId);
  return idExists ? true : false;
};
