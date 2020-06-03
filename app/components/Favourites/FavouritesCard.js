import React from 'react';
import Result from '../SearchResults/Result';
import SearchResults from '../SearchResults';

const FavouritesCard = ({width, item}) => {
  const isAndroid = Platform.OS === 'android';
  return (
    <SearchResults>
      <Result width={width - 25} item={item} topStyle={isAndroid ? -32 : -20} isFavouriteCard/>
    </SearchResults>
  );
};

export default FavouritesCard;
