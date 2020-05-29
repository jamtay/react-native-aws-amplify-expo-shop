export const headerLabels = Object.freeze({
  HEADER: 'Quevid 19',
});

export const searchLabels = Object.freeze({
  NAME: 'Search by name...',
  ADDRESS: 'Search by address...',
});

export const queueTimeLabels = Object.freeze({
  LAST_HOUR: 'Last hour:',
  TODAY: 'Today:',
  LAST_WEEK: 'Last week: ',
  MINUTES: 'minutes',
  N_A: 'n/a',
  LATEST_ENTRY: 'Latest entries:',
});

export const favouriteLabels = Object.freeze({
  FAVOURITES_SECTION_HEADER: 'Here are your favourites',
  NO_FAVOURITES:
    'You currently have no favourites. Please press the heart on a store to add to your favourites',
});

export const explorePageLabels = isStores => {
  return {
    STORE_SEARCH: 'Find a store',
    SEARCH_DESCRIPTION: 'A list of stores matching your search criteria',
    SEARCH_RESULTS: isStores
      ? 'More search results'
      : 'No search results, please enter some search criteria to find results',
  };
};

export const storePageLabels = Object.freeze({
  AVG_Q_TIME: 'Average queue times',
  WEEKS_MISSING: "This week's missing items",
  WEEKS_AVAILABLE: "This week's available items",
  NO_ITEMS: isMissing =>
    `No items have been recorded this week. Record ${
      isMissing ? 'a missing' : 'an available'
    } item for it to appear here`,
});

export const addNewRecordingModal = Object.freeze({
  SUBMIT: 'Submit',
  NEW_QUEUE_TIME: 'How many minutes did you queue for?',
  NEW_MISSING_ITEMS: 'Name an item that is missing',
  NEW_AVAILABLE_ITEMS: 'Name an item that is available',
  SUCCESS_QUEUE_TIME: qTime => `You queued for ${qTime} minutes`,
  SUCCESS_ITEMS: (items, isMissing) =>
    `${isMissing ? 'Missing' : 'Available'} items added including ${items[0]}`,
});
