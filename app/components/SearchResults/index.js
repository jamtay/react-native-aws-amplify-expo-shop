import React from 'react';
import {View, StyleSheet} from 'react-native';

const SearchResults = props => {
  return <View style={styles.container}>{props.children}</View>;
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
