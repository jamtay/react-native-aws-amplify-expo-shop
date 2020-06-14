/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStoreInput = {
  id?: string | null,
  name: string,
  description: string,
  fullAddress: string,
  addressLine1: string,
  addressLine2?: string | null,
  addressLine3?: string | null,
  postcode: string,
  county?: string | null,
  country: string,
  longitude?: string | null,
  latitude?: string | null,
  itemsRecorded?: Array< string > | null,
};

export type ModelStoreConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  fullAddress?: ModelStringInput | null,
  addressLine1?: ModelStringInput | null,
  addressLine2?: ModelStringInput | null,
  addressLine3?: ModelStringInput | null,
  postcode?: ModelStringInput | null,
  county?: ModelStringInput | null,
  country?: ModelStringInput | null,
  longitude?: ModelStringInput | null,
  latitude?: ModelStringInput | null,
  itemsRecorded?: ModelStringInput | null,
  and?: Array< ModelStoreConditionInput | null > | null,
  or?: Array< ModelStoreConditionInput | null > | null,
  not?: ModelStoreConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateStoreInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  fullAddress?: string | null,
  addressLine1?: string | null,
  addressLine2?: string | null,
  addressLine3?: string | null,
  postcode?: string | null,
  county?: string | null,
  country?: string | null,
  longitude?: string | null,
  latitude?: string | null,
  itemsRecorded?: Array< string > | null,
};

export type DeleteStoreInput = {
  id?: string | null,
};

export type CreateRecordingInput = {
  id?: string | null,
  type: string,
  storeID: string,
  queueTime?: number | null,
  missingItems?: Array< string > | null,
  availableItems?: Array< string > | null,
  floatTimestamp: number,
};

export type ModelRecordingConditionInput = {
  type?: ModelStringInput | null,
  storeID?: ModelStringInput | null,
  queueTime?: ModelFloatInput | null,
  missingItems?: ModelStringInput | null,
  availableItems?: ModelStringInput | null,
  floatTimestamp?: ModelFloatInput | null,
  and?: Array< ModelRecordingConditionInput | null > | null,
  or?: Array< ModelRecordingConditionInput | null > | null,
  not?: ModelRecordingConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateRecordingInput = {
  id: string,
  type?: string | null,
  storeID?: string | null,
  queueTime?: number | null,
  missingItems?: Array< string > | null,
  availableItems?: Array< string > | null,
  floatTimestamp?: number | null,
};

export type DeleteRecordingInput = {
  id?: string | null,
};

export type ModelStoreFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  fullAddress?: ModelStringInput | null,
  addressLine1?: ModelStringInput | null,
  addressLine2?: ModelStringInput | null,
  addressLine3?: ModelStringInput | null,
  postcode?: ModelStringInput | null,
  county?: ModelStringInput | null,
  country?: ModelStringInput | null,
  longitude?: ModelStringInput | null,
  latitude?: ModelStringInput | null,
  itemsRecorded?: ModelStringInput | null,
  and?: Array< ModelStoreFilterInput | null > | null,
  or?: Array< ModelStoreFilterInput | null > | null,
  not?: ModelStoreFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRecordingFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  storeID?: ModelStringInput | null,
  queueTime?: ModelFloatInput | null,
  missingItems?: ModelStringInput | null,
  availableItems?: ModelStringInput | null,
  floatTimestamp?: ModelFloatInput | null,
  and?: Array< ModelRecordingFilterInput | null > | null,
  or?: Array< ModelRecordingFilterInput | null > | null,
  not?: ModelRecordingFilterInput | null,
};

export type CreateStoreMutationVariables = {
  input: CreateStoreInput,
  condition?: ModelStoreConditionInput | null,
};

export type CreateStoreMutation = {
  createStore:  {
    __typename: "Store",
    id: string,
    name: string,
    description: string,
    fullAddress: string,
    addressLine1: string,
    addressLine2: string | null,
    addressLine3: string | null,
    postcode: string,
    county: string | null,
    country: string,
    longitude: string | null,
    latitude: string | null,
    recordings:  {
      __typename: "ModelRecordingConnection",
      items:  Array< {
        __typename: "Recording",
        id: string,
        type: string,
        storeID: string,
        queueTime: number | null,
        missingItems: Array< string > | null,
        availableItems: Array< string > | null,
        floatTimestamp: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    itemsRecorded: Array< string > | null,
  } | null,
};

export type UpdateStoreMutationVariables = {
  input: UpdateStoreInput,
  condition?: ModelStoreConditionInput | null,
};

export type UpdateStoreMutation = {
  updateStore:  {
    __typename: "Store",
    id: string,
    name: string,
    description: string,
    fullAddress: string,
    addressLine1: string,
    addressLine2: string | null,
    addressLine3: string | null,
    postcode: string,
    county: string | null,
    country: string,
    longitude: string | null,
    latitude: string | null,
    recordings:  {
      __typename: "ModelRecordingConnection",
      items:  Array< {
        __typename: "Recording",
        id: string,
        type: string,
        storeID: string,
        queueTime: number | null,
        missingItems: Array< string > | null,
        availableItems: Array< string > | null,
        floatTimestamp: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    itemsRecorded: Array< string > | null,
  } | null,
};

export type DeleteStoreMutationVariables = {
  input: DeleteStoreInput,
  condition?: ModelStoreConditionInput | null,
};

export type DeleteStoreMutation = {
  deleteStore:  {
    __typename: "Store",
    id: string,
    name: string,
    description: string,
    fullAddress: string,
    addressLine1: string,
    addressLine2: string | null,
    addressLine3: string | null,
    postcode: string,
    county: string | null,
    country: string,
    longitude: string | null,
    latitude: string | null,
    recordings:  {
      __typename: "ModelRecordingConnection",
      items:  Array< {
        __typename: "Recording",
        id: string,
        type: string,
        storeID: string,
        queueTime: number | null,
        missingItems: Array< string > | null,
        availableItems: Array< string > | null,
        floatTimestamp: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    itemsRecorded: Array< string > | null,
  } | null,
};

export type CreateRecordingMutationVariables = {
  input: CreateRecordingInput,
  condition?: ModelRecordingConditionInput | null,
};

export type CreateRecordingMutation = {
  createRecording:  {
    __typename: "Recording",
    id: string,
    type: string,
    storeID: string,
    store:  {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null,
    queueTime: number | null,
    missingItems: Array< string > | null,
    availableItems: Array< string > | null,
    floatTimestamp: number,
  } | null,
};

export type UpdateRecordingMutationVariables = {
  input: UpdateRecordingInput,
  condition?: ModelRecordingConditionInput | null,
};

export type UpdateRecordingMutation = {
  updateRecording:  {
    __typename: "Recording",
    id: string,
    type: string,
    storeID: string,
    store:  {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null,
    queueTime: number | null,
    missingItems: Array< string > | null,
    availableItems: Array< string > | null,
    floatTimestamp: number,
  } | null,
};

export type DeleteRecordingMutationVariables = {
  input: DeleteRecordingInput,
  condition?: ModelRecordingConditionInput | null,
};

export type DeleteRecordingMutation = {
  deleteRecording:  {
    __typename: "Recording",
    id: string,
    type: string,
    storeID: string,
    store:  {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null,
    queueTime: number | null,
    missingItems: Array< string > | null,
    availableItems: Array< string > | null,
    floatTimestamp: number,
  } | null,
};

export type GetStoreQueryVariables = {
  id: string,
};

export type GetStoreQuery = {
  getStore:  {
    __typename: "Store",
    id: string,
    name: string,
    description: string,
    fullAddress: string,
    addressLine1: string,
    addressLine2: string | null,
    addressLine3: string | null,
    postcode: string,
    county: string | null,
    country: string,
    longitude: string | null,
    latitude: string | null,
    recordings:  {
      __typename: "ModelRecordingConnection",
      items:  Array< {
        __typename: "Recording",
        id: string,
        type: string,
        storeID: string,
        queueTime: number | null,
        missingItems: Array< string > | null,
        availableItems: Array< string > | null,
        floatTimestamp: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    itemsRecorded: Array< string > | null,
  } | null,
};

export type ListStoresQueryVariables = {
  filter?: ModelStoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStoresQuery = {
  listStores:  {
    __typename: "ModelStoreConnection",
    items:  Array< {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetRecordingQueryVariables = {
  id: string,
};

export type GetRecordingQuery = {
  getRecording:  {
    __typename: "Recording",
    id: string,
    type: string,
    storeID: string,
    store:  {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null,
    queueTime: number | null,
    missingItems: Array< string > | null,
    availableItems: Array< string > | null,
    floatTimestamp: number,
  } | null,
};

export type ListRecordingsQueryVariables = {
  filter?: ModelRecordingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecordingsQuery = {
  listRecordings:  {
    __typename: "ModelRecordingConnection",
    items:  Array< {
      __typename: "Recording",
      id: string,
      type: string,
      storeID: string,
      store:  {
        __typename: "Store",
        id: string,
        name: string,
        description: string,
        fullAddress: string,
        addressLine1: string,
        addressLine2: string | null,
        addressLine3: string | null,
        postcode: string,
        county: string | null,
        country: string,
        longitude: string | null,
        latitude: string | null,
        itemsRecorded: Array< string > | null,
      } | null,
      queueTime: number | null,
      missingItems: Array< string > | null,
      availableItems: Array< string > | null,
      floatTimestamp: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateStoreSubscription = {
  onCreateStore:  {
    __typename: "Store",
    id: string,
    name: string,
    description: string,
    fullAddress: string,
    addressLine1: string,
    addressLine2: string | null,
    addressLine3: string | null,
    postcode: string,
    county: string | null,
    country: string,
    longitude: string | null,
    latitude: string | null,
    recordings:  {
      __typename: "ModelRecordingConnection",
      items:  Array< {
        __typename: "Recording",
        id: string,
        type: string,
        storeID: string,
        queueTime: number | null,
        missingItems: Array< string > | null,
        availableItems: Array< string > | null,
        floatTimestamp: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    itemsRecorded: Array< string > | null,
  } | null,
};

export type OnUpdateStoreSubscription = {
  onUpdateStore:  {
    __typename: "Store",
    id: string,
    name: string,
    description: string,
    fullAddress: string,
    addressLine1: string,
    addressLine2: string | null,
    addressLine3: string | null,
    postcode: string,
    county: string | null,
    country: string,
    longitude: string | null,
    latitude: string | null,
    recordings:  {
      __typename: "ModelRecordingConnection",
      items:  Array< {
        __typename: "Recording",
        id: string,
        type: string,
        storeID: string,
        queueTime: number | null,
        missingItems: Array< string > | null,
        availableItems: Array< string > | null,
        floatTimestamp: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    itemsRecorded: Array< string > | null,
  } | null,
};

export type OnDeleteStoreSubscription = {
  onDeleteStore:  {
    __typename: "Store",
    id: string,
    name: string,
    description: string,
    fullAddress: string,
    addressLine1: string,
    addressLine2: string | null,
    addressLine3: string | null,
    postcode: string,
    county: string | null,
    country: string,
    longitude: string | null,
    latitude: string | null,
    recordings:  {
      __typename: "ModelRecordingConnection",
      items:  Array< {
        __typename: "Recording",
        id: string,
        type: string,
        storeID: string,
        queueTime: number | null,
        missingItems: Array< string > | null,
        availableItems: Array< string > | null,
        floatTimestamp: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    itemsRecorded: Array< string > | null,
  } | null,
};

export type OnCreateRecordingSubscription = {
  onCreateRecording:  {
    __typename: "Recording",
    id: string,
    type: string,
    storeID: string,
    store:  {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null,
    queueTime: number | null,
    missingItems: Array< string > | null,
    availableItems: Array< string > | null,
    floatTimestamp: number,
  } | null,
};

export type OnUpdateRecordingSubscription = {
  onUpdateRecording:  {
    __typename: "Recording",
    id: string,
    type: string,
    storeID: string,
    store:  {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null,
    queueTime: number | null,
    missingItems: Array< string > | null,
    availableItems: Array< string > | null,
    floatTimestamp: number,
  } | null,
};

export type OnDeleteRecordingSubscription = {
  onDeleteRecording:  {
    __typename: "Recording",
    id: string,
    type: string,
    storeID: string,
    store:  {
      __typename: "Store",
      id: string,
      name: string,
      description: string,
      fullAddress: string,
      addressLine1: string,
      addressLine2: string | null,
      addressLine3: string | null,
      postcode: string,
      county: string | null,
      country: string,
      longitude: string | null,
      latitude: string | null,
      recordings:  {
        __typename: "ModelRecordingConnection",
        nextToken: string | null,
      } | null,
      itemsRecorded: Array< string > | null,
    } | null,
    queueTime: number | null,
    missingItems: Array< string > | null,
    availableItems: Array< string > | null,
    floatTimestamp: number,
  } | null,
};
