import {shallowEqual, useSelector} from 'react-redux';
import {getFavouriteIds, isAlreadyFavourite} from './utils';

/**
 * Find if an item is already a favourite, using a custom hook
 * @param dataId
 * @returns {Boolean} If the item is a favourite
 */
export const useIsFavHook = dataId => {
  const {
    favouritesData: {favourites},
  } = useSelector(state => state, shallowEqual);

  return isAlreadyFavourite(dataId, getFavouriteIds(favourites));
};
