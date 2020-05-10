import {SEARCH_ACTION_TYPES} from './actions';

const initialState = {
  loading: false,
  stores: [],
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ACTION_TYPES.SEARCH_STORES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ACTION_TYPES.SEARCH_STORES_SUCCESS:
      return {
        loading: false,
        error: null,
        stores: action.payload,
      };
    case SEARCH_ACTION_TYPES.SEARCH_STORES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default searchReducer;
