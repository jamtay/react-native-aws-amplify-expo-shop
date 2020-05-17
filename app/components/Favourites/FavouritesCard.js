import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import FavouritesIcon from './FavouritesIcon';
import {getImageFromStoreName} from './utils';
import {PAGE_NAMES} from '../../screens/pageNames';
import {useNavigation} from '@react-navigation/native';
import { BUTTONS } from '../../styles/button';

const FavouritesCard = ({width, item}) => {
  const styles = StyleSheet.create({
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
          isFavourite={true}
          displayFavouriteOption={true}
          item={item}
          topStyle={-32}
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

export default FavouritesCard;
