import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, CardItem, Text, Body} from 'native-base';
import {verticalTableCardStyle} from '../../../styles/table';
import FavouritesIcon from '../../Favourites/FavouritesIcon';

// Takes a CardType parameter which is used to style the card. This can be error, warning, standard
const DataCard = ({
  headerTestID,
  id,
  headerText,
  bodyText,
  cardType,
  viewStyle,
  displayFavouriteOption,
  isFavourite,
  item,
  onItemButtonPress,
}) => {
  const cardStyle = cardType ? cardType : 'standard';
  const viewStyling = viewStyle ? viewStyle : verticalTableCardStyle;

  return (
    <View style={{...styles[cardStyle], ...viewStyling}}>
      <Card style={styles.noMargin}>
        <CardItem
          header
          button
          onPress={() => {
            onItemButtonPress ? onItemButtonPress(id) : null;
          }}>
          <Text style={styles.capital} testID={headerTestID}>
            {headerText}
          </Text>
          <FavouritesIcon
            isFavourite={isFavourite}
            displayFavouriteOption={displayFavouriteOption}
            item={item}
          />
        </CardItem>
        <CardItem
          button
          onPress={() => {
            onItemButtonPress ? onItemButtonPress(id) : null;
          }}>
          <Body>
            <Text style={styles.capital}>{bodyText}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  capital: {
    textTransform: 'capitalize',
  },
  error: {
    borderColor: 'red',
  },
  warning: {
    borderColor: 'orange',
  },
  standard: {
    borderColor: 'pink',
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default DataCard;
