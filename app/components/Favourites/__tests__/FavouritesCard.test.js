import React from 'react';

import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';
import {isAndroidOS} from '../../../config/platform';
import FavouritesCard from '../FavouritesCard';

jest.mock('../../../config/platform');
jest.mock('../../SearchResults', () => 'SearchResults');
jest.mock('../../SearchResults/Result', () => 'Result');

describe('FavouritesCard component tests', () => {
  const props = {
    width: 100,
    item: {
      id: 'id',
      name: 'name',
      description: 'description',
      fullAddress: 'fullAddress',
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      addressLine3: 'addressLine3',
      postcode: 'postcode',
      country: 'country',
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('snapshot test', () => {
    it('should match stored snapshot', () => {
      isAndroidOS.mockReturnValueOnce(true);
      const tree = renderer.create(<FavouritesCard {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('render with properties', () => {
    it('should render with correct width and item', async () => {
      isAndroidOS.mockReturnValueOnce(true);
      const {getByTestId} = render(<FavouritesCard {...props} />);
      const searchResultsComponent = await getByTestId('favourite-id').props
        .children;
      const resultProps = searchResultsComponent.props.children.props;

      expect(resultProps.item).toEqual(props.item);
      expect(resultProps.width).toEqual(props.width - 25);
    });

    it('should render with -32 topStyle for android', async () => {
      isAndroidOS.mockReturnValueOnce(true);
      const {getByTestId} = render(<FavouritesCard {...props} />);
      const searchResultsComponent = await getByTestId('favourite-id').props
        .children;
      const resultProps = searchResultsComponent.props.children.props;

      expect(resultProps.topStyle).toEqual(-32);
    });

    it('should render with -30 topStyle for ios', async () => {
      isAndroidOS.mockReturnValueOnce(false);
      const {getByTestId} = render(<FavouritesCard {...props} />);
      const searchResultsComponent = await getByTestId('favourite-id').props
        .children;
      const resultProps = searchResultsComponent.props.children.props;

      expect(resultProps.topStyle).toEqual(-20);
    });
  });
});
