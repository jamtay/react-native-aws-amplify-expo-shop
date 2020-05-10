import {getFilterOptions} from './filterOptions';
import {shouldSearch, isSearchEmpty} from './searchDecider';
import {fetchStores} from '../../service/searchStores';

export const SEARCH_ACTION_TYPES = Object.freeze({
  SEARCH_STORES_STARTED: 'SEARCH_STORES_STARTED',
  SEARCH_STORES_SUCCESS: 'SEARCH_STORES_SUCCESS',
  SEARCH_STORES_ERROR: 'SEARCH_STORES_ERROR',
});

/**
 * An action which is fired when user enters search information
 */
export const searchStores = searchCriteria => {
  return async dispatch => {
    if (shouldSearch(searchCriteria)) {
      dispatch(searchStarted());
      if (isSearchEmpty(searchCriteria)) {
        dispatch(searchSuccess([]));
      } else {
        const filterOptions = getFilterOptions(searchCriteria);
        try {
          const stores = await fetchStores(filterOptions);
          dispatch(searchSuccess(stores));
        } catch (error) {
          console.error(error);
          dispatch(searchFailure(error));
        }
      }
    }
  };
};

const searchSuccess = stores => ({
  type: SEARCH_ACTION_TYPES.SEARCH_STORES_SUCCESS,
  payload: stores,
});

const searchStarted = () => ({
  type: SEARCH_ACTION_TYPES.SEARCH_STORES_STARTED,
});

const searchFailure = error => ({
  type: SEARCH_ACTION_TYPES.SEARCH_STORES_ERROR,
  payload: error,
});
