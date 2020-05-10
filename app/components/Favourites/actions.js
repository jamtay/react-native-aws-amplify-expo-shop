import {
  getFavouriteData,
  addFavourite,
  removeFavourite,
} from '../../service/localStorage';

export const FAVOURITES_ACTION_TYPES = Object.freeze({
  GET_FAVOURITES_STARTED: 'GET_FAVOURITES_STARTED',
  GET_FAVOURITES_SUCCESS: 'GET_FAVOURITES_SUCCESS',
  GET_FAVOURITES_ERROR: 'GET_FAVOURITES_ERROR',
  UPDATE_FAVOURITES_STARTED: 'UPDATE_FAVOURITES_STARTED',
  UPDATE_FAVOURITES_SUCCESS: 'UPDATE_FAVOURITES_SUCCESS',
  UPDATE_FAVOURITES_ERROR: 'UPDATE_FAVOURITES_ERROR',
});

export const getFavourites = () => {
  return async dispatch => {
    dispatch(getFavouritesStarted());
    try {
      const favourites = await getFavouriteData();
      dispatch(getFavouritesSuccess(favourites));
    } catch (error) {
      console.error(error);
      dispatch(getFavouritesFailure());
    }
  };
};

export const updateFavourite = (isFavourite, item) => {
  return async dispatch => {
    dispatch(updateFavouritesStarted());
    try {
      const updatedFavourites = isFavourite
        ? await removeFavourite(item.id)
        : await addFavourite(item);
      dispatch(updateFavouritesSuccess(updatedFavourites));
    } catch (error) {
      console.error(error);
      dispatch(updateFavouritesFailure());
    }
  };
};

const getFavouritesSuccess = favourites => ({
  type: FAVOURITES_ACTION_TYPES.GET_FAVOURITES_SUCCESS,
  payload: favourites,
});

const getFavouritesStarted = () => ({
  type: FAVOURITES_ACTION_TYPES.GET_FAVOURITES_STARTED,
});

const getFavouritesFailure = error => ({
  type: FAVOURITES_ACTION_TYPES.GET_FAVOURITES_ERROR,
  payload: error,
});

const updateFavouritesSuccess = favourites => ({
  type: FAVOURITES_ACTION_TYPES.UPDATE_FAVOURITES_SUCCESS,
  payload: favourites,
});

const updateFavouritesStarted = () => ({
  type: FAVOURITES_ACTION_TYPES.UPDATE_FAVOURITES_STARTED,
});

const updateFavouritesFailure = error => ({
  type: FAVOURITES_ACTION_TYPES.UPDATE_FAVOURITES_ERROR,
  payload: error,
});
