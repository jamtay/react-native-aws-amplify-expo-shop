import {MISSING_ITEM_ACTION_TYPES} from './actions';

const initialState = {
  loading: false,
  missingItems: [],
  additionSuccess: false,
  error: null,
};

const missingItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MISSING_ITEM_ACTION_TYPES.ADD_MISSING_ITEM_STARTED:
    case MISSING_ITEM_ACTION_TYPES.GET_MISSING_ITEM_STARTED:
      return {
        ...state,
        loading: true,
        additionSuccess: false,
      };
    case MISSING_ITEM_ACTION_TYPES.ADD_MISSING_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        missingItems: [action.payload, ...state.missingItems],
        additionSuccess: true,
      };
    case MISSING_ITEM_ACTION_TYPES.GET_MISSING_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        missingItems: action.payload.map(item => item.missingItems),
        additionSuccess: false,
      };
    case MISSING_ITEM_ACTION_TYPES.ADD_MISSING_ITEM_ERROR:
    case MISSING_ITEM_ACTION_TYPES.GET_MISSING_ITEM_ERROR:
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

export default missingItemsReducer;
