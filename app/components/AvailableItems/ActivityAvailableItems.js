import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {Content, Text, Toast} from 'native-base';

const ActivityAvailableItems = () => {
  const {
    availableItemsData: {availableItems, loading, error, additionSuccess},
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
    availableItems &&
    availableItems.length > 0
  ) {
    Toast.show({
      text: `Queue time of ${availableItems[0]} added`,
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
      {availableItems.map((recording, index) => (
        <Text key={`lastest-available-item-${index + 1}`}>
          Most recent available item list {index + 1}: {recording}
        </Text>
      ))}
    </Content>
  );
};

export default ActivityAvailableItems;
