import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';

import {View, Text} from 'react-native';
import { queueTimeLabels } from '../../constants/labels';

const AverageQueueTime = ({style, fontStyle}) => {
  const {
    qTimesData: {queueTimes, loading},
  } = useSelector(state => state, shallowEqual);

  if (loading) {
    return <Loading isLoading />;
  }
  const getQueueText = time => {
    return !time || !time.average || !time.dataLength || time.dataLength === 0
      ? queueTimeLabels.N_A
      : `${Math.round(time.average)} ${queueTimeLabels.MINUTES}`;
  };
  return (
    <View style={style}>
      <Text style={fontStyle}>{queueTimeLabels.LAST_HOUR} {getQueueText(queueTimes.oneHour)}</Text>
      <Text style={fontStyle}>{queueTimeLabels.TODAY} {getQueueText(queueTimes.today)}</Text>
      <Text style={fontStyle}>{queueTimeLabels.LAST_WEEK} {getQueueText(queueTimes.lastWeek)}</Text>
    </View>
  );
};

export default AverageQueueTime;
