import {QUEUE_TIME_ACTION_TYPES} from './actions';
import {No_DATA_INT} from './averageCalc';

const initialTimeState = {
  average: 0,
  dataLength: 0,
};
const initialState = {
  loading: false,
  queueTimes: {
    storeID: '',
    oneHour: initialTimeState,
    today: initialTimeState,
    lastWeeK: initialTimeState,
    mostRecentRecordings: [],
  },
  additionSuccess: false,
  error: null,
};

/**
 * Recalculate the average of queue times for a store
 * This saves calling the backend to get the new average
 * @param time
 * @param queueTime
 * @returns {{average: number, dataLength: number}}
 */
const recalculateAverage = (time, queueTime) => {
  if (time.average === No_DATA_INT || time.dataLength === 0) {
    return {
      average: parseFloat(queueTime),
      dataLength: time.dataLength + 1,
    };
  }

  return {
    average:
      (time.average * time.dataLength + parseFloat(queueTime)) /
      (time.dataLength + 1),
    dataLength: time.dataLength + 1,
  };
};

const queueTimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUEUE_TIME_ACTION_TYPES.QUEUE_TIME_STARTED:
      return {
        ...state,
        loading: true,
        additionSuccess: false,
      };
    case QUEUE_TIME_ACTION_TYPES.GET_QUEUE_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        queueTimes: action.payload,
        additionSuccess: false,
      };
    case QUEUE_TIME_ACTION_TYPES.ADD_QUEUE_TIME_SUCCESS:
      const newState = {
        ...state,
        loading: false,
        error: null,
        queueTimes: {
          storeID: state.queueTimes.storeID,
          oneHour: recalculateAverage(state.queueTimes.oneHour, action.payload),
          today: recalculateAverage(state.queueTimes.today, action.payload),
          lastWeek: recalculateAverage(
            state.queueTimes.lastWeek,
            action.payload,
          ),
          mostRecentRecordings: [
            parseFloat(action.payload),
            state.queueTimes.mostRecentRecordings[0],
            state.queueTimes.mostRecentRecordings[1],
          ],
        },
        additionSuccess: true,
      };
      return newState;
    case QUEUE_TIME_ACTION_TYPES.QUEUE_TIME_ERROR:
      return {
        ...state,
        loading: false,
        additionSuccess: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default queueTimeReducer;
