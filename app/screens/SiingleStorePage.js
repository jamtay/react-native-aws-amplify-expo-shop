import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions, Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addNewRecordingModal, storePageLabels} from '../constants/labels';
import {addQueueTime, getQueueTimes} from '../components/QueueTime/actions';
import {getMissingItems} from '../components/MissingItems/actions';
import {getAvailableItems} from '../components/AvailableItems/actions';
import SearchResults from '../components/SearchResults';
import Result from '../components/SearchResults/Result';
import AverageQueueTime from '../components/QueueTime/AverageQueueTime';
import ActivityQueueTime from '../components/QueueTime/ActivityQueueTime';
import ActivityMissingItems from '../components/MissingItems/ActivityMissingItems';
import ActivityAvailableItems from '../components/AvailableItems/ActivityAvailableItems';
import Section from '../components/shared/Section';
import {PAGE_NAMES} from './pageNames';
const {width} = Dimensions.get('window');

/**
 * A page displaying the information about single store. Including name, address and activity/averages
 */
const SingleStorePage = ({navigation, route}) => {
  const {store} = route.params;
  const storeID = store.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQueueTimes(storeID));
    dispatch(getMissingItems(storeID));
    dispatch(getAvailableItems(storeID));
  }, [storeID, dispatch]);

  return (
    <SafeAreaView style={styles.standardFlex}>
      <View style={styles.standardFlex}>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.smallTopMargin}>
            <SearchResults>
              <Result width={width} item={store} topStyle={-35} isLarge />
            </SearchResults>
          </View>
          <Section
            store={store}
            title={storePageLabels.AVG_Q_TIME}
            textLabel={addNewRecordingModal.NEW_QUEUE_TIME}
            onDataSubmit={async qTime => {
              dispatch(await addQueueTime(storeID, qTime));
              navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                store: store,
              });
            }}>
            <AverageQueueTime
              style={styles.horizontalPagePadding}
              fontStyle={styles.dataText}
            />
            <ActivityQueueTime
              style={styles.horizontalPagePadding}
              fontStyle={styles.dataText}
            />
          </Section>
          <Section
            store={store}
            title={storePageLabels.WEEKS_MISSING}
            textLabel={addNewRecordingModal.NEW_QUEUE_TIME}
            onDataSubmit={async qTime => {
              dispatch(await addQueueTime(storeID, qTime));
              navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                store: store,
              });
            }}>
            <ActivityMissingItems
              style={styles.horizontalPagePadding}
              fontStyle={styles.dataText}
            />
          </Section>
          <Section
            store={store}
            title={storePageLabels.WEEKS_AVAILABLE}
            textLabel={addNewRecordingModal.NEW_QUEUE_TIME}
            onDataSubmit={async qTime => {
              dispatch(await addQueueTime(storeID, qTime));
              navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                store: store,
              });
            }}>
            <ActivityAvailableItems
              style={styles.horizontalPagePadding}
              fontStyle={styles.dataText}
            />
          </Section>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SingleStorePage;

const styles = StyleSheet.create({
  horizontalPagePadding: {
    paddingHorizontal: 20,
  },
  standardFlex: {
    flex: 1,
  },
  dataText: {
    fontSize: 18,
  },
  smallTopMargin: {
    marginTop: 20,
  },
});
