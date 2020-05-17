import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getImageFromStoreName} from '../Favourites/utils';
import FavouritesIcon from '../Favourites/FavouritesIcon';
import {useIsFavHook} from '../Favourites/isFavHook';

const LargeResult = ({width, description, location, item}) => {
  const isFavourite = useIsFavHook(item.id);
  return (
    <View style={styles(width).container}>
      <View style={styles(width).flexedImageView}>
        <Image
          style={styles(width).image}
          source={getImageFromStoreName(description)}
        />
        <FavouritesIcon
          isFavourite={isFavourite}
          displayFavouriteOption={true}
          item={item}
          topStyle={-30}
        />
      </View>
      <View style={styles(width).textWrapper}>
        <Text style={styles(width).largeText}>{description}</Text>
        <Text style={styles(width).smallText}>{location}</Text>
      </View>
    </View>
  );
};

export default LargeResult;

const styles = width =>
  StyleSheet.create({
    container: {
      width: width / 2 - 50,
      height: width / 2 - 200,
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
    textWrapper: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
      paddingLeft: 30,
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
  });
