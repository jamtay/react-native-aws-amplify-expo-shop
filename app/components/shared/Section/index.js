import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {BUTTONS} from '../../../styles/button';
import {Icon} from 'native-base';
import {COLOURS} from '../../../styles/colours';
import {PAGE_NAMES} from '../../../screens/pageNames';
import {useNavigation} from '@react-navigation/native';
import Modal from '../Modal';

/**
 * A section used with a border bottom to display information for a single store
 * @param store The store to display data for. Passed onto the next page for new recordings
 * @param title The title of the section
 * @param textLabel The text label prompt for data entry in the modal
 * @param onDataSubmit Function called when data is entered
 * @param children React elements to display underneath the title
 */
const Section = ({store, title, children, textLabel, onDataSubmit}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const onNewRecordingButtonClick = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.border}>
      <View style={styles.section}>
        <Text style={styles.titleText}>{title}</Text>
        <TouchableHighlight
          onPress={onNewRecordingButtonClick}
          activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
          underlayColor={BUTTONS.CLICK_COLOUR}>
          <Icon
            name="add-circle-outline"
            type="MaterialIcons"
            style={styles.button}
          />
        </TouchableHighlight>
        <Modal
          isVisible={isModalVisible}
          textLabel={textLabel}
          onDismiss={() => setModalVisible(false)}
          onDataSubmit={onDataSubmit}
        />
      </View>
      {children}
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  section: {
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1,
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
