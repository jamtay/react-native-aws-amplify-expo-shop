import {useSelector} from 'react-redux';
import {useIsFavHook} from '../isFavHook';
import {getFavouriteIds, isAlreadyFavourite} from '../utils';

jest.mock('../utils');
const mockGetFavouriteIds = getFavouriteIds;
const mockIsAlreadyFavourite = isAlreadyFavourite;

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const mockAppState = {
  favouritesData: {
    favourites: [
      {
        id: 'test',
      },
    ],
  },
};

describe('useIsFavHook() unit tests', () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback(mockAppState);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if the item is already a favourite using utils helper functions', () => {
    const dataId = '1';
    const favouriteIds = [dataId, '2'];
    mockGetFavouriteIds.mockImplementation(() => favouriteIds);
    mockIsAlreadyFavourite.mockImplementation(() => true);

    const response = useIsFavHook(dataId);
    expect(mockGetFavouriteIds).toBeCalledTimes(1);
    expect(mockGetFavouriteIds).toBeCalledWith(
      mockAppState.favouritesData.favourites,
    );
    expect(mockIsAlreadyFavourite).toBeCalledTimes(1);
    expect(mockIsAlreadyFavourite).toBeCalledWith(dataId, favouriteIds);
    expect(response).toEqual(true);
  });
});
