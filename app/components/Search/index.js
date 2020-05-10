import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Item, Icon, Input} from 'native-base';

import {StyleSheet, View} from 'react-native';
import {searchLabels} from '../../constants/labels';
import {searchStores} from './actions';

const SearchBar = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    address: '',
    currentSearch: '',
  });
  const dispatch = useDispatch();
  return (
    <View style={styles.searchBar}>
      <Item underline style={styles.spacedSearch}>
        <Icon active name="search" />
        <Input
          placeholder={searchLabels.NAME}
          testID="name-search"
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
      </Item>
      <Item underline style={styles.spacedSearch}>
        <Icon active name="compass" />
        {/* <Icon active name="navigate" /> */}
        <Input
          placeholder={searchLabels.ADDRESS}
          testID="address-search"
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
      </Item>
    </View>
  );
};

const styles = StyleSheet.create({
  spacedSearch: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  searchBar: {
    marginTop: 20,
  },
});

export default SearchBar;
