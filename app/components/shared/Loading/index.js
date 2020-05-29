import React from 'react';
import {Spinner} from 'native-base';
import {COLOURS} from '../../../styles/colours';

const Loading = ({isLoading}) => {
  return isLoading ? <Spinner color={COLOURS.DARK_PINK} /> : null;
};

export default Loading;
