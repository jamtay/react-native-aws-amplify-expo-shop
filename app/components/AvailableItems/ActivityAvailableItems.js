import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {View, Text} from 'react-native';
import {storePageLabels} from '../../constants/labels';

const ActivityAvailableItems = ({style, fontStyle}) => {
  const {
    availableItemsData: {availableItems, loading},
  } = useSelector(state => state, shallowEqual);

  if (loading) {
    return <Loading isLoading />;
  }

  return (
    <View style={style}>
      {availableItems.map((recording, index) => (
        <Text style={fontStyle} key={`latest-available-item-${index + 1}`}>
          {index + 1}: {recording.filter(rec => rec && rec !== '').join(', ')}
        </Text>
      ))}
      {availableItems.length === 0 && (
        <Text style={fontStyle}>{storePageLabels.NO_ITEMS(false)}</Text>
      )}
    </View>
  );
};

export default ActivityAvailableItems;
