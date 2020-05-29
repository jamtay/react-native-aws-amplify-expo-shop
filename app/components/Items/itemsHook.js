import {shallowEqual, useSelector} from 'react-redux';
import {ITEM_TYPES} from './constants';

/**
 * A hook to fetch the data to display for available or missing items
 * @param type The type of activity. Either "missing" or "available"
 * @returns An array including objects [THE_DATA, IS_LOADING]
 */
export const useItems = type => {
  const {availableItemsData, missingItemsData} = useSelector(
    state => state,
    shallowEqual,
  );

  switch (type) {
    case ITEM_TYPES.MISSING:
      return [missingItemsData.missingItems, missingItemsData.loading];
    case ITEM_TYPES.AVAILABLE:
      return [availableItemsData.availableItems, availableItemsData.loading];
  }
};
