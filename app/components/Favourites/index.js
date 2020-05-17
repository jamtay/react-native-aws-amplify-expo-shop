import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {favouriteLabels} from '../../constants/labels';
import {getFavourites} from './actions';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import FavouritesCard from './FavouritesCard';
import Result from '../SearchResults/Result';

const Favourites = ({pageWidth}) => {
  const {
    favouritesData: {loading, favourites, error},
  } = useSelector(state => state, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  return favourites.length > 0 && !error ? (
    <>
      <Text style={styles.titleText}>
        {favouriteLabels.FAVOURITES_SECTION_HEADER}
      </Text>
      <View style={styles.favouritesScrollContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {favourites.map(fav => (
            <FavouritesCard
              width={pageWidth}
              description={fav.description}
              location={fav.addressLine1}
              item={fav}
              key={`fav-${fav.id}`}
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
