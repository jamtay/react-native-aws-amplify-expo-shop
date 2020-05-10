import {combineReducers} from 'redux';
import searchReducer from '../components/Search/reducers';
import favouritesReducer from '../components/Favourites/reducer';
import queueTimeReducer from '../components/QueueTime/reducer';
import missingItemsReducer from '../components/MissingItems/reducer';
import availableItemsReducer from '../components/AvailableItems/reducer';

const reducers = combineReducers({
  storesSearch: searchReducer,
  favouritesData: favouritesReducer,
  qTimesData: queueTimeReducer,
  missingItemsData: missingItemsReducer,
  availableItemsData: availableItemsReducer,
});

export default reducers;
