import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {favouriteLabels} from '../../constants/labels';
import {getFavourites} from './actions';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import FavouritesCard from './FavouritesCard';

const Favourites = ({pageWidth}) => {
  const {
    favouritesData: {favourites, error},
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
              item={fav}
              key={`fav-${fav.id}`}
            />
          ))}
        </ScrollView>
      </View>
    </>
  ) : (
    <View>
      <Text style={styles.titleText}>
        {favouriteLabels.FAVOURITES_SECTION_HEADER}
      </Text>
      <Text style={styles.descriptionText}>
        {favouriteLabels.NO_FAVOURITES}
      </Text>
    </View>
  );
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
    marginBottom: 20,
  },
  descriptionText: {
    fontWeight: '100',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
});

export default Favourites;
