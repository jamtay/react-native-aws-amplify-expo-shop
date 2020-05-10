import React from 'react';
import {Header, Left, Body, Right, Title} from 'native-base';
import {headerLabels} from '../../../constants/labels';

const AppHeader = () => {
  return (
    <Header>
      <Left />
      <Body>
        <Title>{headerLabels.HEADER}</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default AppHeader;
