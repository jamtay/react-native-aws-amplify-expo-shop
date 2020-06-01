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
  return !!idExists;
};

/**
 * Get the image from the store name. If it is not found then return the default image
 * @param {String} storeName
 * @return required image
 */
export const getImageFromStoreName = storeName => {
  if (!storeName) {
    return require('../../assets/default.png');
  }
  const lowercaseName = storeName.toLowerCase();
  if (lowercaseName.includes('booths')) {
    return require('../../assets/booths.png');
  } else if (lowercaseName.includes('tesco')) {
    return require('../../assets/tesco.png');
  } else if (lowercaseName.includes('sainsbury')) {
    return require('../../assets/sainsburys.png');
  } else if (lowercaseName.includes('waitrose')) {
    return require('../../assets/waitrose.jpg');
  } else if (lowercaseName.includes('spencer')) {
    return require('../../assets/marksSpencer.png');
  } else if (
    lowercaseName.includes('b and q') ||
    lowercaseName.includes('b&q')
  ) {
    return require('../../assets/B-Q.png');
  } else if (lowercaseName.includes('asda')) {
    return require('../../assets/asda.png');
  } else if (lowercaseName.includes('morrisons')) {
    return require('../../assets/morrisons.png');
  }

  return require('../../assets/default.png');
};
