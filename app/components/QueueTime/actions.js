import QueueTimeService from '../../service/QueueTime';
import { getIsUsingMock } from '../../config/getConfigVals';
import { Toast } from 'native-base';

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
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        type: 'error',
        duration: 2000,
      });
      dispatch(getQueueTimeFailure(error));
    }
  };
};

export const addQueueTime = (storeID, queueTime) => {
  return async dispatch => {
    dispatch(addQueueTimeStarted());
    if (isNaN(parseFloat(queueTime))) {
      const nanError = new Error('Must enter a number');
      Toast.show({
        text: 'Please enter a number',
        buttonText: 'Okay',
        type: 'warning',
        duration: 2000,
      });
      dispatch(addQueueTimeFailure(nanError));
    }
    try {
      await service.addQueueTimeForStore(storeID, queueTime);
      //Toast needs to come before the dispatch in order for it to display
      Toast.show({
        text: `Queue time of ${queueTime} added`,
        buttonText: 'Okay',
        type: 'success',
        duration: 2000,
      });
      dispatch(addQueueTimeSuccess(queueTime));
    } catch (error) {
      console.error(error);
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        type: 'error',
        duration: 2000,
      });
      dispatch(addQueueTimeFailure(error));
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
