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
 * @returns {*}
 * @constructor
 */
const Result = ({width, item, topStyle = -20, isLarge = false}) => {
  const styles = isLarge
    ? StyleSheet.create({
        container: {
          width: width - 50,
          height: width - 200,
          borderWidth: 0.5,
          borderColor: '#dddddd',
          marginTop: 0,
          marginBottom: 20,
          marginLeft: 12,
        },
        standardFlex: {
          flex: 1,
        },
        flexedImageView: {
          flex: 2,
        },
        image: {
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'contain',
        },
        imageWrapper: {
          flex: 1,
          width: null,
          height: null,
        },
        textWrapper: {
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'space-evenly',
          paddingLeft: 20,
        },
        largeText: {
          fontSize: 20,
          color: '#b63838',
          marginBottom: 0,
        },
        smallText: {
          fontSize: 24,
          fontWeight: 'bold',
        },
      })
    : StyleSheet.create({
        container: {
          width: width / 2 - 30,
          height: width / 2 - 50,
          borderWidth: 0.5,
          borderColor: '#dddddd',
          marginTop: 20,
        },
        standardFlex: {
          flex: 1,
        },
        flexedImageView: {
          flex: 2,
        },
        image: {
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'contain',
        },
        imageWrapper: {
          flex: 1,
          width: null,
          height: null,
        },
        textWrapper: {
          flex: 1,
          alignItems: 'flex-start',
          paddingLeft: 10,
        },
        largeText: {
          fontSize: 12,
          color: '#b63838',
          marginBottom: 10,
          marginTop: 10,
        },
        smallText: {
          fontSize: 14,
          fontWeight: 'bold',
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
      <View style={styles.flexedImageView}>
        <TouchableHighlight
          onPress={onItemButtonPress}
          style={styles.imageWrapper}
          activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
          underlayColor={BUTTONS.CLICK_COLOUR}>
          <Image
            style={styles.image}
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
          <Text style={styles.largeText}>{item.description}</Text>
          <Text style={styles.smallText}>{item.addressLine1}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Result;
