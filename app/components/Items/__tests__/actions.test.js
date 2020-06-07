import {addItems} from '../actions';
import {ITEM_TYPES} from '../constants';
import {getIsUsingMock} from '../../../config/getConfigVals';

jest.mock('../../../service/ItemRecording');
jest.mock('../../../config/getConfigVals');
const mockGetIsUsingMock = getIsUsingMock;

describe('addItems redux action test', () => {
  const mockAddItemsForStore = jest.fn();

  beforeEach(() => {
    mockGetIsUsingMock.mockImplementation(() => true)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch error if no items are supplied', async () => {
    const returnedReduxThunk = addItems('id', [], ITEM_TYPES.MISSING);
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);
    expect(mockDispatch).toBeCalledTimes(1);
  });

  // it('should dispatch success for missing items if missing items are supplied', () => {
  //   const response = undefined;
  //   mockAddItemsForStore.mockImplementation(() => response);
  // });

  it('should dispatch success for available items if available items are supplied', () => {});

  it('should dispatch failure if an error occurs from adding the items', () => {});
});
