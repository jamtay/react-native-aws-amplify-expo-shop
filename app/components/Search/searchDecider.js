/**
 * Are all search fields empty
 * @param {*} searchCriteria
 * @returns {bool}
 */
export const isSearchEmpty = searchCriteria =>
  !searchCriteria.name && !searchCriteria.address;

/**
 * Is the search string for 'key' in 'searchCriteria' greater than 2 characters
 * @param {*} searchCriteria
 * @param {*} key The key to search for in searchCriteria
 * @returns {bool}
 */
export const isGreaterThanSearchLength = (searchCriteria, key) => {
  if (!searchCriteria[key] || searchCriteria[key] === '') {
    return false;
  }
  return searchCriteria[key].length > 2 && searchCriteria.currentSearch === key;
};

/**
 * Based on the searchCriteria determine whether to search or not
 * Based on length of search fields
 * @param {*} searchCriteria
 * @returns {*} bool
 */
export const shouldSearch = searchCriteria => {
  return (
    isGreaterThanSearchLength(searchCriteria, 'name') ||
    isGreaterThanSearchLength(searchCriteria, 'address') ||
    (!searchCriteria.name && searchCriteria.currentSearch === 'name') ||
    (!searchCriteria.address && searchCriteria.currentSearch === 'address')
  );
};
