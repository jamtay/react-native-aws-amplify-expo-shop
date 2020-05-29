import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {getImageFromStoreName} from '../Favourites/utils';
import FavouritesIcon from '../Favourites/FavouritesIcon';
import {useIsFavHook} from '../Favourites/isFavHook';
import {useNavigation} from '@react-navigation/native';
import {PAGE_NAMES} from '../../screens/pageNames';
import {BUTTONS} from '../../styles/button';

/**
 * A result to display search results for
 * @param width The width of the screen
 * @param item The item to display
 * @param topStyle
 * @param isLarge Is the button standard or large. Defaults to standard size
 */
const Result = ({width, item, topStyle = -16, isLarge = false}) => {
  const styles = StyleSheet.create({
    container: {
      width: isLarge ? width - 50 : width / 2 - 30,
      height: isLarge ? width - 175 : width / 2 - 50,
      borderWidth: 0.5,
      borderColor: '#dddddd',
      marginTop: isLarge ? 0 : 20,
      marginBottom: isLarge ? 40 : undefined,
      marginLeft: isLarge ? 12 : undefined,
    },
    textWrapper: {
      flex: 1,
      paddingLeft: isLarge ? 20 : 10,
      paddingTop: isLarge ? 10 : undefined,
      alignItems: isLarge ? undefined : 'flex-start',
    },
    largeText: {
      fontSize: isLarge ? 20 : 12,
      color: '#b63838',
      marginBottom: 10,
      marginTop: isLarge ? undefined : 10,
    },
    smallText: {
      fontSize: isLarge ? 24 : 14,
      fontWeight: 'bold',
    },
    imageWrapperPadding: {
      paddingTop: isLarge ? 20 : undefined,
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
      <View style={sharedStyles.flexedImageView}>
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
          <Text style={styles.largeText}>
            {item.description}
            {isLarge && `, ${item.postcode}`}
          </Text>
          <Text style={styles.smallText}>
            {item.addressLine1}
            {isLarge && `, ${item.addressLine2}, ${item.county}`}
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
