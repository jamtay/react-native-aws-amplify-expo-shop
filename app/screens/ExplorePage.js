import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Result from '../components/SearchResults/Result';
import {shallowEqual, useSelector} from 'react-redux';
import Favourites from '../components/Favourites';
import SearchBar from '../components/Search';
import SearchResults from '../components/SearchResults';
import LargeResult from '../components/SearchResults/LargeResult';
import {explorePageLabels} from '../constants/labels';
import Loading from '../components/shared/Loading';
const {height, width} = Dimensions.get('window');

const Explore = () => {
  const {
    storesSearch: {loading, stores, error},
    favouritesData: {favourites},
  } = useSelector(state => state, shallowEqual);

  const isStores = stores && stores.length > 0;

  const MainSearchResult = isStores ? (
    <View style={styles.emptyTopMargin}>
      <SearchResults>
        <LargeResult
          width={width * 2}
          description={stores[0].description}
          location={stores[0].addressLine1}
          item={stores[0]}
        />
      </SearchResults>
    </View>
  ) : null;

  const OtherSearchResults = () => {
    if (loading) {
      return <Loading />;
    }
    return stores.map((store, index) =>
      index !== 0 ? (
        <Result
          width={width}
          description={store.description}
          location={store.addressLine1}
          item={store}
          key={store.id}
        />
      ) : null,
    );
  };

  return (
    <SafeAreaView style={styles.standardFlex}>
      <View style={styles.standardFlex}>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.container}>
            <Favourites pageWidth={width}/>
            <Text style={styles.titleText}>
              {explorePageLabels(isStores).STORE_SEARCH}
            </Text>
            <SearchBar />
            <View style={styles.emptyTopMargin}>
              <Text style={styles.descriptionText}>
                {explorePageLabels(isStores).SEARCH_DESCRIPTION}
              </Text>
              {MainSearchResult}
            </View>
          </View>
          <View style={styles.smallTopMargin}>
            <Text
              style={{
                ...styles.titleText,
                ...styles.searchResultsMarginBottom,
              }}>
              {explorePageLabels(isStores).SEARCH_RESULTS}
            </Text>
            <SearchResults>{OtherSearchResults()}</SearchResults>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  standardFlex: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchResultsMarginBottom: {
    marginBottom: -30,
  },
  descriptionText: {
    fontWeight: '100',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  emptyTopMargin: {
    marginTop: 0,
  },
  smallTopMargin: {
    marginTop: 10,
  },
});
