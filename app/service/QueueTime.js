import {searchRecordings, listRecordings} from './../../src/graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import {createRecording} from '../../src/graphql/mutations';
import {
  RECORDING_TYPES,
  DEFAULT_SORT_OPTION,
} from '../constants/recordingConstants';
import {
  getAverageTime,
  getAverageQueueTimeFromDate,
} from '../components/QueueTime/averageCalc';
import { getMostRecentRecordings } from '../components/QueueTime/activity';

import moment from 'moment';
import { getUnixSecondTimestamp, lastWeekTimestampFilter } from './recordingUtils';

export default class QueueTime {
  /**
   * If using a mock api the list endpoint will be called instead of search (to save elastic search costs)
   * @param {*} isUsingMock Whether using a mock api or not
   */
  constructor(isUsingMock) {
    this.isUsingMock = isUsingMock;
  }

  /**
   * Search the stores using Elastic search. (ES has to be deployed for this to work)
   * @param {*} storeID
   */
  async #searchRecordings(storeID) {
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

    return queueTimes.data.searchRecordings.items;
  }

  /**
   * Simply list the recordings when elastic search is not deployed and we are using a mock api
   * @param {*} storeID
   */
  async #listRecordings(storeID) {
    const queueTimes = await API.graphql(
      graphqlOperation(listRecordings, {
        filter: {
          storeID: {
            eq: storeID,
          },
          and: [
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

    return queueTimes.data.listRecordings.items;
  }

  /**
   *
   * @param storeID
   * @return A promise of Queuetime data for a give store. in the format {storeID, oneHour, today, lastWeek, mostRecentRecordings}
   * Where oneHour, today, lastWeek are average times. mostRecentRecordings is the latest 3 recordings
   */
  async getQueueTimeData(storeID) {
    const now = getUnixSecondTimestamp(moment());
    const lastNight = getUnixSecondTimestamp(moment().startOf('day'));
    const oneHourAgo = getUnixSecondTimestamp(moment().subtract(1, 'hour'));

    const data = this.isUsingMock
      ? await this.#listRecordings(storeID)
      : await this.#searchRecordings(storeID);
    return {
      storeID: storeID,
      oneHour: getAverageQueueTimeFromDate(data, now, oneHourAgo),
      today: getAverageQueueTimeFromDate(data, now, lastNight),
      lastWeek: getAverageTime(data),
      mostRecentRecordings: getMostRecentRecordings(data),
    };
  }

  /**
   * Add a new queuetime for a given store id
   * @param {*} storeID
   * @param {*} queueTime
   */
  async addQueueTimeForStore(storeID, queueTime) {
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
  }
}
