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
import {addQueueTime} from './actions';
import {PAGE_NAMES} from '../../screens/pageNames';

const NewQueueTime = ({store}) => {
  const storeID = store.id;
  const [qTime, setQTime] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Content>
      <Form>
        <Item floatingLabel last>
          <Label>Queue time in minutes</Label>
          <Input
            keyboardType="number-pad"
            onChangeText={text => {
              setQTime(text);
            }}
            value={qTime}
          />
        </Item>
        <Button
          block
          primary
          onPress={async () => {
            if (!qTime) {
              Toast.show({
                text: 'Please enter a queue time',
                buttonText: 'Okay',
                type: 'warning',
                duration: 2000,
              });
            } else if (isNaN(parseFloat(qTime))) {
              Toast.show({
                text: 'Queue time must be a number',
                buttonText: 'Okay',
                type: 'error',
                duration: 2000,
              });
            } else {
              dispatch(await addQueueTime(storeID, qTime));
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

export default NewQueueTime;
