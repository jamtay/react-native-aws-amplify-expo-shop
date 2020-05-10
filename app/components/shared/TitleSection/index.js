import React from 'react';
import {Text} from 'native-base';
import {StyleSheet} from 'react-native';

const TitleSection = ({titleText}) => {
  return <Text style={styles.titleStyle}>{titleText}</Text>;
};

const styles = StyleSheet.create({
  titleStyle: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default TitleSection;
