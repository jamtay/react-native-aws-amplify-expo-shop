import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {View, Text} from 'react-native';

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
        <Text style={fontStyle} key={`lastest-available-item-${index + 1}`}>
          {index + 1}: {recording.join(', ')}
        </Text>
      ))}
    </View>
  );
};

export default ActivityAvailableItems;
