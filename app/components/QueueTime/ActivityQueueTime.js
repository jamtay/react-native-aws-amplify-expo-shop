import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {View, Text} from 'react-native';
import {queueTimeLabels} from '../../constants/labels';

const ActivityQueueTime = ({style, fontStyle}) => {
  const {
    qTimesData: {queueTimes, loading},
  } = useSelector(state => state, shallowEqual);

  if (loading) {
    return <Loading isLoading />;
  }

  const cleanedQueueTimes =
    queueTimes && queueTimes.mostRecentRecordings
      ? queueTimes.mostRecentRecordings.filter(qtime => qtime && qtime !== '')
      : [];
  return (
    <View style={style}>
      <Text style={fontStyle}>
        {queueTimeLabels.LATEST_ENTRY}{' '}
        {cleanedQueueTimes.map((recording, index) => {
          if (index === 0) {
            return `${recording} ${queueTimeLabels.MINUTES}`;
          } else {
            return `, ${recording} ${queueTimeLabels.MINUTES}`;
          }
        })}
      </Text>
    </View>
  );
};

export default ActivityQueueTime;
