import {
  getUnixSecondTimestamp,
  lastWeekTimestampFilter,
} from '../recordingUtils';
import moment from 'moment';

describe('getUnixSecondTimestamp() util test', () => {
  it('should get the unit timestamp from a moment date and return as a number', () => {
    const momentDate = moment('2013-03-01', 'YYYY-MM-DD');
    const floatTimestamp = getUnixSecondTimestamp(momentDate);
    expect(floatTimestamp).toEqual(1362096000);
    expect(typeof floatTimestamp).toEqual('number');
  });

  it('should throw an error if a non-moment date is supplied', () => {
    const nonMomentDate = new Date();

    try {
      getUnixSecondTimestamp(nonMomentDate);
      expect('It should not reach this line').toEqual(
        'Because the above line getUnixSecondTimestamp(nonMomentDate); should have errored',
      );
    } catch (error) {
      expect(error.message).toEqual('momentDate.format is not a function');
    }
  });
});

describe('lastWeekTimestampFilter() unit tests', () => {
  it('should return a filter for this week to last week', () => {
    const now = getUnixSecondTimestamp(moment());
    const oneWeekAgo = getUnixSecondTimestamp(moment().subtract(1, 'week'));

    const filter = lastWeekTimestampFilter();

    const filterTimestampRange = filter.floatTimestamp.range;
    expect(filterTimestampRange).toHaveLength(2);

    //Verify last week timestamp parameter in the range is between a second of lastweek when the test was run
    expect(filterTimestampRange[0]).toBeGreaterThan(oneWeekAgo - 1);
    expect(filterTimestampRange[0]).toBeLessThan(oneWeekAgo + 1);
    expect(typeof filterTimestampRange[0]).toEqual('number');
    //Verify now timestamp parameter in the range is between a second of now when the test was run
    expect(filterTimestampRange[1]).toBeGreaterThan(now - 1);
    expect(filterTimestampRange[1]).toBeLessThan(now + 1);
    expect(typeof filterTimestampRange[1]).toEqual('number');
  });
});
