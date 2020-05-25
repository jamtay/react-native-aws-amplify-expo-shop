import QueueTimeService from '../../service/QueueTime';
import {getIsUsingMock} from '../../config/getConfigVals';
import Toast from 'react-native-tiny-toast';
import { ERROR_MESSAGES, showErrorToast } from '../../constants/error';
import {addNewRecordingModal} from '../../constants/labels';
import {COLOURS} from '../../styles/colours';

export const QUEUE_TIME_ACTION_TYPES = Object.freeze({
  GET_QUEUE_TIME_STARTED: 'GET_QUEUE_TIME_STARTED',
  GET_QUEUE_TIME_SUCCESS: 'GET_QUEUE_TIME_SUCCESS',
  GET_QUEUE_TIME_ERROR: 'GET_QUEUE_TIME_ERROR',
  ADD_QUEUE_TIME_STARTED: 'ADD_QUEUE_TIME_STARTED',
  ADD_QUEUE_TIME_SUCCESS: 'ADD_QUEUE_TIME_SUCCESS',
  ADD_QUEUE_TIME_ERROR: 'ADD_QUEUE_TIME_ERROR',
});

const isUsingMock = getIsUsingMock();
const service = new QueueTimeService(isUsingMock);

export const getQueueTimes = storeID => {
  return async dispatch => {
    dispatch(getQueueTimeStarted());
    try {
      const queueTimes = await service.getQueueTimeData(storeID);
      dispatch(getQueueTimeSuccess(queueTimes));
    } catch (error) {
      console.error(error);
      dispatch(getQueueTimeFailure(error));
    }
  };
};

export const addQueueTime = (storeID, queueTime) => {
  return async dispatch => {
    dispatch(addQueueTimeStarted());
    if (isNaN(parseFloat(queueTime))) {
      const nanError = new Error(ERROR_MESSAGES.ENTER_NUMBER);
      showErrorToast(nanError.message);
      dispatch(addQueueTimeFailure(nanError));
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
      dispatch(addQueueTimeFailure(error));
      const userError = new Error(ERROR_MESSAGES.GENERIC);
      showErrorToast(userError.message);
    }
  };
};

const getQueueTimeSuccess = queueTimes => ({
  type: QUEUE_TIME_ACTION_TYPES.GET_QUEUE_TIME_SUCCESS,
  payload: queueTimes,
});

const getQueueTimeStarted = () => ({
  type: QUEUE_TIME_ACTION_TYPES.GET_QUEUE_TIME_STARTED,
});

const getQueueTimeFailure = error => ({
  type: QUEUE_TIME_ACTION_TYPES.GET_QUEUE_TIME_ERROR,
  payload: error,
});

const addQueueTimeSuccess = queueTime => ({
  type: QUEUE_TIME_ACTION_TYPES.ADD_QUEUE_TIME_SUCCESS,
  payload: queueTime,
});

const addQueueTimeStarted = () => ({
  type: QUEUE_TIME_ACTION_TYPES.ADD_QUEUE_TIME_STARTED,
});

const addQueueTimeFailure = error => ({
  type: QUEUE_TIME_ACTION_TYPES.ADD_QUEUE_TIME_ERROR,
  payload: error,
});
