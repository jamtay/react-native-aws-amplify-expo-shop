import React from 'react';

import FavouritesIcon from '../Favourites/FavouritesIcon';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useIsFavHook} from '../Favourites/isFavHook';
import {getImageFromStoreName} from '../Favourites/utils';
import {filterNull, removeTrailingComma} from './stringFormatter';
import {isAndroidOS} from '../../config/platform';
import {PAGE_NAMES} from '../../screens/pageNames';
import {BUTTONS} from '../../styles/button';

/**
 * A result to display search results for
 * @param width The width of the screen
 * @param item The item to display
 * @param topStyle
 * @param isLarge Is the button standard or large. Defaults to standard size
 * @param isFavouriteCard Is this result to be displayed as a favourite
 */
const Result = ({
  width,
  item,
  topStyle = -16,
  isLarge = false,
  isFavouriteCard = false,
}) => {
  const isAndroid = isAndroidOS();

  // Workout the height based on if it is android, a large card or a favourite card
  const height = isLarge
    ? width - 175
    : isAndroid && isFavouriteCard
    ? width / 2 - 20
    : width / 2 - 75;

  const styles = StyleSheet.create({
    container: {
      width: isLarge ? width - 50 : width / 2 - 30,
      height: height,
      borderWidth: 0,
      marginTop: isLarge ? 0 : 20,
      paddingBottom: isLarge || !isAndroid || !isFavouriteCard ? undefined : 50,
      paddingTop: isLarge || !isAndroid || !isFavouriteCard ? undefined : 20,
      marginBottom: isLarge ? 40 : undefined,
      marginLeft: isLarge ? 12 : undefined,
      zIndex: 9999,
    },
    textWrapper: {
      flex: 1,
      marginTop: isLarge ? undefined : -20,
      paddingLeft: isLarge ? 20 : 10,
      paddingTop: isLarge ? 10 : undefined,
      alignItems: isLarge ? undefined : 'flex-start',
    },
    largeText: {
      fontSize: isLarge ? 20 : 12,
      color: '#b63838',
      marginBottom: 10,
      marginTop: isLarge ? undefined : isAndroid && isFavouriteCard ? 0 : 10,
    },
    smallText: {
      fontSize: isLarge ? 24 : 14,
      fontWeight: 'bold',
    },
    imageWrapperPadding: {
      paddingTop: isLarge ? 20 : undefined,
    },
    info: {
      width: 0,
      flexGrow: 1,
    },
    noPadding: {
      paddingTop: isAndroid && isFavouriteCard ? 0 : undefined,
    },
  });

  const isFavourite = useIsFavHook(item.id);

  const navigation = useNavigation();
  const onItemButtonPress = () => {
    navigation.navigate(PAGE_NAMES.STORE_PAGE, {
      store: item,
    });
  };

  return (
    <View style={styles.container}>
      <View style={[sharedStyles.flexedImageView, styles.noPadding]}>
        <TouchableHighlight
          onPress={onItemButtonPress}
          style={[sharedStyles.imageWrapper, styles.imageWrapperPadding]}
          activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
          underlayColor={BUTTONS.CLICK_COLOUR}>
          <Image
            style={sharedStyles.image}
            source={getImageFromStoreName(item.description)}
          />
        </TouchableHighlight>
        <FavouritesIcon
          isFavourite={isFavourite}
          displayFavouriteOption={true}
          item={item}
          topStyle={topStyle}
        />
      </View>
      <TouchableHighlight
        style={styles.textWrapper}
        onPress={onItemButtonPress}
        activeOpacity={BUTTONS.TEXT_CLICK_OPACITY}
        underlayColor={BUTTONS.CLICK_COLOUR}>
        <View>
          <Text style={styles.largeText} numberOfLines={1}>
            {filterNull(item.description)}
            {isLarge && filterNull(`, ${item.postcode}`)}
          </Text>
          <Text style={styles.smallText}>
            {filterNull(item.addressLine1)}
            {isLarge &&
              `${removeTrailingComma(
                filterNull(', ' + item.addressLine2) +
                  filterNull(', ' + item.addressLine3),
              )}`}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Result;

const sharedStyles = StyleSheet.create({
  flexedImageView: {
    flex: 2,
    paddingVertical: 20,
  },
  imageWrapper: {
    flex: 1,
    width: null,
    height: null,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
