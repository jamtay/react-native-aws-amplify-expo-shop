import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';

import {Content, Text} from 'native-base';

const AverageQueueTime = () => {
  const {
    qTimesData: {queueTimes, loading},
  } = useSelector(state => state, shallowEqual);

  if (loading) {
    return <Loading isLoading />;
  }
  const getQueueText = time => {
    return !time || !time.average || !time.dataLength || time.dataLength === 0
      ? 'n/a'
      : `${time.average} minutes`;
  };
  return (
    <Content>
      <Text>Last hour: {getQueueText(queueTimes.oneHour)}</Text>
      <Text>Today: {getQueueText(queueTimes.today)}</Text>
      <Text>Last week: {getQueueText(queueTimes.lastWeek)}</Text>
    </Content>
  );
};

export default AverageQueueTime;
