import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {explorePageLabels, storePageLabels} from '../constants/labels';
import {getQueueTimes} from '../components/QueueTime/actions';
import {getMissingItems} from '../components/MissingItems/actions';
import {getAvailableItems} from '../components/AvailableItems/actions';
import {PAGE_NAMES} from './pageNames';
import {Root} from 'native-base';
import SearchResults from '../components/SearchResults';
import Result from '../components/SearchResults/Result';
import {COLOURS} from '../styles/colours';

const {width} = Dimensions.get('window');

const SingleStorePage = ({route, navigation}) => {
  const {store} = route.params;
  const storeID = store.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQueueTimes(storeID));
    dispatch(getMissingItems(storeID));
    dispatch(getAvailableItems(storeID));
  }, [storeID, dispatch]);

  const onNewRecordingButtonClick = () => {
    navigation.navigate(PAGE_NAMES.NEW_RECORDING_PAGE, {
      store: store,
    });
  };

  return (
    <Root>
      <SafeAreaView style={styles.standardFlex}>
        <View style={styles.standardFlex}>
          <ScrollView scrollEventThrottle={16}>
            <View style={styles.smallTopMargin}>
              <SearchResults>
                <Result width={width} item={store} topStyle={-30} isLarge />
              </SearchResults>
            </View>
            <View style={styles.section}>
              <Text style={styles.titleText}>{storePageLabels.AVG_Q_TIME}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.titleText}>{storePageLabels.WEEKS_MISSING}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.titleText}>{storePageLabels.WEEKS_AVAILABLE}</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Root>
  );
};

export default SingleStorePage;

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
    marginBottom: -20,
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
    marginTop: 20,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.DARK_PINK,
    paddingBottom: 30,
  },
});
