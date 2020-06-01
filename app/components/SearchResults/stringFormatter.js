/**
 * Filter null values from a string and handle trailing commas
 * @param value
 * @returns {string} The value with nulls filtered out
 */
export const filterNull = value => {
  let returnVal = '';
  if (value && value !== 'null' && value !== ',' && value !== ', ') {
    returnVal = value;
    if (value.includes('null')) {
      returnVal = value
        .replace('null', '')
        .replace('null', '')
        .replace('null', '');
    }
    returnVal = returnVal.replace('  ', ' ').trim();
    if (returnVal === ',') {
      returnVal = '';
    }
  }
  return returnVal;
};

/**
 * Removes a trialing comma from a string. If comma is followed by a space it also removes that
 * @param value The value to remove any trailing commas from
 */
export const removeTrailingComma = value => {
  if (!value) {
    return '';
  }
  const trimmedValue = value.trim();
  if (trimmedValue.charAt(trimmedValue.length - 1) === ',') {
    //Remove the last character
    return trimmedValue.slice(0, -1).trimEnd();
  }
  return trimmedValue;
};
