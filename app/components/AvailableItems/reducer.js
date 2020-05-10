import {AVAILABLE_ITEM_ACTION_TYPES} from './actions';

const initialState = {
  loading: false,
  availableItems: [],
  additionSuccess: false,
  error: null,
};

const availableItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case AVAILABLE_ITEM_ACTION_TYPES.ADD_AVAILABLE_ITEM_STARTED:
    case AVAILABLE_ITEM_ACTION_TYPES.GET_AVAILABLE_ITEM_STARTED:
      return {
        ...state,
        loading: true,
        additionSuccess: false,
      };
    case AVAILABLE_ITEM_ACTION_TYPES.ADD_AVAILABLE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        availableItems: [action.payload, ...state.availableItems],
        additionSuccess: true,
      };
    case AVAILABLE_ITEM_ACTION_TYPES.GET_AVAILABLE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        availableItems: action.payload.map(item => item.availableItems),
        additionSuccess: false,
      };
    case AVAILABLE_ITEM_ACTION_TYPES.ADD_AVAILABLE_ITEM_ERROR:
    case AVAILABLE_ITEM_ACTION_TYPES.GET_AVAILABLE_ITEM_ERROR:
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

export default availableItemsReducer;
