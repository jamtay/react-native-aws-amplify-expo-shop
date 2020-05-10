import {API, graphqlOperation} from 'aws-amplify';
import {searchStores} from '../../src/graphql/queries';

import {LIMIT_OPTION, DEFAULT_SORT_OPTION} from '../constants/searchConstants';

export const fetchStores = async filterOptions => {
  const storesData = await API.graphql(
    graphqlOperation(searchStores, {
      filter: filterOptions.filter,
      limit: LIMIT_OPTION.limit,
      sort: DEFAULT_SORT_OPTION.sort,
    }),
  );
  return storesData.data.searchStores.items;
};
