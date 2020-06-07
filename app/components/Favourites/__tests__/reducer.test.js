import favouritesReducer from '../reducer';
import {FAVOURITES_ACTION_TYPES} from '../actions';

describe('favouritesReducer unit tests', () => {
  it('should set loading to true for FAVOURITES_STARTED action type', () => {
    const newState = favouritesReducer(
      {
        loading: false,
      },
      {
        type: FAVOURITES_ACTION_TYPES.FAVOURITES_STARTED,
      },
    );
    expect(newState).toEqual({
      loading: true,
    });
  });

  it('should set loading to false, error to null and update the favourites for FAVOURITES_SUCCESS action type', () => {
    const favourites = [{id: '1'}, {id: '2'}];
    const newState = favouritesReducer(
      {
        loading: true,
        error: new Error('some error'),
        favourites: [{id: 'some other'}],
      },
      {
        type: FAVOURITES_ACTION_TYPES.FAVOURITES_SUCCESS,
        payload: favourites,
      },
    );
    expect(newState).toEqual({
      loading: false,
      error: null,
      favourites: favourites,
    });
  });

  it('should remove all favourites for REMOVE_ALL_FAVOURITES action type', () => {
    const newState = favouritesReducer(
      {
        loading: true,
        error: new Error('some error'),
        favourites: [{id: 'some other'}],
      },
      {
        type: FAVOURITES_ACTION_TYPES.REMOVE_ALL_FAVOURITES,
      },
    );
    expect(newState).toEqual({
      loading: false,
      error: null,
      favourites: [],
    });
  });

  it('should set error for FAVOURITES_ERROR action type', () => {
    const error = new Error('some error');
    const newState = favouritesReducer(
      {
        loading: true,
        error: null,
      },
      {
        type: FAVOURITES_ACTION_TYPES.FAVOURITES_ERROR,
        payload: error,
      },
    );
    expect(newState).toEqual({
      loading: false,
      error: error,
    });
  });
});
