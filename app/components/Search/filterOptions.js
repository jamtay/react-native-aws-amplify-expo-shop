/**
 * From an object of searchCriteria, create a searchable filter to send to GrapohQl search endpoint (using and/regexp searches)
 * Splits search strings and surrounds in .* to make contains searching to work
 * @param {*} searchCriteria An object made up of name,address and currentSearch
 * @returns {*} The graphql search filter
 */
export const getFilterOptions = searchCriteria => {
  let nameFilter = [];
  if (searchCriteria.name && searchCriteria.name.length > 2) {
    nameFilter = [];
    const words = searchCriteria.name.split(' ');
    nameFilter = words.map(word => {
      return {
        description: {
          regexp: `${word.toLowerCase()}.*`,
        },
      };
    });
  }

  let addressFilter = [];
  if (searchCriteria.address && searchCriteria.address.length > 2) {
    addressFilter = [];
    const words = searchCriteria.address.split(' ');
    addressFilter = words.map(word => {
      return {
        fullAddress: {
          regexp: `${word.toLowerCase()}.*`,
        },
      };
    });
  }

  const value = {
    filter: {
      and: [...nameFilter, ...addressFilter],
    },
  };
  return value;
};
