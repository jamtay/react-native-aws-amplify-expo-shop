export const No_DATA_INT = 0;

/**
 * Get the length of the data and the average time
 * @param data
 * @returns {{average: number, dataLength: number}}
 */
export const getAverageTime = data => {
  if (data.length === 0) {
    return {
      dataLength: data.length,
      average: No_DATA_INT,
    };
  }
  const sum = data
    .map(recording => recording.queueTime)
    .reduce((previous, current) => (current += previous), 0);
  return {
    dataLength: data.length,
    average: sum && sum !== No_DATA_INT ? sum / data.length : No_DATA_INT,
  };
};

/**
 * Gets the average date between a certain date
 * @param data
 * @param now
 * @param previousDate
 * @returns {{average: number, dataLength: number}}
 */
export const getAverageQueueTimeFromDate = (data, now, previousDate) => {
  return getAverageTime(
    data.filter(
      recording =>
        recording.floatTimestamp <= now &&
        recording.floatTimestamp >= previousDate,
    ),
  );
};
