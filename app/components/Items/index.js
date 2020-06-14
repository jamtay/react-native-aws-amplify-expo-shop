import React from 'react';

import Loading from '../shared/Loading';
import {View, Text} from 'react-native';
import {useItems} from './itemsHook';
import {storePageLabels} from '../../constants/labels';
import {ITEM_TYPES} from './constants';

/**
 * A component to display missing or available items activity
 * @param style
 * @param fontStyle
 * @param type The type of activity. Either "missing" or "available"
 */
const ItemsActivity = ({style, fontStyle, type}) => {
  const [items, loading] = useItems(type);

  if (loading) {
    return <Loading isLoading />;
  }

  return (
    <View style={style}>
      {items.map((recording, index) => (
        <Text style={fontStyle} key={`latest-${type}-item-${index + 1}`}>
          {index + 1}: {recording.filter(rec => rec && rec !== '').join(', ')}
        </Text>
      ))}
      {items.length === 0 && (
        <Text style={fontStyle}>
          {storePageLabels.NO_ITEMS(type === ITEM_TYPES.MISSING)}
        </Text>
      )}
    </View>
  );
};

export default ItemsActivity;
