import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../app/components/shared/Cards/index';

export default function CardStory({
  headerTestID,
  id,
  headerText,
  bodyText,
  cardType,
  displayFavouriteOption,
  isFavourite,
}) {
  return (
    <Card
      headerTestID={headerTestID}
      id={id}
      headerText={headerText}
      bodyText={bodyText}
      cardType={cardType}
      displayFavouriteOption={displayFavouriteOption}
      isFavourite={isFavourite}
    />
  );
}

CardStory.defaultProps = {};

CardStory.propTypes = {
  headerTestID: PropTypes.string,
  id: PropTypes.string,
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  cardType: PropTypes.string,
  displayFavouriteOption: PropTypes.bool,
  isFavourite: PropTypes.bool,
};
