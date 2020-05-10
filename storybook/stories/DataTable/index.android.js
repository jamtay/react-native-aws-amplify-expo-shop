import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../app/components/shared/DataTable/index';
import {Content} from 'native-base';

export default function DataTableStory({data, favouriteStoreIds, horizontal}) {
  return (
    <Content>
      <DataTable
        data={data}
        favouriteStoreIds={favouriteStoreIds}
        horizontal={horizontal}
      />
    </Content>
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
