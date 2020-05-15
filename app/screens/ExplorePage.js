import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './components/Explore/Home';
import {shallowEqual, useSelector} from 'react-redux';
import Favourites from '../components/Favourites';
import SearchBar from '../components/Search';

const {height, width} = Dimensions.get('window');

const Explore = () => {

  const {
    storesSearch: {loading, stores, error},
    favouritesData: {favourites},
  } = useSelector(state => state, shallowEqual);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView scrollEventThrottle={16}>
          <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
            <Favourites />
            <Text style={{fontSize: 24, fontWeight: '700', marginTop: 20, paddingHorizontal: 20}}>
              Find a store
            </Text>
            <SearchBar />
            <View style={{marginTop: 0, paddingHorizontal: 20}}>

              <Text style={{fontWeight: '100', marginTop: 10}}>
                A list of stores matching your search criteria
              </Text>
              <View style={{width: width - 40, height: 200, marginTop: 20}}>
                <Image
                  style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: 'cover',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                  }}
                  source={require('../assets/home.jpg')}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 40}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              More search results
            </Text>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
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
            </View>
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
});
