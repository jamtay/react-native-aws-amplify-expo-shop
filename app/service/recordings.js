import {searchRecordings, listRecordings} from './../../src/graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import {createRecording} from '../../src/graphql/mutations';
import {
  RECORDING_TYPES,
  MAXIMUM_ITEM_COUNT,
} from '../constants/recordingConstants';

import moment from 'moment';

const getUnixSecondTimestamp = momentDate => momentDate.format('X');

const lastWeekTimestampFilter = () => {
  const now = getUnixSecondTimestamp(moment());
  const oneWeekAgo = getUnixSecondTimestamp(moment().subtract(1, 'week'));
  return {
    floatTimestamp: {
      range: [oneWeekAgo, now],
    },
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

  // const response = await API.graphql(
  //   graphqlOperation(searchRecordings, {
  //     filter: filter,
  //     limit: MAXIMUM_ITEM_COUNT,
  //   }),
  // );

  // return response.data.searchRecordings.items;
  return [];
};

export const mockGetItemsForStore = async (storeID, missing) => {
  const filter = {
    storeID: {
      eq: storeID,
    },
    and: [
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
    graphqlOperation(listRecordings, {
      filter: filter,
      limit: MAXIMUM_ITEM_COUNT,
    }),
  );

  return response.data.listRecordings.items;
};
