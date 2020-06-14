import SearchService from '../../service/SearchService';
import {shouldSearch, isSearchEmpty} from './searchDecider';
import {getFilterOptions} from './filterOptions';
import {getIsUsingMock} from '../../config/getConfigVals';

export const SEARCH_ACTION_TYPES = Object.freeze({
  SEARCH_STORES_STARTED: 'SEARCH_STORES_STARTED',
  SEARCH_STORES_SUCCESS: 'SEARCH_STORES_SUCCESS',
  SEARCH_STORES_ERROR: 'SEARCH_STORES_ERROR',
});

// If using a mock (no elastic search is deployed) then use the ItemRecording service that uses this mocked endpoint
// Can change to use a mock using "npm run env:mock" and not to use a mock is "npm run env:development"
const isUsingMock = getIsUsingMock();
const service = new SearchService(isUsingMock);

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
          const stores = await service.fetchStores(filterOptions);
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
