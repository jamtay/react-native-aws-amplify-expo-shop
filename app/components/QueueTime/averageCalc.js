export const No_DATA_INT = 0;

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
