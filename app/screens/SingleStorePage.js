import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addNewRecordingModal, storePageLabels} from '../constants/labels';
import {addQueueTime, getQueueTimes} from '../components/QueueTime/actions';
import {
  addMissingItems,
  getMissingItems,
} from '../components/MissingItems/actions';
import {
  addAvailableItems,
  getAvailableItems,
} from '../components/AvailableItems/actions';
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
              <Result width={width} item={store} topStyle={-15} isLarge />
            </SearchResults>
          </View>
          <Section
            store={store}
            title={storePageLabels.AVG_Q_TIME}
            textLabel={addNewRecordingModal.NEW_QUEUE_TIME}
            onDataSubmit={async qTime => {
              dispatch(await addQueueTime(storeID, qTime[0]));
              navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                store: store,
              });
            }}
            keyboardType="number-pad">
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
            textLabel={addNewRecordingModal.NEW_MISSING_ITEMS}
            onDataSubmit={async missingItems => {
              dispatch(await addMissingItems(storeID, missingItems));
              navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                store: store,
              });
            }}
            keyboardType="default"
            multiItemEntry>
            <ActivityMissingItems
              style={styles.horizontalPagePadding}
              fontStyle={styles.dataText}
            />
          </Section>
          <View style={styles.finalSectionPadding}>
            <Section
              store={store}
              title={storePageLabels.WEEKS_AVAILABLE}
              textLabel={addNewRecordingModal.NEW_AVAILABLE_ITEMS}
              onDataSubmit={async availableItems => {
                dispatch(await addAvailableItems(storeID, availableItems));
                navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                  store: store,
                });
              }}
              keyboardType="default"
              multiItemEntry>
              <ActivityAvailableItems
                style={styles.horizontalPagePadding}
                fontStyle={styles.dataText}
              />
            </Section>
          </View>
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
    marginBottom: -20,
  },
  finalSectionPadding: {
    marginBottom: 75,
  },
});
