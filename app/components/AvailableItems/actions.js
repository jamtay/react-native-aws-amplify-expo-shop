import {addItemsForStore, getItemsForStore} from '../../service/recordings';

export const AVAILABLE_ITEM_ACTION_TYPES = Object.freeze({
  GET_AVAILABLE_ITEM_STARTED: 'GET_AVAILABL_ITEM_STARTED',
  GET_AVAILABLE_ITEM_SUCCESS: 'GET_AVAILABL_ITEM_SUCCESS',
  GET_AVAILABLE_ITEM_ERROR: 'GET_AVAILABL_ITEM_ERROR',
  ADD_AVAILABLE_ITEM_STARTED: 'ADD_AVAILABL_ITEM_STARTED',
  ADD_AVAILABLE_ITEM_SUCCESS: 'ADD_AVAILABL_ITEM_SUCCESS',
  ADD_AVAILABLE_ITEM_ERROR: 'ADD_AVAILABL_ITEM_ERROR',
});

export const addAvailableItems = (storeID, availableItems) => {
  return async dispatch => {
    dispatch(addAvailableItemStarted());
    try {
      await addItemsForStore(storeID, availableItems, false);
      dispatch(addAvailableItemSuccess(availableItems));
    } catch (error) {
      console.error(error);
      dispatch(addAvailableItemFailure(error));
    }
  };
};

export const getAvailableItems = storeID => {
  return async dispatch => {
    dispatch(getAvailableItemStarted());
    try {
      const availableItems = await getItemsForStore(storeID, false);
      dispatch(getAvailableItemSuccess(availableItems));
    } catch (error) {
      console.error(error);
      dispatch(getAvailableItemFailure(error));
    }
  };
};

const addAvailableItemSuccess = availableItems => ({
  type: AVAILABLE_ITEM_ACTION_TYPES.ADD_AVAILABLE_ITEM_SUCCESS,
  payload: availableItems,
});

const addAvailableItemStarted = () => ({
  type: AVAILABLE_ITEM_ACTION_TYPES.ADD_AVAILABLE_ITEM_STARTED,
});

const addAvailableItemFailure = error => ({
  type: AVAILABLE_ITEM_ACTION_TYPES.ADD_AVAILABLE_ITEM_ERROR,
  payload: error,
});

const getAvailableItemSuccess = availableItems => ({
  type: AVAILABLE_ITEM_ACTION_TYPES.GET_AVAILABLE_ITEM_SUCCESS,
  payload: availableItems,
});

const getAvailableItemStarted = () => ({
  type: AVAILABLE_ITEM_ACTION_TYPES.GET_AVAILABLE_ITEM_STARTED,
});

const getAvailableItemFailure = error => ({
  type: AVAILABLE_ITEM_ACTION_TYPES.GET_AVAILABLE_ITEM_ERROR,
  payload: error,
});
