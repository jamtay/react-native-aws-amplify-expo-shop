import React from 'react';
import {Spinner} from 'native-base';

const Loading = ({isLoading}) => {
  return isLoading ? <Spinner color="pink" /> : null;
};

export default Loading;
