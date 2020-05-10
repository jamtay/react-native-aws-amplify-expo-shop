import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast,
} from 'native-base';
import {addMissingItems} from './actions';
import {PAGE_NAMES} from '../../screens/pageNames';

const NewMissingItem = ({store}) => {
  const storeID = store.id;
  const [missingItem, setMissingItem] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Content>
      <Form>
        <Item floatingLabel last>
          <Label>Enter missing item</Label>
          <Input
            onChangeText={text => {
              setMissingItem(text);
            }}
            value={missingItem}
          />
        </Item>
        <Button
          block
          primary
          onPress={async () => {
            if (!missingItem) {
              Toast.show({
                text: 'Please enter a missing item',
                buttonText: 'Okay',
                type: 'warning',
                duration: 2000,
              });
            } else {
              dispatch(await addMissingItems(storeID, [missingItem]));
              navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                store: store,
              });
            }
          }}>
          <Text>Submit</Text>
        </Button>
      </Form>
    </Content>
  );
};

export default NewMissingItem;
