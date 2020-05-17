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
 * @param topStyle Top style property to apply
 */
const FavouritesIcon = ({
  displayFavouriteOption,
  isFavourite,
  item,
  topStyle = -15,
}) => {
  if (!displayFavouriteOption) {
    return null;
  }

  const styles = StyleSheet.create({
    topRightIcon: {
      position: 'absolute',
      top: topStyle,
      right: -10,
      zIndex: 999,
    },
  });

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

export default FavouritesIcon;
