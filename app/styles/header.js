import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {headerLabels} from '../constants/labels';
import {COLOURS} from './colours';

const headerStyle = StyleSheet.create({
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export const headerOptions = {
  headerTitle: props => (
    <Text style={headerStyle.header}>{headerLabels.HEADER}</Text>
  ),
  headerStyle: {
    backgroundColor: COLOURS.PINK,
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
