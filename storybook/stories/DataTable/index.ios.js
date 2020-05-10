import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../app/components/shared/DataTable/index';
import {Content} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

export default function DataTableStory({data, favouriteStoreIds, horizontal}) {
  return (
    <NavigationContainer>
      <Content>
        <DataTable
          data={data}
          favouriteStoreIds={favouriteStoreIds}
          horizontal={horizontal}
        />
      </Content>
    </NavigationContainer>
  );
}

DataTableStory.defaultProps = {
  data: undefined,
  favouriteStoreIds: undefined,
  horizontal: undefined,
};

DataTableStory.propTypes = {
  data: PropTypes.array,
  favouriteStoreIds: PropTypes.array,
  horizontal: PropTypes.bool,
};
