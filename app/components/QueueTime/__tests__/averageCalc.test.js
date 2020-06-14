import moment from 'moment';
import {getAverageTime, getAverageQueueTimeFromDate} from '../averageCalc';

describe('getAverageTime calculator unit tests', () => {
  it('should return 0 as the average time for an empty array', () => {
    const averageTime = getAverageTime([]);
    expect(averageTime).toEqual({
      dataLength: 0,
      average: 0,
    });
  });

  it('should return the average for an array of data', () => {
    const averageTime = getAverageTime([
      {queueTime: 12},
      {queueTime: 16},
      {queueTime: 2},
    ]);
    expect(averageTime).toEqual({
      dataLength: 3,
      average: 10,
    });
  });

  it('should return the average for an array of data for decimal average time', () => {
    const averageTime = getAverageTime([
      {queueTime: 12.25},
      {queueTime: 16},
      {queueTime: 3.25},
    ]);
    expect(averageTime).toEqual({
      dataLength: 3,
      average: 10.5,
    });
  });

  it('should return 0 for an array of data without queue times', () => {
    const averageTime = getAverageTime([
      {noQueueTime: 12},
      {noQueueTime: 16},
      {noQueueTime: 2},
    ]);
    expect(averageTime).toEqual({
      dataLength: 3,
      average: 0,
    });
  });

  it('should return 0 if array is full of 0s', () => {
    const averageTime = getAverageTime([
      {queueTime: 0},
      {queueTime: 0},
      {queueTime: 0},
    ]);
    expect(averageTime).toEqual({
      dataLength: 3,
      average: 0,
    });
  });
});

describe('getAverageQueueTimeFromDate() calc unit tests', () => {
  const twoDaysAgo = moment()
    .add(-2, 'days')
    .format('X');
  const yesterday = moment()
    .add(-1, 'days')
    .format('X');
  const today = moment().format('X');
  const tomorrow = moment()
    .add(1, 'days')
    .format('X');
  const twoDaysAhead = moment()
    .add(2, 'days')
    .format('X');

  it('should get the average queue times for dates between today and tomorrow', () => {
    const averageTimes = getAverageQueueTimeFromDate(
      [
        {queueTime: 12, floatTimestamp: today},
        {queueTime: 16, floatTimestamp: tomorrow},
        {queueTime: 2, floatTimestamp: tomorrow},
        {queueTime: 90, floatTimestamp: yesterday},
        {queueTime: 81, floatTimestamp: twoDaysAgo},
        {queueTime: 22.345, floatTimestamp: twoDaysAhead},
      ],
      tomorrow,
      today,
    );
    expect(averageTimes).toEqual({
      dataLength: 3,
      average: 10,
    });
  });

  it('should get the average queue times for all dates if they are between the timestamps', () => {
    const averageTimes = getAverageQueueTimeFromDate(
      [
        {queueTime: 12.34, floatTimestamp: tomorrow},
        {queueTime: 16, floatTimestamp: today},
        {queueTime: 100, floatTimestamp: tomorrow},
        {queueTime: 2, floatTimestamp: yesterday},
        {queueTime: 100, floatTimestamp: twoDaysAgo},
        {queueTime: 12, floatTimestamp: yesterday},
      ],
      today,
      yesterday,
    );
    expect(averageTimes).toEqual({
      dataLength: 3,
      average: 10,
    });
  });

  it('should return 0 as average queue time if all dates are not in the date range', () => {
    const oneHourAgo = moment()
      .add(1, 'hours')
      .format('X');
    const averageTimes = getAverageQueueTimeFromDate(
      [
        {queueTime: 12.34, floatTimestamp: tomorrow},
        {queueTime: 16, floatTimestamp: twoDaysAgo},
        {queueTime: 100, floatTimestamp: tomorrow},
        {queueTime: 2, floatTimestamp: yesterday},
        {queueTime: 100, floatTimestamp: twoDaysAgo},
        {queueTime: 12, floatTimestamp: yesterday},
      ],
      today,
      oneHourAgo
    );
    expect(averageTimes).toEqual({
      dataLength: 0,
      average: 0,
    });
  });
});
