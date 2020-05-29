import React from 'react';

import {storiesOf} from '@storybook/react-native';

import HeaderStory from './Header';
import SearchBarStory from './SearchBar';
import LoadingStory from './Loading';
import FavouritesStory from './Favourites';
import FavouritesIconStory from './FavouritesIcon';

const exampleTableData = [
  {
    id: 'id',
    description: 'James',
    addressLine1: 'Another description',
  },
  {
    id: 'id2',
    description: 'Second',
    addressLine1: 'Another description again',
  },
  {
    id: 'id3',
    description: 'Another',
    addressLine1: 'Third description again',
  },
  {
    id: 'id4',
    description: 'Fourth',
    addressLine1: 'A fourth description again',
  },
];

storiesOf('Header', module)
  .addDecorator(getStory => getStory())
  .add('with text', () => <HeaderStory />);

storiesOf('Loading', module)
  .addDecorator(getStory => getStory())
  .add('not loading', () => <LoadingStory isLoading={false} />)
  .add('is loading', () => <LoadingStory isLoading={true} />);

storiesOf('SearchBar', module)
  .addDecorator(getStory => getStory())
  .add('testing', () => <SearchBarStory />);

storiesOf('Favourites', module)
  .addDecorator(getStory => getStory())
  .add('Favourites with data passed in and no errors', () => (
    <FavouritesStory favourites={exampleTableData} isError={false} />
  ))
  .add('Favourites with one data row passed in and no errors', () => (
    <FavouritesStory favourites={[exampleTableData[0]]} isError={false} />
  ))
  .add('Favourites with no data passed in and no errors', () => (
    <FavouritesStory favourites={[]} isError={false} />
  ))
  .add('Favourites with data passed in but with errors', () => (
    <FavouritesStory favourites={exampleTableData} isError={'Some error'} />
  ))
  .add('Favourites with data passed in but with errors as true', () => (
    <FavouritesStory favourites={exampleTableData} isError={true} />
  ))
  .add('Favourites with data passed in but with errors as undefined', () => (
    <FavouritesStory favourites={exampleTableData} />
  ))
  .add(
    'Favourites with data passed in but with errors as an empty string',
    () => <FavouritesStory favourites={exampleTableData} isError={''} />,
  );

storiesOf('Favourites Icon', module)
  .addDecorator(getStory => getStory())
  .add('displayFavouriteOption is false so no element displayed', () => (
    <FavouritesIconStory displayFavouriteOption={false} />
  ))
  .add('displayFavouriteOption is undefined so no element displayed', () => (
    <FavouritesIconStory />
  ))
  .add(
    'displayFavouriteOption is true and is not a favourite (false) so empty heart displayed',
    () => (
      <FavouritesIconStory displayFavouriteOption={true} isFavourite={false} />
    ),
  )
  .add(
    'displayFavouriteOption is true and is not a favourite (undefined) so empty heart displayed',
    () => <FavouritesIconStory displayFavouriteOption={true} />,
  )
  .add(
    'displayFavouriteOption is true and is a favourite (true) so full heart displayed',
    () => (
      <FavouritesIconStory displayFavouriteOption={true} isFavourite={true} />
    ),
  );
