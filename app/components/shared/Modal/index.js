import React, {useState} from 'react';
import {View, StyleSheet, Button, TouchableHighlight} from 'react-native';
import {Item, Input, Label, Icon} from 'native-base';
import ReactNativeModal from 'react-native-modal';
import {addNewRecordingModal} from '../../../constants/labels';
import {COLOURS} from '../../../styles/colours';
import {BUTTONS} from '../../../styles/button';

/**
 * A modal to enter data from
 * @param isVisible Is the modal visible
 * @param textLabel The label to display to the user entering text
 * @param onDismiss Function to invoke when modal is dismissed by either swiping or submitting
 * @param onDataSubmit Function to invoke when modal data is submitted
 * @param keyboardType Type of keyboard for text input e.g "number-pad"
 * @param multiItemEntry Is the data entry multiple lines or a single line
 */
const Modal = ({
  isVisible,
  textLabel,
  onDismiss,
  onDataSubmit,
  keyboardType,
  multiItemEntry = false,
}) => {
  const [data, setData] = useState(['']);

  const addNewItem = () => {
    const updatedData = [...data];
    updatedData.push('');
    setData(updatedData);
  };

  const onModalDismiss = () => {
    setData(['']);
    onDismiss();
  };

  const items = multiItemEntry ? (
    data.map((item, index) => {
      const isLastItem = index === data.length - 1;
      return (
        <>
          <Item floatingLabel={isLastItem}>
            {isLastItem && <Label style={styles.label}>{textLabel}</Label>}
            <Input
              keyboardType={keyboardType}
              textAlign="center"
              onChangeText={text => {
                const updatedData = [...data];
                updatedData[index] = text;
                setData(updatedData);
              }}
              value={item}
            />
          </Item>
          <TouchableHighlight
            onPress={addNewItem}
            activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
            underlayColor={BUTTONS.CLICK_COLOUR}>
            <Icon
              name="add-circle-outline"
              type="MaterialIcons"
              style={styles.button}
            />
          </TouchableHighlight>
        </>
      );
    })
  ) : (
    <Item floatingLabel>
      <Label style={styles.label}>{textLabel}</Label>
      <Input
        keyboardType={keyboardType}
        textAlign="center"
        onChangeText={text => {
          const updatedData = [...data];
          updatedData[data.length - 1] = text;
          setData(updatedData);
        }}
        value={data[data.length - 1]}
      />
    </Item>
  );
  return (
    <View>
      <ReactNativeModal
        isVisible={isVisible}
        onSwipeComplete={onModalDismiss}
        swipeDirection={['down', 'up', 'left', 'right']}
        onDismiss={onModalDismiss}>
        <View style={styles.content}>
          {items}
          <Button
            onPress={() => {
              onDataSubmit(data);
              onModalDismiss();
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
