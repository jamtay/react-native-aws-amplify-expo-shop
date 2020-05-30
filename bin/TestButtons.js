import React from 'react';
import {Content, Button, Text} from 'native-base';
import {createStores} from '../bin/preloadData';
import {useDispatch} from 'react-redux';
import {removeAllFavouritesDispatch} from '../app/components/Favourites/actions';
import { getData } from './getData';

const TestButtons = () => {
  const dispatch = useDispatch();
  return (
    <Content>
      <Button block dark onPress={async () => await createStores()}>
        <Text> Load Data to API</Text>
      </Button>
      <Button
        block
        dark
        onPress={async () => {
          console.log('removing favourites');
          dispatch(removeAllFavouritesDispatch());
        }}>
        <Text> remove all favourites </Text>
      </Button>

      <Button
        block
        dark
        onPress={async () => {
          const searchString = 'Booths';
          console.log(`Getting data for ${searchString}`);
          dispatch(getData(searchString));
        }}>
        <Text> Get data </Text>
      </Button>
    </Content>
  );
};

export default TestButtons;
