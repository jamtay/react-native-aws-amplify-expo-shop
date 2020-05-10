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
import {addAvailableItems} from './actions';
import {PAGE_NAMES} from '../../screens/pageNames';

const NewAvailableItem = ({store}) => {
  const storeID = store.id;
  const [availableItem, setAvailableItem] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Content>
      <Form>
        <Item floatingLabel last>
          <Label>Enter available item</Label>
          <Input
            onChangeText={text => {
              setAvailableItem(text);
            }}
            value={availableItem}
          />
        </Item>
        <Button
          block
          primary
          onPress={async () => {
            if (!availableItem) {
              Toast.show({
                text: 'Please enter an available item',
                buttonText: 'Okay',
                type: 'warning',
                duration: 2000,
              });
            } else {
              dispatch(await addAvailableItems(storeID, [availableItem]));
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

export default NewAvailableItem;
