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

  const onModalDismiss = () => {
    setData(['']);
    onDismiss();
  };

  const items = multiItemEntry ? (
    data.map((item, index) => {
      const isLastItem = index === data.length - 1;
      const addNewItem = () => {
        if (data[data.length - 1] !== '' && isLastItem) {
          const updatedData = [...data];
          updatedData.push('');
          setData(updatedData);
        }
        // If it is not the last item then remove the item instead of adding it
        if (!isLastItem) {
          const updatedData = data.filter(
            (_, itemsIndex) => itemsIndex !== index,
          );
          setData(updatedData);
        }
      };
      return (
        <View
          style={[styles.section, isLastItem ? styles.paddedBottom : undefined]}
          key={`items-${index}`}>
          <Item floatingLabel={isLastItem} style={[styles.textWrapper]}>
            {isLastItem && <Label style={styles.label}>{textLabel}</Label>}
            <Input
              keyboardType={keyboardType}
              textAlign="left"
              onChangeText={text => {
                const updatedData = [...data];
                updatedData[index] = text;
                setData(updatedData);
              }}
              value={item}
            />
          </Item>
          {!(isLastItem && item === '') && (
            <TouchableHighlight
              onPress={addNewItem}
              activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
              underlayColor={BUTTONS.CLICK_COLOUR}
              style={styles.buttonWrapper}>
              <Icon
                name={
                  isLastItem ? 'add-circle-outline' : 'minus-circle-outline'
                }
                type={isLastItem ? 'MaterialIcons' : 'MaterialCommunityIcons'}
                style={styles.button}
              />
            </TouchableHighlight>
          )}
        </View>
      );
    })
  ) : (
    <Item floatingLabel style={styles.paddedBottom}>
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
        <View style={styles.closeIcon}>
          <TouchableHighlight
            onPress={onModalDismiss}
            activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
            underlayColor={BUTTONS.CLICK_COLOUR}
            style={styles.buttonWrapper}>
            <Icon
              name="close"
              type="MaterialCommunityIcons"
              style={styles.button}
            />
          </TouchableHighlight>
        </View>
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
    borderRadius: 8,
    borderColor: COLOURS.DARK_PINK,
    borderWidth: 4,
  },
  label: {textAlign: 'left', left: 5, paddingTop: 10},
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paddedBottom: {
    marginBottom: 10,
  },
  textWrapper: {
    flex: 1,
    marginRight: 40,
  },
  buttonWrapper: {
    top: 8,
  },
  button: {
    color: COLOURS.DARK_PINK,
    marginRight: 5,
  },
  closeIcon: {
    alignItems: 'flex-end',
    top: 30,
    right: 5,
    zIndex: 999
  },
});
