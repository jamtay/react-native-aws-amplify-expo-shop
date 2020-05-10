import React from 'react';
import {ScrollView} from 'react-native';
import {tableLabels} from '../../../constants/labels';
import DataCard from '../Cards';
import {getTableCardStyle} from '../../../styles/table';
import {isAlreadyFavourite} from '../../Favourites/utils';
import {PAGE_NAMES} from '../../../screens/pageNames';
import {useNavigation} from '@react-navigation/native';

const DataTable = ({data, favouriteStoreIds, horizontal}) => {
  const navigation = useNavigation();
  const dataCardStyle = getTableCardStyle(horizontal, data.length);

  const onItemButtonPress = itemId => {
    navigation.navigate(PAGE_NAMES.STORE_PAGE, {
      store: data.find(store => store.id === itemId),
    });
  };

  const table = () =>
    data.map((item, index) => (
      <DataCard
        key={item.id}
        id={item.id}
        headerTestID={`results-card-${index}`}
        headerText={item.description}
        bodyText={item.addressLine1}
        cardType="standard"
        viewStyle={dataCardStyle}
        displayFavouriteOption={true}
        isFavourite={isAlreadyFavourite(item.id, favouriteStoreIds)}
        item={item}
        onItemButtonPress={onItemButtonPress}
      />
    ));

  const emptyTable = () => (
    <DataCard
      key="no-results-card"
      id="no-results-card"
      headerTestID="no-results-card"
      headerText={tableLabels.NO_RESULTS}
      bodyText={tableLabels.NO_RESULTS_HINT}
      cardType="warning"
      viewStyle={dataCardStyle}
      displayFavouriteOption={false}
    />
  );

  return (
    <ScrollView horizontal={horizontal} showsHorizontalScrollIndicator={false}>
      {data && data.length > 0 ? table() : emptyTable()}
    </ScrollView>
  );
};

export default DataTable;
