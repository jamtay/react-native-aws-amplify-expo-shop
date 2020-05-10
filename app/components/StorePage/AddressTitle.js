import React from 'react';
import {Text} from 'native-base';
import {StyleSheet} from 'react-native';
import SubTitleSection from '../shared/SubTitleSection';

const AddressTitle = ({titleText, bodyText}) => {
  return (
    <Text style={styles.dataEntry}>
      <SubTitleSection titleText={titleText} />
      <Text>{bodyText}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  dataEntry: {
    marginTop: 15,
  },
});

export default AddressTitle;
