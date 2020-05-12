import moment from 'moment';

/**
 * Get a unitSecondTimestamp as a number from a given moment date
 * @param momentDate
 * @return {number}
 */
export const getUnixSecondTimestamp = momentDate =>
  parseFloat(momentDate.format('X'));

/**
 * Gets the timestamp filter to send to GraphQL to get all recordings in the last week
 * @return {{floatTimestamp: {range: [number, number]}}}
 */
export const lastWeekTimestampFilter = () => {
  const now = getUnixSecondTimestamp(moment());
  const oneWeekAgo = getUnixSecondTimestamp(moment().subtract(1, 'week'));
  return {
    floatTimestamp: {
      range: [oneWeekAgo, now],
    },
  };
};
