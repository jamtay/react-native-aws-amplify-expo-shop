import Toast from 'react-native-tiny-toast';
import {COLOURS} from '../styles/colours';

export const ERROR_MESSAGES = Object.freeze({
  ENTER_NUMBER: 'Invalid queue time, please enter a valid number',
  ENTER_ITEM: 'No item entered. Please enter an item',
  GENERIC: 'Something went wrong, please try again later',
});

export const showErrorToast = errorMessage =>
  Toast.show(errorMessage, {
    containerStyle: {
      backgroundColor: COLOURS.ERROR_PINK,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    position: Toast.position.CENTER,
  });
