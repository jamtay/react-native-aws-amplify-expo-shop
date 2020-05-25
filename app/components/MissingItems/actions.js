import ItemRecording from '../../service/ItemRecording';
import {getIsUsingMock} from '../../config/getConfigVals';
import Toast from 'react-native-tiny-toast';
import {addNewRecordingModal} from '../../constants/labels';
import {COLOURS} from '../../styles/colours';
import { ERROR_MESSAGES, showErrorToast } from '../../constants/error';

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
    if (!missingItems || !missingItems[0]) {
      const error = new Error(ERROR_MESSAGES.ENTER_ITEM);
      showErrorToast(error.message);
      dispatch(addMissingItemFailure(error));
      return;
    }

    try {
      await service.addItemsForStore(storeID, missingItems, true);
      Toast.showSuccess(
        addNewRecordingModal.SUCCESS_ITEMS(missingItems, true),
      );
      dispatch(addMissingItemSuccess(missingItems));
    } catch (error) {
      console.error(error);
      dispatch(addMissingItemFailure(error));
      const userError = new Error(ERROR_MESSAGES.GENERIC);
      showErrorToast(userError.message);
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
