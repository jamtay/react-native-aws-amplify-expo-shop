import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getImageFromStoreName} from '../Favourites/utils';

const Result = ({width, description, location}) => {
  return (
    <View style={styles(width).container}>
      <View style={styles(width).standardFlex}>
        <Image
          style={styles(width).image}
          source={getImageFromStoreName(description)}
        />
      </View>
      <View style={styles(width).textWrapper}>
        <Text style={styles(width).largeText}>{description}</Text>
        <Text style={styles(width).smallText}>{location}</Text>
      </View>
    </View>
  );
};

export default Result;

const styles = width =>
  StyleSheet.create({
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
