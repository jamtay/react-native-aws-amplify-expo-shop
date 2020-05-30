import {ITEM_ACTION_TYPES} from './actions';
import {ITEM_TYPES} from './constants';

/**
 * Create the initial state for either missing or available items reducer
 * @param type The type of items ("missing" or "available")
 */
const initialState = type => {
  return {
    loading: false,
    availableItems: type === ITEM_TYPES.AVAILABLE ? [] : undefined,
    missingItems: type === ITEM_TYPES.MISSING ? [] : undefined,
    additionSuccess: false,
    error: null,
  };
};

/**
 * An items reducer that can be used for either "missing" or "available" items
 * @param type The type of items ("missing" or "available") to create the reducer for
 */
const createItemsReducer = type => {
  /**
   * An items reducer that can be used for either "missing" or "available" items
   * @param state
   * @param action
   * @param type The type of items ("missing" or "available")
   */
  return (state = initialState(type), action) => {
    switch (action.type) {
      case ITEM_ACTION_TYPES.ITEM_ACTION_STARTED(type):
        return {
          ...state,
          loading: true,
          additionSuccess: false,
        };
      case ITEM_ACTION_TYPES.ADD_ITEM_SUCCESS(type):
        return {
          ...state,
          loading: false,
          error: null,
          availableItems:
            type === ITEM_TYPES.AVAILABLE
              ? [action.payload, ...state.availableItems]
              : undefined,
          missingItems:
            type === ITEM_TYPES.MISSING
              ? [action.payload, ...state.missingItems]
              : undefined,
          additionSuccess: true,
        };
      case ITEM_ACTION_TYPES.GET_ITEM_SUCCESS(type):
        return {
          ...state,
          loading: false,
          error: null,
          availableItems:
            type === ITEM_TYPES.AVAILABLE
              ? action.payload.map(item => item.availableItems)
              : undefined,
          missingItems:
            type === ITEM_TYPES.MISSING
              ? action.payload.map(item => item.missingItems)
              : undefined,
          additionSuccess: false,
        };
      case ITEM_ACTION_TYPES.ITEM_ACTION_ERROR(type):
        return {
          ...state,
          loading: false,
          additionSuccess: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
};

export default createItemsReducer;
