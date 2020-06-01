/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
      id
      name
      description
      fullAddress
      addressLine1
      addressLine2
      addressLine3
      postcode
      county
      country
      longitude
      latitude
      recordings {
        items {
          id
          type
          storeID
          queueTime
          missingItems
          availableItems
          floatTimestamp
        }
        nextToken
      }
      itemsRecorded
    }
  }
`;
export const listStores = /* GraphQL */ `
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        fullAddress
        addressLine1
        addressLine2
        addressLine3
        postcode
        county
        country
        longitude
        latitude
        recordings {
          nextToken
        }
        itemsRecorded
      }
      nextToken
    }
  }
`;
export const getRecording = /* GraphQL */ `
  query GetRecording($id: ID!) {
    getRecording(id: $id) {
      id
      type
      storeID
      store {
        id
        name
        description
        fullAddress
        addressLine1
        addressLine2
        addressLine3
        postcode
        county
        country
        longitude
        latitude
        recordings {
          nextToken
        }
        itemsRecorded
      }
      queueTime
      missingItems
      availableItems
      floatTimestamp
    }
  }
`;
export const listRecordings = /* GraphQL */ `
  query ListRecordings(
    $filter: ModelRecordingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        storeID
        store {
          id
          name
          description
          fullAddress
          addressLine1
          addressLine2
          addressLine3
          postcode
          county
          country
          longitude
          latitude
          itemsRecorded
        }
        queueTime
        missingItems
        availableItems
        floatTimestamp
      }
      nextToken
    }
  }
`;
export const searchStores = /* GraphQL */ `
  query SearchStores(
    $filter: SearchableStoreFilterInput
    $sort: SearchableStoreSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchStores(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        fullAddress
        addressLine1
        addressLine2
        addressLine3
        postcode
        county
        country
        longitude
        latitude
        recordings {
          nextToken
        }
        itemsRecorded
      }
      nextToken
      total
    }
  }
`;
export const searchRecordings = /* GraphQL */ `
  query SearchRecordings(
    $filter: SearchableRecordingFilterInput
    $sort: SearchableRecordingSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchRecordings(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        storeID
        store {
          id
          name
          description
          fullAddress
          addressLine1
          addressLine2
          addressLine3
          postcode
          county
          country
          longitude
          latitude
          itemsRecorded
        }
        queueTime
        missingItems
        availableItems
        floatTimestamp
      }
      nextToken
      total
    }
  }
`;
