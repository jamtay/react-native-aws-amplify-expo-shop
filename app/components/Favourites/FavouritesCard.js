import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FavouritesIcon from './FavouritesIcon';

const FavouritesCard = props => {
  return (
    <View style={styles.cardBorder}>
      <View style={styles.flexedImageView}>
        <Image source={props.imageUri} style={styles.image} />
        <FavouritesIcon
          isFavourite={true}
          displayFavouriteOption={true}
          item={props.item}
        />
      </View>
      <View style={styles.textBorder}>
        <Text>
          {props.name}, {props.description}
        </Text>
      </View>
    </View>
  );
};
export default FavouritesCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexedImageView: {
    flex: 2,
  },
  cardBorder: {
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  image: {
    flex: 1,
    width: 125,
    height: 200,
    resizeMode: 'contain',
  },
  textBorder: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
