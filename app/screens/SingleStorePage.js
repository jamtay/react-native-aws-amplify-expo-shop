import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import SearchResults from '../components/SearchResults';
import Result from '../components/SearchResults/Result';
import AverageQueueTime from '../components/QueueTime/AverageQueueTime';
import ActivityQueueTime from '../components/QueueTime/ActivityQueueTime';
import Section from '../components/shared/Section';
import ItemsActivity from '../components/Items';
import {addItems, getItems} from '../components/Items/actions';
import {addQueueTime, getQueueTimes} from '../components/QueueTime/actions';
import {PAGE_NAMES} from './pageNames';
import {ITEM_TYPES} from '../components/Items/constants';
import {addNewRecordingModal, storePageLabels} from '../constants/labels';
const {width} = Dimensions.get('window');

/**
 * A page displaying the information about single store. Including name, address and activity/averages
 * A modal is present in each section, which allows adding store activity
 */
const SingleStorePage = ({navigation, route}) => {
  const {store} = route.params;
  const storeID = store.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQueueTimes(storeID));
    dispatch(getItems(storeID, ITEM_TYPES.MISSING));
    dispatch(getItems(storeID, ITEM_TYPES.AVAILABLE));
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
            title={storePageLabels.WEEKS_MISSING}
            textLabel={addNewRecordingModal.NEW_MISSING_ITEMS}
            onDataSubmit={async missingItems => {
              dispatch(
                await addItems(storeID, missingItems, ITEM_TYPES.MISSING),
              );
              navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                store: store,
              });
            }}
            keyboardType="default"
            multiItemEntry>
            <ItemsActivity
              style={styles.horizontalPagePadding}
              fontStyle={styles.dataText}
              type={ITEM_TYPES.MISSING}
            />
          </Section>
          <View style={styles.finalSectionPadding}>
            <Section
              title={storePageLabels.WEEKS_AVAILABLE}
              textLabel={addNewRecordingModal.NEW_AVAILABLE_ITEMS}
              onDataSubmit={async availableItems => {
                dispatch(
                  await addItems(storeID, availableItems, ITEM_TYPES.AVAILABLE),
                );
                navigation.navigate(PAGE_NAMES.STORE_PAGE, {
                  store: store,
                });
              }}
              keyboardType="default"
              multiItemEntry>
              <ItemsActivity
                style={styles.horizontalPagePadding}
                fontStyle={styles.dataText}
                type={ITEM_TYPES.AVAILABLE}
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
