import React from 'react';
import Result from '../SearchResults/Result';
import SearchResults from '../SearchResults';

const FavouritesCard = ({width, item}) => {
  return (
    <SearchResults>
      <Result width={width - 50} item={item} topStyle={-20} />
    </SearchResults>
  );
};

export default FavouritesCard;
