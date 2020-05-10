export const RECORDING_TYPES = {
  QUEUE_TIME: 'QUEUE_TIME',
  MISSING_ITEMS: 'MISSING_ITEMS',
  AVAILABLE_ITEMS: 'AVAILABLE_ITEMS',
};

//schema.graphql does have an enum type which works for lists and create. But not for @searchable - https://github.com/aws-amplify/amplify-cli/issues/3248
// enum RecordingType {
//     QUEUE_TIME
//     MISSING_ITEMS
//     AVAILABLE_ITEMS
//   }

export const DEFAULT_SORT_OPTION = Object.freeze({
  sort: {
    field: 'floatTimestamp',
    direction: 'desc',
  },
});

export const MAXIMUM_ITEM_COUNT = 5;
