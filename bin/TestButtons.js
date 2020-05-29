import React from 'react';
import {Content, Button, Text} from 'native-base';
import {createStores} from '../bin/preloadData';
import {useDispatch} from 'react-redux';
import {removeAllFavouritesDispatch} from '../app/components/Favourites/actions';

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
    </Content>
  );
};

export default TestButtons;
