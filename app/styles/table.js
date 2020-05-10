/**
 *
 * @param {boolean} horizontal If the table is horizontal
 * @param {number} dataLength The amount of data that wlll be displayed
 */
export const getTableCardStyle = (horizontal, dataLength) => {
  if (!horizontal) {
    return verticalTableCardStyle;
  }
  if (dataLength <= 1 && horizontal) {
    return genericTableCardStyle;
  }
  return horizontalTableCardStyle;
};

export const genericTableCardStyle = {
  borderWidth: 4,
  borderRadius: 6,
};

export const horizontalTableCardStyle = {
  ...genericTableCardStyle,
  marginLeft: 10,
  marginRight: 10,
};

export const verticalTableCardStyle = {
  ...genericTableCardStyle,
  marginTop: 10,
};
