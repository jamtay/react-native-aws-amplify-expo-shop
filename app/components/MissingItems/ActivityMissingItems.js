import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {View, Text} from 'react-native';

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
          {index + 1}. {recording.join(', ')}
        </Text>
      ))}
    </View>
  );
};

export default ActivityMissingItems;
