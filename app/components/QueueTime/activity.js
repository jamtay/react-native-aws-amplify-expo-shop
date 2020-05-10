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
