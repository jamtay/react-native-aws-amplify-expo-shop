import ItemRecording from '../../service/ItemRecording';
import {getIsUsingMock} from '../../config/getConfigVals';

export const MISSING_ITEM_ACTION_TYPES = Object.freeze({
  GET_MISSING_ITEM_STARTED: 'GET_MISSING_ITEM_STARTED',
  GET_MISSING_ITEM_SUCCESS: 'GET_MISSING_ITEM_SUCCESS',
  GET_MISSING_ITEM_ERROR: 'GET_MISSING_ITEM_ERROR',
  ADD_MISSING_ITEM_STARTED: 'ADD_MISSING_ITEM_STARTED',
  ADD_MISSING_ITEM_SUCCESS: 'ADD_MISSING_ITEM_SUCCESS',
  ADD_MISSING_ITEM_ERROR: 'ADD_MISSING_ITEM_ERROR',
});

const isUsingMock = getIsUsingMock();
const service = new ItemRecording(isUsingMock);

export const addMissingItems = (storeID, missingItems) => {
  return async dispatch => {
    dispatch(addMissingItemStarted());
    try {
      await service.addItemsForStore(storeID, missingItems, true);
      dispatch(addMissingItemSuccess(missingItems));
    } catch (error) {
      console.error(error);
      dispatch(addMissingItemFailure(error));
    }
  };
};

export const getMissingItems = storeID => {
  return async dispatch => {
    dispatch(getMissingItemStarted());
    try {
      const missingItems = await service.getItemsForStore(storeID, true);
      dispatch(getMissingItemSuccess(missingItems));
    } catch (error) {
      console.error(error);
      dispatch(getMissingItemFailure(error));
    }
  };
};

const addMissingItemSuccess = missingItems => ({
  type: MISSING_ITEM_ACTION_TYPES.ADD_MISSING_ITEM_SUCCESS,
  payload: missingItems,
});

const addMissingItemStarted = () => ({
  type: MISSING_ITEM_ACTION_TYPES.ADD_MISSING_ITEM_STARTED,
});

const addMissingItemFailure = error => ({
  type: MISSING_ITEM_ACTION_TYPES.ADD_MISSING_ITEM_ERROR,
  payload: error,
});

const getMissingItemSuccess = missingItems => ({
  type: MISSING_ITEM_ACTION_TYPES.GET_MISSING_ITEM_SUCCESS,
  payload: missingItems,
});

const getMissingItemStarted = () => ({
  type: MISSING_ITEM_ACTION_TYPES.GET_MISSING_ITEM_STARTED,
});

const getMissingItemFailure = error => ({
  type: MISSING_ITEM_ACTION_TYPES.GET_MISSING_ITEM_ERROR,
  payload: error,
});
