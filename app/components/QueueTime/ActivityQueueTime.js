import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {Content, Text} from 'native-base';

const ActivityQueueTime = () => {
  const {
    qTimesData: {queueTimes, loading},
  } = useSelector(state => state, shallowEqual);

  if (loading) {
    return <Loading isLoading />;
  }

  return (
    <Content>
      {queueTimes.mostRecentRecordings.map((recording, index) => (
        <Text key={`lastest-q-time-${index + 1}`}>
          Most recent queue time {index + 1}: {recording} minutes
        </Text>
      ))}
    </Content>
  );
};

export default ActivityQueueTime;
