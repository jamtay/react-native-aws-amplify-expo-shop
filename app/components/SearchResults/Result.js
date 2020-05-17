import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getImageFromStoreName} from '../Favourites/utils';
import FavouritesIcon from '../Favourites/FavouritesIcon';
import {useIsFavHook} from '../Favourites/isFavHook';

const Result = ({
  width,
  description,
  location,
  item,
  topStyle = -20,
  isLarge = false,
}) => {
  const styles = isLarge
    ? StyleSheet.create({
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
  return (
    <View style={styles.container}>
      <View style={styles.flexedImageView}>
        <Image
          style={styles.image}
          source={getImageFromStoreName(description)}
        />
        <FavouritesIcon
          isFavourite={isFavourite}
          displayFavouriteOption={true}
          item={item}
          topStyle={topStyle}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.largeText}>{description}</Text>
        <Text style={styles.smallText}>{location}</Text>
      </View>
    </View>
  );
};

export default Result;
