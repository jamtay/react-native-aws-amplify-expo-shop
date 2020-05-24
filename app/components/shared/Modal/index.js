import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Item, Input, Label} from 'native-base';
import ReactNativeModal from 'react-native-modal';
import {addNewRecordingModal} from '../../../constants/labels';
import { COLOURS } from '../../../styles/colours';

/**
 * A modal to enter data from
 * @param isVisible Is the modal visible
 * @param textLabel The label to display to the user entering text
 * @param onDismiss Function to invoke when modal is dismissed by either swiping or submitting
 * @param onDataSubmit Function to invoke when modal data is submitted
 */
const Modal = ({isVisible, textLabel, onDismiss, onDataSubmit}) => {
  const [data, setData] = useState('');
  return (
    <View>
      <ReactNativeModal
        isVisible={isVisible}
        onSwipeComplete={onDismiss}
        swipeDirection={['down', 'up', 'left', 'right']}
        onDismiss={onDismiss}>
        <View style={styles.content}>
          <Item floatingLabel>
            <Label style={styles.label}>{textLabel}</Label>
            <Input
              keyboardType="number-pad"
              textAlign="center"
              onChangeText={text => {
                setData(text);
              }}
              value={data}
            />
          </Item>
          <Button
            onPress={() => {
              onDataSubmit(data);
              setData('');
              onDismiss();
            }}
            title={addNewRecordingModal.SUBMIT}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    paddingBottom: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: COLOURS.DARK_PINK,
    borderWidth: 4,
  },
  contentTitle: {
    fontSize: 18,
    marginBottom: 12,
    height: 40,
    width: 100,
  },
  label: {textAlign: 'center'},
});
