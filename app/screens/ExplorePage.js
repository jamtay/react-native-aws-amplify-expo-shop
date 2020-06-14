import React from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Result from '../components/SearchResults/Result';
import Favourites from '../components/Favourites';
import SearchBar from '../components/Search';
import SearchResults from '../components/SearchResults';
import Loading from '../components/shared/Loading';
import TestButtons from '../../bin/TestButtons';
import {explorePageLabels} from '../constants/labels';
import {isAndroidOS} from '../config/platform';
const {width} = Dimensions.get('window');

const isAndroid = isAndroidOS();

/**
 * The home page of the application, showing horizontal scrolling favourites, a search bar, and the search results
 */
const Explore = () => {
  const {
    storesSearch: {loading, stores},
  } = useSelector(state => state, shallowEqual);

  const isStores = stores && stores.length > 0;

  const MainSearchResult = isStores ? (
    <View style={styles.emptyTopMargin}>
      <SearchResults style={styles.smallTopMargin}>
        <Result width={width} item={stores[0]} topStyle={-15} isLarge />
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
    <SafeAreaView style={[styles.standardFlex]}>
      <View style={[styles.standardFlex]}>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.container}>
            <Favourites pageWidth={width} />
            {/* UNCOMMENT ME TO DISPLAY SOME USEFUL TESTING BUTTONS FOR ADDING DATA TO API AND LOCAL STORAGE */}
            {/*<TestButtons />*/}
            <Text style={[styles.titleText, styles.searchTitle]}>
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
            <Text style={[styles.titleText, styles.searchResultsMarginBottom]}>
              {explorePageLabels(isStores).SEARCH_RESULTS}
            </Text>
            <SearchResults style={styles.pageContainer}>
              {OtherSearchResults()}
            </SearchResults>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  pageContainer: {
    paddingBottom: 75,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: isAndroid ? 50 : 20,
  },
  standardFlex: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  searchTitle: {
    marginBottom: 10,
  },
  searchResultsMarginBottom: {
    marginBottom: 0,
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
