import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Content, Button, Text} from 'native-base';
import {TextInput} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {removeAllFavouritesDispatch} from '../app/components/Favourites/actions';
import {loadRealDataFromHereApiToElasticSearch} from './loadRealData';
import {showErrorToast} from '../app/constants/error';

/**
 * A set of buttons to use in development.
 * Including removing all favourites and searching the HERE API and loading data into the backend from it
 */
const TestButtons = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();
  return (
    <Content>
      <Button
        block
        dark
        onPress={async () => {
          console.log('removing favourites');
          dispatch(removeAllFavouritesDispatch());
        }}>
        <Text> remove all favourites </Text>
      </Button>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Enter a term to load data for"
        placeholderTextColor="grey"
        onChangeText={text => {
          setSearchText(text);
        }}
        style={{padding: 20}}
        autoCorrect={false}
      />
      <Button
        block
        dark
        onPress={async () => {
          const searchString = searchText;
          console.log(`Getting data for ${searchString}`);
          loadRealDataFromHereApiToElasticSearch(searchString).then(() => {});
          try {
            const itemNames = await loadRealDataFromHereApiToElasticSearch(
              searchString,
            );
            console.log(`Completed data loading for ${searchString}`);
            console.log('Loaded the following item names');
            console.log(itemNames);
            Toast.showSuccess(`Successfully loaded data for ${searchString}`);
          } catch (error) {
            console.log('ERROR: ' + error);
            showErrorToast('Error loading data:' + error.message);
          }
        }}>
        <Text> Load data from here to AWS </Text>
      </Button>
    </Content>
  );
};

export default TestButtons;
