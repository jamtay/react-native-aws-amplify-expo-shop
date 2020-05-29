import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {View, Text} from 'react-native';
import { storePageLabels } from '../../constants/labels';

const ActivityMissingItems = ({style, fontStyle}) => {
  const {
    missingItemsData: {missingItems, loading},
  } = useSelector(state => state, shallowEqual);

  if (loading) {
    return <Loading isLoading />;
  }

  return (
    <View style={style}>
      {missingItems.map((recording, index) => (
        <Text style={fontStyle} key={`latest-missing-item-${index + 1}`}>
          {index + 1}. {recording.filter(rec => rec && rec !== '').join(', ')}
        </Text>
      ))}
      {missingItems.length === 0 && (
        <Text style={fontStyle}>
          {storePageLabels.NO_ITEMS(true)}
        </Text>
      )}
    </View>
  );
};

export default ActivityMissingItems;
