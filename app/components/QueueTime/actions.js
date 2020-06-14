import Toast from 'react-native-tiny-toast';
import QueueTimeService from '../../service/QueueTime';
import {getIsUsingMock} from '../../config/getConfigVals';
import {ERROR_MESSAGES, showErrorToast} from '../../constants/error';
import {addNewRecordingModal} from '../../constants/labels';

export const QUEUE_TIME_ACTION_TYPES = Object.freeze({
  QUEUE_TIME_STARTED: 'QUEUE_TIME_STARTED',
  GET_QUEUE_TIME_SUCCESS: 'GET_QUEUE_TIME_SUCCESS',
  ADD_QUEUE_TIME_SUCCESS: 'ADD_QUEUE_TIME_SUCCESS',
  QUEUE_TIME_ERROR: 'QUEUE_TIME_ERROR',
});

// If using a mock (no elastic search is deployed) then use the ItemRecording service that uses this mocked endpoint
// Can change to use a mock using "npm run env:mock" and not to use a mock is "npm run env:development"
const isUsingMock = getIsUsingMock();
const service = new QueueTimeService(isUsingMock);

/**
 * Get the queue times for a given store id
 * @param storeID
 */
export const getQueueTimes = storeID => {
  return async dispatch => {
    dispatch(queueTimeStarted());
    try {
      const queueTimes = await service.getQueueTimeData(storeID);
      dispatch(getQueueTimeSuccess(queueTimes));
    } catch (error) {
      console.error(error);
      dispatch(queueTimeFailure(error));
    }
  };
};

/**
 * Validate and add a quueue time to a given store id
 * @param storeID
 * @param queueTime
 */
export const addQueueTime = (storeID, queueTime) => {
  return async dispatch => {
    dispatch(queueTimeStarted());
    if (isNaN(parseFloat(queueTime))) {
      const nanError = new Error(ERROR_MESSAGES.ENTER_NUMBER);
      showErrorToast(nanError.message);
      dispatch(queueTimeFailure(nanError));
      return;
    }
    try {
      await service.addQueueTimeForStore(storeID, queueTime);
      Toast.showSuccess(
        addNewRecordingModal.SUCCESS_QUEUE_TIME(parseFloat(queueTime)),
      );
      dispatch(addQueueTimeSuccess(queueTime));
    } catch (error) {
      console.error(error);
      dispatch(queueTimeFailure(error));
      const userError = new Error(ERROR_MESSAGES.GENERIC);
      showErrorToast(userError.message);
    }
  };
};


const queueTimeStarted = () => ({
  type: QUEUE_TIME_ACTION_TYPES.QUEUE_TIME_STARTED,
});

const getQueueTimeSuccess = queueTimes => ({
  type: QUEUE_TIME_ACTION_TYPES.GET_QUEUE_TIME_SUCCESS,
  payload: queueTimes,
});

const addQueueTimeSuccess = queueTime => ({
  type: QUEUE_TIME_ACTION_TYPES.ADD_QUEUE_TIME_SUCCESS,
  payload: queueTime,
});

const queueTimeFailure = error => ({
  type: QUEUE_TIME_ACTION_TYPES.QUEUE_TIME_ERROR,
  payload: error,
});
