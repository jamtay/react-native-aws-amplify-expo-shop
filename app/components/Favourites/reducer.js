import {FAVOURITES_ACTION_TYPES} from './actions';

const initialState = {
  loading: false,
  favourites: [],
  error: null,
};

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITES_ACTION_TYPES.GET_FAVOURITES_STARTED:
    case FAVOURITES_ACTION_TYPES.UPDATE_FAVOURITES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FAVOURITES_ACTION_TYPES.GET_FAVOURITES_SUCCESS:
    case FAVOURITES_ACTION_TYPES.UPDATE_FAVOURITES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        favourites: action.payload,
      };
    //  A helper for removing all favourites using TestButtons.js
    case FAVOURITES_ACTION_TYPES.REMOVE_ALL_FAVOURITES:
      return {
        ...state,
        loading: false,
        error: null,
        favourites: [],
      };
    case FAVOURITES_ACTION_TYPES.GET_FAVOURITES_ERROR:
    case FAVOURITES_ACTION_TYPES.UPDATE_FAVOURITES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default favouritesReducer;
