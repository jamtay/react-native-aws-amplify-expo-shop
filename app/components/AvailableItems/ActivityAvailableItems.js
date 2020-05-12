import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {Content, Text} from 'native-base';

const ActivityAvailableItems = () => {
  const {
    availableItemsData: {availableItems, loading},
  } = useSelector(state => state, shallowEqual);

  if (loading) {
    return <Loading isLoading />;
  }

  return (
    <Content>
      {availableItems.map((recording, index) => (
        <Text key={`lastest-available-item-${index + 1}`}>
          Most recent available item list {index + 1}: {recording}
        </Text>
      ))}
    </Content>
  );
};

export default ActivityAvailableItems;
