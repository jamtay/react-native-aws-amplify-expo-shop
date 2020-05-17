import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {favouriteLabels} from '../../constants/labels';
import { getImageFromStoreName } from './utils';
import {getFavourites} from './actions';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import FavouritesCard from './FavouritesCard';
import Loading from '../shared/Loading';

const Favourites = () => {
  const {
    favouritesData: {loading, favourites, error},
  } = useSelector(state => state, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return favourites.length > 0 && !error ? (
    <>
      <Text style={styles.titleText}>
        {favouriteLabels.FAVOURITES_SECTION_HEADER}
      </Text>
      <View style={styles.favouritesScrollContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {favourites.map(fav => (
            <FavouritesCard
              key={fav.id}
              imageDetails={getImageFromStoreName(fav.name)}
              name={fav.description}
              description={fav.addressLine1}
              item={fav}
            />
          ))}
        </ScrollView>
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  favouritesScrollContainer: {
    height: 130,
    marginTop: 20,
  },
});

export default Favourites;
