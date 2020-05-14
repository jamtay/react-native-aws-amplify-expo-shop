import React from 'react';
import {Text} from 'native-base';
export const headerLabels = Object.freeze({
  HEADER: 'Quevid 19',
});

export const headerOptions = {
  headerTitle: props => (
    <Text style={{color: 'white', fontWeight: 'bold'}}>
      {headerLabels.HEADER}
    </Text>
  ),
  headerStyle: {
    backgroundColor: 'pink',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};

export const tableLabels = Object.freeze({
  NO_RESULTS: 'No results',
  NO_RESULTS_HINT: 'Please enter or refine your search',
});

export const searchLabels = Object.freeze({
  NAME: 'Search by name...',
  ADDRESS: 'Search by address...',
});

export const errorLabels = Object.freeze({
  MESSAGE: 'Something went wrong! Try again later',
  BUTTON_TEXT: 'Okay',
});

export const favouriteLabels = Object.freeze({
  FAVOURITES_SECTION_HEADER: 'Here are your favourites',
});

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
