import React from 'react';
import PropTypes from 'prop-types';
import FavouritesIcon from '../../../app/components/Favourites/FavouritesIcon';
import {Content} from 'native-base';

export default function FavouritesIconStory({
  displayFavouriteOption,
  isFavourite,
}) {
  return (
    <Content>
      <FavouritesIcon
        displayFavouriteOption={displayFavouriteOption}
        isFavourite={isFavourite}
      />
    </Content>
  );
}

FavouritesIconStory.defaultProps = {
  displayFavouriteOption: undefined,
  isFavourite: undefined,
};

FavouritesIconStory.propTypes = {
  displayFavouriteOption: PropTypes.bool,
  isFavourite: PropTypes.bool,
};
