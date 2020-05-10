/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore {
    onCreateStore {
      id
      name
      description
      fullAddress
      addressLine1
      addressLine2
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
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore {
    onUpdateStore {
      id
      name
      description
      fullAddress
      addressLine1
      addressLine2
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
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore {
    onDeleteStore {
      id
      name
      description
      fullAddress
      addressLine1
      addressLine2
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
export const onCreateRecording = /* GraphQL */ `
  subscription OnCreateRecording {
    onCreateRecording {
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
export const onUpdateRecording = /* GraphQL */ `
  subscription OnUpdateRecording {
    onUpdateRecording {
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
export const onDeleteRecording = /* GraphQL */ `
  subscription OnDeleteRecording {
    onDeleteRecording {
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
