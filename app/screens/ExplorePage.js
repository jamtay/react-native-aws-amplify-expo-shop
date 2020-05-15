import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './components/Explore/Home';
import {shallowEqual, useSelector} from 'react-redux';
import Favourites from '../components/Favourites';
import SearchBar from '../components/Search';
import SearchResults from '../components/SearchResults';

const {height, width} = Dimensions.get('window');

const Explore = () => {
  const {
    storesSearch: {loading, stores, error},
    favouritesData: {favourites},
  } = useSelector(state => state, shallowEqual);

  return (
    <SafeAreaView style={styles.standardFlex}>
      <View style={styles.standardFlex}>
        <ScrollView scrollEventThrottle={16}>
          <View style={{...styles.standardFlex, backgroundColor: 'white', paddingTop: 20}}>
            <Favourites />
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                marginTop: 20,
                paddingHorizontal: 20,
              }}>
              Find a store
            </Text>
            <SearchBar />
            <View style={{marginTop: 0}}>
              <Text style={{fontWeight: '100', marginTop: 10, paddingHorizontal: 20}}>
                A list of stores matching your search criteria
              </Text>
              <View style={{marginTop: 0}}>
                <SearchResults>
                  <Home
                    width={width * 2}
                    name="The main result"
                    type="THE MAIN RESULT"
                    price={82}
                    rating={5}
                  />
                </SearchResults>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              More search results
            </Text>
            <SearchResults>
              <Home
                width={width}
                name="The Cozy Place"
                type="PRIVATE ROOM - 2 BEDS"
                price={82}
                rating={4}
              />
              <Home
                width={width}
                name="The Cozy Place"
                type="PRIVATE ROOM - 2 BEDS"
                price={82}
                rating={4}
              />
              <Home
                width={width}
                name="The Cozy Place"
                type="PRIVATE ROOM - 2 BEDS"
                price={82}
                rating={4}
              />
            </SearchResults>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  standardFlex: {
    flex: 1,
  },
});
