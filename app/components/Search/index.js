import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {searchLabels} from '../../constants/labels';
import {searchStores} from './actions';

const SearchBar = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    address: '',
    currentSearch: '',
  });
  const [startHeaderHeight, setStartHeaderHeight] = useState();

  useEffect(() => {
    setStartHeaderHeight(80);
  }, []);

  const dispatch = useDispatch();
  return (
    <>
      <View style={[styles.searchContainer, {height: startHeaderHeight}]}>
        <View style={styles.searchBarView}>
          <Icon name="ios-search" size={20} style={styles.searchBarIcon} />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder={searchLabels.NAME}
            placeholderTextColor="grey"
            style={styles.searchInput}
            autoCorrect={false}
            onChangeText={text => {
              const updatedSearchCriteria = {
                ...searchCriteria,
                name: text,
                currentSearch: 'name',
              };
              setSearchCriteria(updatedSearchCriteria);
              dispatch(searchStores(updatedSearchCriteria));
            }}
          />
        </View>
      </View>
      <View style={[styles.finalSearchContainer, {height: startHeaderHeight}]}>
        <View style={styles.searchBarView}>
          <Icon name="ios-search" size={20} style={styles.searchBarIcon} />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder={searchLabels.ADDRESS}
            placeholderTextColor="grey"
            style={styles.searchInput}
            autoCorrect={false}
            onChangeText={text => {
              const updatedSearchCriteria = {
                ...searchCriteria,
                address: text,
                currentSearch: 'address',
              };
              setSearchCriteria(updatedSearchCriteria);
              dispatch(searchStores(updatedSearchCriteria));
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchBarIcon: {marginRight: 10},
  searchBarView: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS === 'android' ? 0 : 10,
  },
  finalSearchContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    marginTop: -25,
    marginBottom: 0,
  },
  searchContainer: {
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 0,
  },
  searchInput: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: 'white',
  },
});

export default SearchBar;
