import React from 'react';

import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';
import Loading from './index';

describe('Loading component tests', () => {
  describe('snapshot test', () => {
    it('should match stored snapshot', () => {
      const tree = renderer.create(<Loading isLoading={true} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('render with properties', () => {
    it('should render with correct loading spinner if isLoading is true', async () => {
      const {getByTestId} = render(<Loading isLoading={true} />);
      expect(await getByTestId('spinner')).toBeTruthy();
    });

    it('should render with correct loading spinner if isLoading is false', async () => {
      const {queryByTestId} = render(<Loading isLoading={false} />);
      expect(await queryByTestId('spinner')).toBeFalsy();
    });

    it('should render with correct loading spinner if isLoading is not supplied', async () => {
      const {queryByTestId} = render(<Loading />);
      expect(await queryByTestId('spinner')).toBeFalsy();
    });
  });
});
