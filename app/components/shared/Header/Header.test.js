import React from 'react';

import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';
import {headerLabels} from '../../../constants/labels';
import Header from './index';

describe('Header component tests', () => {
  describe('snapshot test', () => {
    it('should match stored snapshot', () => {
      const tree = renderer.create(<Header />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('render with properties', () => {
    it('should render with correct header', async () => {
      const {getByText} = render(<Header />);
      expect(await getByText(headerLabels.HEADER)).toBeTruthy();
    });
  });
});
