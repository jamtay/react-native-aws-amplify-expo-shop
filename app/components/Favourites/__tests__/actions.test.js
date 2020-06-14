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

const favourites = [{favourite: 'isFavourite'}];

describe('getFavourites() redux action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch the getting favourites action before completing getting favourites', async () => {
    getFavouriteData.mockImplementation(() => favourites);
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
    getFavouriteData.mockImplementation(() => throw error);
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
    addFavourite.mockImplementation(() => favourites);
    const returnedReduxThunk = updateFavourite(false, item);
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(removeFavourite).toBeCalledTimes(0);
    expect(addFavourite).toBeCalledTimes(1);
    expect(addFavourite).toBeCalledWith(item);
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
    removeFavourite.mockImplementation(() => favourites);
    const returnedReduxThunk = updateFavourite(true, item);
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(addFavourite).toBeCalledTimes(0);
    expect(removeFavourite).toBeCalledTimes(1);
    expect(removeFavourite).toBeCalledWith(item.id);
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
    addFavourite.mockImplementation(() => throw error);
    const returnedReduxThunk = updateFavourite(false, item);
    const mockDispatch = jest.fn();
    await returnedReduxThunk(mockDispatch);

    expect(addFavourite).toBeCalledTimes(1);
    expect(addFavourite).toBeCalledWith(item);
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
