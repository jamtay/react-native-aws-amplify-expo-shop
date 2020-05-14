import React from 'react';
import {Icon, Button} from 'native-base';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateFavourite} from './actions';

/**
 * Get the favourites icon from the supplied boolean parameters
 * @param {bool} displayFavouriteOption Whether or not to display the favourite icon
 * @param {bool} isFavourite Whether or not to display the already favourited icon or the not already favourite icon
 * @param {*} item The item being displayed
 */
const FavouritesIcon = ({displayFavouriteOption, isFavourite, item}) => {
  if (!displayFavouriteOption) {
    return null;
  }

  const dispatch = useDispatch();

  const AlreadyFavouriteIcon = (
    <Button
      transparent
      onPress={async () => {
        dispatch(await updateFavourite(isFavourite, item));
      }}
      style={styles.topRightIcon}>
      <Icon name="heart-multiple" type="MaterialCommunityIcons" />
    </Button>
  );
  const NotAlreadyFavouriteIcon = (
    <Button
      transparent
      onPress={async () => {
        dispatch(await updateFavourite(isFavourite, item));
      }}
      style={styles.topRightIcon}>
      <Icon name="heart-multiple-outline" type="MaterialCommunityIcons" />
    </Button>
  );
  return isFavourite ? AlreadyFavouriteIcon : NotAlreadyFavouriteIcon;
};

const styles = StyleSheet.create({
  topRightIcon: {
    position: 'absolute',
    top: 0,
    right: -10,
  },
});

export default FavouritesIcon;
