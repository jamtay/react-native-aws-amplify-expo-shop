import React from 'react';

import {View} from 'react-native'
import Result from '../SearchResults/Result';
import SearchResults from '../SearchResults';
import {isAndroidOS} from '../../config/platform';

/**
 * A wrapper component to display favourites with
 * @param width
 * @param item
 */
const FavouritesCard = ({width, item}) => {
  const isAndroid = isAndroidOS();
  return (
    <View testID={`favourite-${item.id}`}>
      <SearchResults>
        <Result
          width={width - 25}
          item={item}
          topStyle={isAndroid ? -32 : -20}
          isFavouriteCard
        />
      </SearchResults>
    </View>
  );
};

export default FavouritesCard;
