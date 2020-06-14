import React, {useState} from 'react';

import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Icon} from 'native-base';
import Modal from '../Modal';
import {COLOURS} from '../../../styles/colours';
import {BUTTONS} from '../../../styles/button';

/**
 * A section used with a border bottom to display information for a single store
 * @param title The title of the section
 * @param textLabel The text label prompt for data entry in the modal
 * @param onDataSubmit Function called when data is entered
 * @param keyboardType Type of keyboard for text input e.g "number-pad" for the modal
 * @param multiItemEntry Is the data entry multiple lines or a single line
 * @param children React elements to display underneath the title
 */
const Section = ({
  title,
  children,
  textLabel,
  onDataSubmit,
  keyboardType,
  multiItemEntry,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const onNewRecordingButtonClick = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.border}>
      <View style={styles.section} testID="section-wrapper">
        <View style={[styles.textWrapper]}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            testID="section-button"
            onPress={onNewRecordingButtonClick}
            activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
            underlayColor={BUTTONS.CLICK_COLOUR}>
            <Icon
              name="add-circle-outline"
              type="MaterialIcons"
              style={styles.button}
            />
          </TouchableHighlight>
        </View>
        <Modal
          isVisible={isModalVisible}
          textLabel={textLabel}
          onDismiss={() => setModalVisible(false)}
          onDataSubmit={onDataSubmit}
          keyboardType={keyboardType}
          multiItemEntry={multiItemEntry}
        />
      </View>
      {children}
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  textWrapper: {
    flex: 5,
    marginBottom: 5,
  },
  buttonWrapper: {
    flex: 1,
    top: 6,
  },
  section: {
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: -10,
    alignItems: 'center',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.DARK_PINK,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    color: COLOURS.DARK_PINK,
    marginRight: 10,
  },
});
