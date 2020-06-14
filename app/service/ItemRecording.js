import moment from 'moment';
import {API, graphqlOperation} from 'aws-amplify';
import {createRecording} from '../../src/graphql/mutations';
import { getUnixSecondTimestamp, lastWeekTimestampFilter } from './recordingUtils';
import { MAXIMUM_ITEM_COUNT, RECORDING_TYPES } from '../constants/recordingConstants';
// searchRecordings is only available when @searchable/elasticsearch is deployed. Add @searchable to Recordings in schema.graphql
// type Recording @model @searchable { }
// Then run `amplify push` and `npm run env:development` before running the app
import { listRecordings, searchRecordings } from '../../src/graphql/queries';

export default class ItemRecording {
  /**
   * If using a mock api the list endpoint will be called instead of search (to save elastic search costs)
   * @param {*} isUsingMock Whether using a mock api or not
   */
  constructor(isUsingMock) {
    this.isUsingMock = isUsingMock;
  }

  /**
   * Search the recordings using Elastic search. (ES has to be deployed for this to work)
   * @param {string} storeID Store ID to find the recordings from
   * @param {boolean} isMissing Determines whether to search for missing or available items
   * @returns {Array<object>} An array of filtered available or missing items for a given store
   */
  async #searchItemsForStore(storeID, isMissing) {
    const filter = {
      storeID: {
        eq: storeID,
      },
      and: [
        lastWeekTimestampFilter(),
        {
          type: {
            eq: isMissing
              ? RECORDING_TYPES.MISSING_ITEMS
              : RECORDING_TYPES.AVAILABLE_ITEMS,
          },
        },
      ],
    };

    const response = await API.graphql(
      graphqlOperation(searchRecordings, {
        filter: filter,
        limit: MAXIMUM_ITEM_COUNT,
      }),
    );

    return response.data.searchRecordings.items;
  }

  /**
   * Simply list the recordings when elastic search is not deployed and we are using a mock api
   * @param {string} storeID Store ID to find the recordings from
   * @param {boolean} isMissing Determines whether to search for missing or available items
   * @returns {Array<object>} An array of non-filtered available or missing items for a given store
   */
  async #mockGetItemsForStore(storeID, isMissing) {
    const filter = {
      storeID: {
        eq: storeID,
      },
      and: [
        {
          type: {
            eq: isMissing
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

  /**
   * Get the items recorded from either elastic search or dyanmoDB depending on whether isUsingMock is set to true or false
   * @param {*} storeID Store ID to find the recordings from
   * @param {boolean} isMissing Determines whether to search for missing or available items
   * @returns {Array<object>} An array of available or missing items for a given store
   */
  async getItemsForStore(storeID, isMissing) {
    return this.isUsingMock ?
      this.#mockGetItemsForStore(storeID, isMissing):
      this.#searchItemsForStore(storeID, isMissing);
  }

  /**
   * Add the items to the backend for either available or missing
   * @param {string} storeID The store to apply the recordings to
   * @param {Array} items The items to add as recordings to the store
   * @param {boolean} isMissing Determines whether to add a recording for missing or available items
   * @return {Promise<void>}
   */
  async addItemsForStore(storeID, items, isMissing) {
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
  }
}
