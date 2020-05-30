import {combineReducers} from 'redux';
import searchReducer from '../components/Search/reducers';
import favouritesReducer from '../components/Favourites/reducer';
import queueTimeReducer from '../components/QueueTime/reducer';
import createItemsReducer from '../components/Items/reducer';
import {ITEM_TYPES} from '../components/Items/constants';

const reducers = combineReducers({
  storesSearch: searchReducer,
  favouritesData: favouritesReducer,
  qTimesData: queueTimeReducer,
  missingItemsData: createItemsReducer(ITEM_TYPES.MISSING),
  availableItemsData: createItemsReducer(ITEM_TYPES.AVAILABLE),
});

export default reducers;
