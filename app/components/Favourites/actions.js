import {
  getFavouriteData,
  addFavourite,
  removeFavourite,
  removeAllFavourites,
} from '../../service/localStorage';

export const FAVOURITES_ACTION_TYPES = Object.freeze({
  FAVOURITES_STARTED: 'FAVOURITES_STARTED',
  FAVOURITES_SUCCESS: 'FAVOURITES_SUCCESS',
  FAVOURITES_ERROR: 'FAVOURITES_ERROR',
  REMOVE_ALL_FAVOURITES: 'REMOVE_ALL_FAVOURITES',
});

/**
 * Get all the favourites and dispatch loading, error and response information into redux
 */
export const getFavourites = () => {
  return async dispatch => {
    dispatch(favouritesStarted());
    try {
      const favourites = await getFavouriteData();
      dispatch(favouritesSuccess(favourites));
    } catch (error) {
      console.error(error);
      dispatch(favouritesFailure(error));
    }
  };
};

/**
 * Add or remove a favourite from local storage and dispatch the updated favourites list into redux
 * @param isFavourite
 * @param item
 */
export const updateFavourite = (isFavourite, item) => {
  return async dispatch => {
    dispatch(favouritesStarted());
    try {
      const updatedFavourites = isFavourite
        ? await removeFavourite(item.id)
        : await addFavourite(item);
      dispatch(favouritesSuccess(updatedFavourites));
    } catch (error) {
      console.error(error);
      dispatch(favouritesFailure(error));
    }
  };
};

/**
 * A helper redux action to remove all favourites from async local storage
 */
export const removeAllFavouritesDispatch = () => {
  return async dispatch => {
    dispatch(favouritesStarted());
    try {
      await removeAllFavourites();
      dispatch(removeAllFavouritesAction());
    } catch (error) {
      console.error(error);
      dispatch(favouritesFailure(error));
    }
  };
};

/**
 * A helper redux action to remove all favourites from async local storage
 */
const removeAllFavouritesAction = () => ({
  type: FAVOURITES_ACTION_TYPES.REMOVE_ALL_FAVOURITES,
  payload: [],
});

const favouritesStarted = () => ({
  type: FAVOURITES_ACTION_TYPES.FAVOURITES_STARTED,
});

const favouritesSuccess = favourites => ({
  type: FAVOURITES_ACTION_TYPES.FAVOURITES_SUCCESS,
  payload: favourites,
});

const favouritesFailure = error => ({
  type: FAVOURITES_ACTION_TYPES.FAVOURITES_ERROR,
  payload: error,
});
