import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FavouritesIcon from './FavouritesIcon';
import { getImageFromStoreName } from './utils';

const FavouritesCard = ({width, description, location, item}) => {
  return (
    <View style={styles(width).container}>
      <View style={styles(width).flexedImageView}>
        <Image
          style={styles(width).image}
          source={getImageFromStoreName(description)}
        />
        <FavouritesIcon
          isFavourite={true}
          displayFavouriteOption={true}
          item={item}
          topStyle={-32}
        />
      </View>
      <View style={styles(width).textWrapper}>
        <Text style={styles(width).largeText}>{description}</Text>
        <Text style={styles(width).smallText}>{location}</Text>
      </View>
    </View>
  );
};
export default FavouritesCard;

const styles = width =>
  StyleSheet.create({
    container: {
      width: width / 2 - 30,
      height: width / 2 - 50,
      borderWidth: 0.5,
      borderColor: '#dddddd',
      marginTop: 20,
      marginHorizontal: 5,
      paddingHorizontal: 10,
    },
    standardFlex: {
      flex: 1,
    },
    flexedImageView: {
      flex: 0.5,
    },
    image: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain',
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
