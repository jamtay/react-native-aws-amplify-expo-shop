/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SearchBar from '../components/Search';
import DataTable from '../components/shared/DataTable';
import {Container, Content, Root} from 'native-base';
import Loading from '../components/shared/Loading';
import Favourites from '../components/Favourites';
import {getFavouriteIds} from '../components/Favourites/utils';
import TestButtons from '../../bin/TestButtons';

const HomePage = () => {
  const {
    storesSearch: {loading, stores, error},
    favouritesData: {favourites},
  } = useSelector(state => state, shallowEqual);

  return (
    <Root>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Container>
            <Content padder>
              {/* UNCOMMENT ME TO DISPLAY SOME USEFUL TESTING BUTTONS FOR ADDING DATA TO API AND LOCAL STORAGE */}
              {/* <TestButtons /> */}
              <Favourites />
              <SearchBar />
              <Loading isLoading={loading} />
              <DataTable
                data={stores}
                horizontal={false}
                favouriteStoreIds={getFavouriteIds(favourites)}
              />
            </Content>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </Root>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default HomePage;
