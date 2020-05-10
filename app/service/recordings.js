import {searchRecordings} from './../../src/graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import {createRecording} from '../../src/graphql/mutations';
import {
  RECORDING_TYPES,
  DEFAULT_SORT_OPTION,
  MAXIMUM_ITEM_COUNT,
} from '../constants/recordingConstants';
import moment from 'moment';

export const No_DATA_INT = 0;

const getUnixSecondTimestamp = momentDate => momentDate.format('X');

export const addQueueTimeForStore = async (storeID, queueTime) => {
  await API.graphql(
    graphqlOperation(createRecording, {
      input: {
        type: RECORDING_TYPES.QUEUE_TIME,
        queueTime: parseFloat(queueTime),
        storeID: storeID,
        floatTimestamp: getUnixSecondTimestamp(moment()),
      },
    }),
  );
};

export const getAverageTime = data => {
  if (data.length === 0) {
    return {
      dataLength: data.length,
      average: No_DATA_INT,
    };
  }
  const sum = data
    .map(recording => recording.queueTime)
    .reduce((previos, current) => (current += previos), 0);
  return {
    dataLength: data.length,
    average: sum && sum !== No_DATA_INT ? sum / data.length : No_DATA_INT,
  };
};

export const getAverageQueueTimeFromDate = (data, now, previousDate) => {
  return getAverageTime(
    data.filter(
      recording =>
        recording.floatTimestamp <= now &&
        recording.floatTimestamp >= previousDate,
    ),
  );
};

export const getMostRecentRecordings = data => {
  if (data.length > 2) {
    return [data[0].queueTime, data[1].queueTime, data[2].queueTime];
  }
  if (data.length === 2) {
    return [data[0].queueTime, data[1].queueTime];
  }

  if (data.length === 1) {
    return [data[0].queueTime];
  }

  return [];
};

const lastWeekTimestampFilter = () => {
  const now = getUnixSecondTimestamp(moment());
  const oneWeekAgo = getUnixSecondTimestamp(moment().subtract(1, 'week'));
  return {
    floatTimestamp: {
      range: [oneWeekAgo, now],
    },
  };
};

export const getQueueTimeData = async storeID => {
  const now = getUnixSecondTimestamp(moment());
  const lastNight = getUnixSecondTimestamp(moment().startOf('day'));
  const oneHourAgo = getUnixSecondTimestamp(moment().subtract(1, 'hour'));

  const queueTimes = await API.graphql(
    graphqlOperation(searchRecordings, {
      filter: {
        storeID: {
          eq: storeID,
        },
        and: [
          lastWeekTimestampFilter(),
          {
            type: {
              eq: RECORDING_TYPES.QUEUE_TIME,
            },
          },
        ],
      },
      sort: DEFAULT_SORT_OPTION.sort,
    }),
  );

  const data = queueTimes.data.searchRecordings.items;
  return {
    storeID: storeID,
    oneHour: getAverageQueueTimeFromDate(data, now, oneHourAgo),
    today: getAverageTime(data, now, lastNight),
    lastWeek: getAverageTime(data),
    mostRecentRecordings: getMostRecentRecordings(data),
  };
};

export const addItemsForStore = async (storeID, items, isMissing) => {
  const input = isMissing
    ? {
        type: RECORDING_TYPES.MISSING_ITEMS,
        missingItems: items,
        storeID: storeID,
        floatTimestamp: getUnixSecondTimestamp(moment()),
      }
    : {
        type: RECORDING_TYPES.AVAILABLE_ITEMS,
        availableItems: items,
        storeID: storeID,
        floatTimestamp: getUnixSecondTimestamp(moment()),
      };
  await API.graphql(
    graphqlOperation(createRecording, {
      input: input,
    }),
  );
};

export const getItemsForStore = async (storeID, missing) => {
  const filter = {
    storeID: {
      eq: storeID,
    },
    and: [
      lastWeekTimestampFilter(),
      {
        type: {
          eq: missing
            ? RECORDING_TYPES.MISSING_ITEMS
            : RECORDING_TYPES.AVAILABLE_ITEMS,
        },
      },
    ],
  };

  const response = await API.graphql(
    graphqlOperation(searchRecordings, {
      filter: filter,
      sort: DEFAULT_SORT_OPTION.sort,
      limit: MAXIMUM_ITEM_COUNT,
    }),
  );

  return response.data.searchRecordings.items;
};
