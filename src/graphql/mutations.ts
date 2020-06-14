/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
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
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
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
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
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
export const createRecording = /* GraphQL */ `
  mutation CreateRecording(
    $input: CreateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    createRecording(input: $input, condition: $condition) {
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
export const updateRecording = /* GraphQL */ `
  mutation UpdateRecording(
    $input: UpdateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    updateRecording(input: $input, condition: $condition) {
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
export const deleteRecording = /* GraphQL */ `
  mutation DeleteRecording(
    $input: DeleteRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    deleteRecording(input: $input, condition: $condition) {
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
