import {API, graphqlOperation} from 'aws-amplify';
import {LIMIT_OPTION, DEFAULT_SORT_OPTION} from '../constants/searchConstants';
// searchStores is only available when @searchable/elasticsearch is deployed. Add @searchable to Store in schema.graphql
// type Store @model @searchable{}
// Then run `amplify push` and `npm run env:development` before running the app
import {searchStores, listStores} from '../../src/graphql/queries';

export default class SearchService {
  /**
   * If using a mock api the list endpoint will be called instead of search (to save elastic search costs)
   * @param {*} isUsingMock Whether using a mock api or not
   */
  constructor(isUsingMock) {
    this.isUsingMock = isUsingMock;
  }

  /**
   * A private function (represented by #) for searching stores (Used when elastic search is running)
   * Because of ES cost can run a mock api and just use list instead of search
   * NOTE: The eslint warnings can be ignored here about private class methods
   * @param {*} filterOptions Options used to filter the response by
   * @returns The filtered list of stores
   */
  async #searchStores(filterOptions) {
    const storesData = await API.graphql(
      graphqlOperation(searchStores, {
        filter: filterOptions.filter,
        limit: LIMIT_OPTION.limit,
        sort: DEFAULT_SORT_OPTION.sort,
      }),
    );
    return storesData.data.searchStores.items;
  }

  /**
   * A call to list endpoint for when search is not deployed
   * @returns A simple list of stores fetched from dynamoDB via the list endpoint
   */
  async #listStores() {
    const storesData = await API.graphql(
      graphqlOperation(listStores, {
        limit: LIMIT_OPTION.limit,
      }),
    );
    return storesData.data.listStores.items;
  }

  /**
   * Fetches stores from the backend
   * @param {*} filterOptions Options used to filter the response by, if isUsingMock is false
   * @returns A list of stores either from ElasticSearch or DynamoDB (Depending on if isUsingMock/Elastic search is deployed)
   */
  async fetchStores(filterOptions) {
    return this.isUsingMock
      ? this.#listStores()
      : this.#searchStores(filterOptions);
  }
}
