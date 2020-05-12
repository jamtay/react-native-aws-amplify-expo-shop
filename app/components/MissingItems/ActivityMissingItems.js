import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import Loading from '../shared/Loading';
import {Content, Text} from 'native-base';

const ActivityMissingItems = () => {
  const {
    missingItemsData: {missingItems, loading},
  } = useSelector(state => state, shallowEqual);

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
