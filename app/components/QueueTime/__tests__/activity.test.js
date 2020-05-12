import {getMostRecentRecordings} from '../activity';

describe('getMostRecentRecordings() util unit test', () => {
  it('should return an empty array when there is no data to get the most recent recordings from', () => {
    const recentRecordings = getMostRecentRecordings([]);
    expect(recentRecordings).toEqual([]);
  });

  it('should return an empty array when there the data is undefined', () => {
    const recentRecordings = getMostRecentRecordings(undefined);
    expect(recentRecordings).toEqual([]);
  });

  it('should just get one items queue times when only one item is present', () => {
    const data = [
      {
        queueTime: 'Random',
      },
    ];
    const recentRecordings = getMostRecentRecordings(data);
    expect(recentRecordings).toEqual([data[0].queueTime]);
  });

  it('should just get two items queue times when only two items are present', () => {
    const data = [
      {
        queueTime: 'Random',
      },
      {
        queueTime: 'Another',
      },
    ];
    const recentRecordings = getMostRecentRecordings(data);
    expect(recentRecordings).toEqual([data[0].queueTime, data[1].queueTime]);
  });

  it('should just get three items queue times when only three items are present', () => {
    const data = [
      {
        queueTime: 'Random',
      },
      {
        queueTime: 'Another',
      },
      {
        queueTime: 'Again',
      },
    ];
    const recentRecordings = getMostRecentRecordings(data);
    expect(recentRecordings).toEqual([
      data[0].queueTime,
      data[1].queueTime,
      data[2].queueTime,
    ]);
  });

  it('should just get three items queue times when more than three items exist', () => {
    const data = [
      {
        queueTime: 'Random',
      },
      {
        queueTime: 'Another',
      },
      {
        queueTime: 'Again',
      },
      {
        queueTime: 'Once more',
      },
    ];
    const recentRecordings = getMostRecentRecordings(data);
    expect(recentRecordings).toEqual([
      data[0].queueTime,
      data[1].queueTime,
      data[2].queueTime,
    ]);
  });
});
