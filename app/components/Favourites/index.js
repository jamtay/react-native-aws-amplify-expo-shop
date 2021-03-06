import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import FavouritesCard from './FavouritesCard';
import SearchResults from '../SearchResults';
import {getFavourites} from './actions';
import {favouriteLabels} from '../../constants/labels';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

/**
 * A horizontal list of favourite cards, using data stored in local storage
 * @param pageWidth
 */
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
          <SearchResults>
            {favourites.map(fav => (
              <FavouritesCard
                width={pageWidth}
                item={fav}
                key={`fav-${fav.id}`}
              />
            ))}
          </SearchResults>
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
    height: 155,
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionText: {
    fontWeight: '100',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
});

export default Favourites;
