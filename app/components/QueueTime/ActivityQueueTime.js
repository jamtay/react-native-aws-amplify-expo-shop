import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {Content, Text, Toast} from 'native-base';

const ActivityQueueTime = () => {
  const {
    qTimesData: {queueTimes, loading, error, additionSuccess},
  } = useSelector(state => state, shallowEqual);

  if (error) {
    Toast.show({
      text: error.message,
      buttonText: 'Okay',
      type: 'error',
      duration: 2000,
    });
  }

  if (
    additionSuccess &&
    !error &&
    queueTimes &&
    queueTimes.mostRecentRecordings &&
    queueTimes.mostRecentRecordings[0]
  ) {
    Toast.show({
      text: `Queue time of ${queueTimes.mostRecentRecordings[0]} added`,
      buttonText: 'Okay',
      type: 'success',
      duration: 2000,
    });
  }

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
