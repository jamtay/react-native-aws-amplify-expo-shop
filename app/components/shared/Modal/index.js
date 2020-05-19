import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import ReactNativeModal from 'react-native-modal';

const Modal = ({isVisible}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const close = () => setIsOpen(false);

  return (
    <View>
      <ReactNativeModal
        isVisible={isOpen}
        onSwipeComplete={close}
        swipeDirection={['down', 'up', 'left', 'right']}>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Hi 👋!</Text>
          <Button onPress={close} title="Close" />
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
