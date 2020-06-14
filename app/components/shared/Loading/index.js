import React from 'react';
import {Spinner} from 'native-base';
import {COLOURS} from '../../../styles/colours';

/**
 * Loading spinner to display when loading
 * @param isLoading
 */
const Loading = ({isLoading}) => {
  return isLoading ? (
    <Spinner testID="spinner" color={COLOURS.DARK_PINK} />
  ) : null;
};

export default Loading;
