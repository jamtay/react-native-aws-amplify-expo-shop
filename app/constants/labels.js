export const headerLabels = Object.freeze({
  HEADER: 'Quevid 19',
});

export const searchLabels = Object.freeze({
  NAME: 'Search by name...',
  ADDRESS: 'Search by address...',
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
  ACTIVITY_OVERVIEW: 'Activity overview',
  ACTIVITY_HISTORY: 'Activity history',
  ADDRESS_SUB_TITLE: 'Address',
  POSTCODE_SUB_TITLE: 'Postcode',
  AVG_Q_TIME: 'Average queue times',
  TODAY: 'Today',
  PREVIOUS_HOUR: '1hr',
  LAST_WEEK: 'This week',
  WEEKS_MISSING: 'Weeks missing items',
  WEEKS_AVAILABLE: 'Weeks available items',
});

export const addNewRecordingPageLabels = Object.freeze({
  ADD_NEW_TITLE: 'Add new recording',
  ADD_NEW_MISSING_ITEM: 'Add new missing item',
  ADD_NEW_AVAILABLE_ITEM: 'Add new available item',
  ADD_NEW_Q_TIME: 'Queue time: ',
  MISSING_ITEM: 'Missing items',
  AVAILABLE_ITEM: 'Available items',
});
