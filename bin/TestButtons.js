import React from 'react';
import {Content, Button, Text} from 'native-base';
import {createStores, fakeData} from '../bin/preloadData';
import {
  getFavouriteData,
  addAllFavourites,
  removeFavourite,
  removeAllFavourites,
} from '../app/service/localStorage';

const TestButtons = () => {
  return (
    <Content>
      <Button block dark onPress={async () => await createStores()}>
        <Text> Load Data to API</Text>
      </Button>
      {/* <Button
        block
        dark
        onPress={async () => {
          const data = await getFavouriteData();
          alert(data);
        }}>
        <Text> Alert with data test from local storage</Text>
      </Button>
      <Button
        block
        dark
        onPress={async () => {
          const fakeDataToAdd = fakeData.map((data, index) => {
            return {
              ...data,
              id: index.toString(),
            };
          });
          await addAllFavourites(fakeDataToAdd);
        }}>
        <Text> Add new data to local storage</Text>
      </Button> */}
      <Button
        block
        dark
        onPress={async () => {
          console.log('removing favourites');
          await removeAllFavourites();
        }}>
        <Text> remove all favourites </Text>
      </Button>
      {/* <Button
        block
        dark
        onPress={async () => {
          await removeFavourite('2');
        }}>
        <Text> remove specific data </Text>
      </Button> */}
    </Content>
  );
};

export default TestButtons;
