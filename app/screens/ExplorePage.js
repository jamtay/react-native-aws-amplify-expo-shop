import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from './components/Explore/Category';
import Home from './components/Explore/Home';
const {height, width} = Dimensions.get('window');

const Explore = () => {
  const [startHeaderHeight, setStartHeaderHeight] = useState();

  useEffect(() => {
    setStartHeaderHeight(
      Platform.OS === 'android' ? 100 + StatusBar.currentHeight : 80,
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView scrollEventThrottle={16}>
          <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              Here are your favourites
            </Text>
            <View style={{height: 130, marginTop: 20}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Category
                  imageUri={require('../assets/home.jpg')}
                  name="Home"
                />
                <Category
                  imageUri={require('../assets/experiences.jpg')}
                  name="Experiences"
                />
                <Category
                  imageUri={require('../assets/restaurant.jpg')}
                  name="Resturant"
                />
              </ScrollView>
            </View>
            <View
              style={{
                height: startHeaderHeight,
                backgroundColor: 'white',
                marginTop: 0,
                marginBottom: 0,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: 'white',
                  marginHorizontal: 20,
                  shadowOffset: {width: 0, height: 0},
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  elevation: 1,
                  marginTop: Platform.OS === 'android' ? 30 : 20,
                }}>
                <Icon name="ios-search" size={20} style={{marginRight: 10}} />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Try a stores name..."
                  placeholderTextColor="grey"
                  style={{
                    flex: 1,
                    fontWeight: '700',
                    backgroundColor: 'white',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                height: startHeaderHeight,
                backgroundColor: 'white',
                borderBottomWidth: 1,
                borderBottomColor: '#dddddd',
                marginTop: -30,
                marginBottom: 0,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: 'white',
                  marginHorizontal: 20,
                  shadowOffset: {width: 0, height: 0},
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  elevation: 1,
                  marginTop: Platform.OS === 'android' ? 30 : 20,
                }}>
                <Icon name="ios-search" size={20} style={{marginRight: 10}} />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Try a stores location..."
                  placeholderTextColor="grey"
                  style={{
                    flex: 1,
                    fontWeight: '700',
                    backgroundColor: 'white',
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: 0, paddingHorizontal: 20}}>
              <Text style={{fontSize: 24, fontWeight: '700'}}>
                Find a store
              </Text>
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
