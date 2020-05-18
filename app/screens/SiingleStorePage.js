import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {storePageLabels} from '../constants/labels';
import {getQueueTimes} from '../components/QueueTime/actions';
import {getMissingItems} from '../components/MissingItems/actions';
import {getAvailableItems} from '../components/AvailableItems/actions';
import {PAGE_NAMES} from './pageNames';
import {Icon, Root} from 'native-base';
import SearchResults from '../components/SearchResults';
import Result from '../components/SearchResults/Result';
import {COLOURS} from '../styles/colours';
import {BUTTONS} from '../styles/button';
import AverageQueueTime from '../components/QueueTime/AverageQueueTime';
import ActivityQueueTime from '../components/QueueTime/ActivityQueueTime';
import ActivityMissingItems from '../components/MissingItems/ActivityMissingItems';
import ActivityAvailableItems from '../components/AvailableItems/ActivityAvailableItems';

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
                <Result width={width} item={store} topStyle={-35} isLarge />
              </SearchResults>
            </View>
            <View style={styles.border}>
              <View style={styles.section}>
                <Text style={styles.titleText}>
                  {storePageLabels.AVG_Q_TIME}
                </Text>
                <TouchableHighlight
                  onPress={onNewRecordingButtonClick}
                  activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
                  underlayColor={BUTTONS.CLICK_COLOUR}>
                  <Icon
                    name="add-circle-outline"
                    type="MaterialIcons"
                    style={styles.button}
                  />
                </TouchableHighlight>
              </View>
              <AverageQueueTime
                style={styles.horizontalPagePadding}
                fontStyle={styles.dataText}
              />
              <ActivityQueueTime
                style={styles.horizontalPagePadding}
                fontStyle={styles.dataText}
              />
            </View>
            <View style={styles.border}>
              <View style={styles.section}>
                <Text style={styles.titleText}>
                  {storePageLabels.WEEKS_MISSING}
                </Text>
                <TouchableHighlight
                  onPress={onNewRecordingButtonClick}
                  activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
                  underlayColor={BUTTONS.CLICK_COLOUR}>
                  <Icon
                    name="add-circle-outline"
                    type="MaterialIcons"
                    style={styles.button}
                  />
                </TouchableHighlight>
              </View>
              <ActivityMissingItems
                style={styles.horizontalPagePadding}
                fontStyle={styles.dataText}
              />
            </View>
            <View style={styles.border}>
              <View style={styles.section}>
                <Text style={styles.titleText}>
                  {storePageLabels.WEEKS_AVAILABLE}
                </Text>
                <TouchableHighlight
                  onPress={onNewRecordingButtonClick}
                  activeOpacity={BUTTONS.IMAGE_CLICK_OPACITY}
                  underlayColor={BUTTONS.CLICK_COLOUR}>
                  <Icon
                    name="add-circle-outline"
                    type="MaterialIcons"
                    style={styles.button}
                  />
                </TouchableHighlight>
              </View>
              <ActivityAvailableItems
                style={styles.horizontalPagePadding}
                fontStyle={styles.dataText}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Root>
  );
};

export default SingleStorePage;

const styles = StyleSheet.create({
  horizontalPagePadding: {
    paddingHorizontal: 20,
  },
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
  dataText: {
    fontSize: 18,
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
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.DARK_PINK,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    color: COLOURS.DARK_PINK,
    marginRight: 10,
  },
});
