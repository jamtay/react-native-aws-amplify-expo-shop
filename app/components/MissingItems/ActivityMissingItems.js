import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {Content, Text, Toast} from 'native-base';

const ActivityMissingItems = () => {
  const {
    missingItemsData: {missingItems, loading, error, additionSuccess},
  } = useSelector(state => state, shallowEqual);

  if (error) {
    Toast.show({
      text: error.message,
      buttonText: 'Okay',
      type: 'error',
      duration: 2000,
    });
  }

  if (additionSuccess && !error && missingItems && missingItems.length > 0) {
    Toast.show({
      text: `Queue time of ${missingItems[0]} added`,
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
      {missingItems.map((recording, index) => (
        <Text key={`lastest-missing-item-${index + 1}`}>
          Most recent missing item list {index + 1}: {recording}
        </Text>
      ))}
    </Content>
  );
};

export default ActivityMissingItems;
