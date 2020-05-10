import React from 'react';
import PropTypes from 'prop-types';
import Favourites from '../../../app/components/Favourites/index';
import {Content} from 'native-base';

export default function FavouritesStory({favourites, isError}) {
  return (
    <Content>
      <Favourites favourites={favourites} isError={isError} />
    </Content>
  );
}

FavouritesStory.defaultProps = {
  favourites: undefined,
  isError: undefined,
};

FavouritesStory.propTypes = {
  favourites: PropTypes.array,
  isError: PropTypes.bool,
};
