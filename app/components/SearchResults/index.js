import React from 'react';
import {View, StyleSheet} from 'react-native';

/**
 * A wrapper to display search results in which are passed in as children
 */
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
