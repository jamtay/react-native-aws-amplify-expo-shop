import Toast from 'react-native-tiny-toast';
import ItemRecording from '../../service/ItemRecording';
import {getIsUsingMock} from '../../config/getConfigVals';
import {addNewRecordingModal} from '../../constants/labels';
import {ERROR_MESSAGES, showErrorToast} from '../../constants/error';
import {ITEM_TYPES} from './constants';

export const ITEM_ACTION_TYPES = Object.freeze({
  ITEM_ACTION_STARTED: type => `${type}_ITEM_ACTION_STARTED`,
  GET_ITEM_SUCCESS: type => `GET_${type}_ITEM_SUCCESS`,
  ADD_ITEM_SUCCESS: type => `ADD_${type}_ITEM_SUCCESS`,
  ITEM_ACTION_ERROR: type => `${type}_ITEM_ACTION_ERROR`,
});

// If using a mock (no elastic search is deployed) then use the ItemRecording service that uses this mocked endpoint
// Can change to use a mock using "npm run env:mock" and not to use a mock is "npm run env:development"
const isUsingMock = getIsUsingMock();
const service = new ItemRecording(isUsingMock);

/**
 * Add missing/available items to a store
 * @param storeID The storeID to add the items to
 * @param items The items to add
 * @param type The type of items to add (either "available" or "missing")
 */
export const addItems = (storeID, items, type) => {
  return async dispatch => {
    dispatch(itemActionStarted(type));
    if (!items || !items[0]) {
      const error = new Error(ERROR_MESSAGES.ENTER_ITEM);
      showErrorToast(error.message);
      dispatch(itemActionFailure(error, type));
      return;
    }

    try {
      await service.addItemsForStore(
        storeID,
        items,
        type === ITEM_TYPES.MISSING,
      );
      Toast.showSuccess(
        addNewRecordingModal.SUCCESS_ITEMS(items, type === ITEM_TYPES.MISSING),
      );
      dispatch(addItemSuccess(items, type));
    } catch (error) {
      console.error(error);
      dispatch(itemActionFailure(error, type));
      const userError = new Error(ERROR_MESSAGES.GENERIC);
      showErrorToast(userError.message);
    }
  };
};

/**
 * Get missing/available items for a store
 * @param storeID The storeID to find the items for
 * @param type The type of items to get (either "available" or "missing")
 */
export const getItems = (storeID, type) => {
  return async dispatch => {
    dispatch(itemActionStarted(type));
    try {
      const items = await service.getItemsForStore(
        storeID,
        type === ITEM_TYPES.MISSING,
      );
      dispatch(getItemSuccess(items, type));
    } catch (error) {
      console.error(error);
      dispatch(itemActionFailure(error, type));
    }
  };
};

const itemActionStarted = type => ({
  type: ITEM_ACTION_TYPES.ITEM_ACTION_STARTED(type),
});

const addItemSuccess = (items, type) => ({
  type: ITEM_ACTION_TYPES.ADD_ITEM_SUCCESS(type),
  payload: items,
});

const getItemSuccess = (items, type) => ({
  type: ITEM_ACTION_TYPES.GET_ITEM_SUCCESS(type),
  payload: items,
});

const itemActionFailure = (error, type) => ({
  type: ITEM_ACTION_TYPES.ITEM_ACTION_ERROR(type),
  payload: error,
});
