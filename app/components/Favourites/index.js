import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Content, Title} from 'native-base';
import DataTable from '../../components/shared/DataTable';
import {favouriteLabels} from '../../constants/labels';
import {getFavouriteIds} from './utils';
import {getFavourites} from './actions';

const Favourites = () => {
  const {
    favouritesData: {loading, favourites, error},
  } = useSelector(state => state, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites());
  }, []);

  return favourites.length > 0 && (!error || error === null) ? (
    <Content style={{marginTop: 10}}>
      <Title style={{marginBottom: 10}}>
        {favouriteLabels.FAVOURITES_SECTION_HEADER}
      </Title>
      <DataTable
        data={favourites}
        favouriteStoreIds={getFavouriteIds(favourites)}
        horizontal={true}
      />
    </Content>
  ) : null;
};

export default Favourites;
