import {
  FAVOURITES_ACTION_TYPES,
  getFavourites,
  updateFavourite,
} from '../actions';
import {
  getFavouriteData,
  addFavourite,
  removeFavourite,
} from '../../../service/localStorage';

jest.mock('../../../service/localStorage');
const mockGetFavouriteData = getFavouriteData;
const mockAddFavourite = addFavourite;
const mockRemoveFavourite = removeFavourite;

const favourites = [{favourite: 'isFavourite'}];

describe('getFavourites() redux action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch the getting favourites action before completing getting favourites', async () => {
    mockGetFavouriteData.mockImplementation(() => favourites);
    const returnedReduxThunk = getFavourites();
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_STARTED,
    });
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_SUCCESS,
      payload: favourites,
    });
  });

  it('should dispatch the getting favourites action before handling an error if an error occurred', async () => {
    const error = new Error('some error');
    mockGetFavouriteData.mockImplementation(() => throw error);
    const returnedReduxThunk = getFavourites();
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_STARTED,
    });
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_ERROR,
      payload: error,
    });
  });
});

describe('updateFavourite() redux action', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const item = {
    id: 'some id',
    other: 'other',
  };

  it('should add favourite if the item is not already a favourite', async () => {
    mockAddFavourite.mockImplementation(() => favourites);
    const returnedReduxThunk = updateFavourite(false, item);
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(mockRemoveFavourite).toBeCalledTimes(0);
    expect(mockAddFavourite).toBeCalledTimes(1);
    expect(mockAddFavourite).toBeCalledWith(item);
    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_STARTED,
    });
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_SUCCESS,
      payload: favourites,
    });
  });

  it('should remove favourite if the item is already a favourite', async () => {
    mockRemoveFavourite.mockImplementation(() => favourites);
    const returnedReduxThunk = updateFavourite(true, item);
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(mockAddFavourite).toBeCalledTimes(0);
    expect(mockRemoveFavourite).toBeCalledTimes(1);
    expect(mockRemoveFavourite).toBeCalledWith(item.id);
    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_STARTED,
    });
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_SUCCESS,
      payload: favourites,
    });
  });

  it('should dispatch error if an error occurs', async () => {
    const error = new Error('some error');
    mockAddFavourite.mockImplementation(() => throw error);
    const returnedReduxThunk = updateFavourite(false, item);
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(mockAddFavourite).toBeCalledTimes(1);
    expect(mockAddFavourite).toBeCalledWith(item);
    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_STARTED,
    });
    expect(mockDispatch).toBeCalledWith({
      type: FAVOURITES_ACTION_TYPES.FAVOURITES_ERROR,
      payload: error,
    });
  });
});
