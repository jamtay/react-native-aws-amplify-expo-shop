/**
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Container, Content, Root, Text, Button, Icon} from 'native-base';
import TitleSection from '../components/shared/TitleSection';
import {storePageLabels} from '../constants/labels';
import SubTitleSection from '../components/shared/SubTitleSection';
import AddressTitle from '../components/StorePage/AddressTitle';
import {PAGE_NAMES} from '../screens/pageNames';
import AverageQueueTime from '../components/QueueTime/AverageQueueTime';
import {useDispatch} from 'react-redux';
import {getQueueTimes} from '../components/QueueTime/actions';
import {getMissingItems} from '../components/MissingItems/actions';
import ActivityQueueTime from '../components/QueueTime/ActivityQueueTime';
import ActivityMissingItems from '../components/MissingItems/ActivityMissingItems';
import {getAvailableItems} from '../components/AvailableItems/actions';
import ActivityAvailableItems from '../components/AvailableItems/ActivityAvailableItems';

const StorePage = ({route, navigation}) => {
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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Container>
            <Content padder>
              <View style={{flexDirection: 'row'}}>
                <TitleSection titleText={store.name} />
                <Text style={styles.address}>{store.description}</Text>
                <Button
                  transparent
                  style={styles.buttons}
                  onPress={onNewRecordingButtonClick}>
                  <Icon name="new-box" type="MaterialCommunityIcons" />
                </Button>
                <Button transparent style={styles.buttons}>
                  <Icon name="heart-multiple" type="MaterialCommunityIcons" />
                </Button>
              </View>
              <AddressTitle
                titleText={storePageLabels.ADDRESS_SUB_TITLE}
                bodyText={`: ${store.addressLine1}, ${store.addressLine2}, ${
                  store.county
                }`}
              />
              <AddressTitle
                titleText={storePageLabels.POSTCODE_SUB_TITLE}
                bodyText={`: ${store.postcode}`}
              />
              <TitleSection titleText={storePageLabels.ACTIVITY_OVERVIEW} />
              <SubTitleSection titleText={storePageLabels.AVG_Q_TIME} />
              <AverageQueueTime />
              <TitleSection titleText={storePageLabels.ACTIVITY_HISTORY} />
              <ActivityQueueTime />
              <ActivityMissingItems />
              <ActivityAvailableItems />
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
  address: {
    marginLeft: 15,
    marginTop: 20,
  },
  buttons: {
    marginTop: 5,
  },
});

export default StorePage;
