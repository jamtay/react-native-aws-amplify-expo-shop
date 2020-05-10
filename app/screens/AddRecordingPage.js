/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Container, Content, Root} from 'native-base';
import TitleSection from '../components/shared/TitleSection';
import NewQueueTime from '../components/QueueTime/NewQueueTime';
import NewMissingItem from '../components/MissingItems/NewMissingItem';
import {addNewRecordingPageLabels} from '../constants/labels';
import NewAvailableItem from '../components/AvailableItems/NewAvailableItems';

const AddRecordingPage = ({route}) => {
  const {store} = route.params;

  return (
    <Root>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Container>
            <Content padder>
              <TitleSection
                titleText={addNewRecordingPageLabels.ADD_NEW_TITLE}
              />
              <NewQueueTime store={store} />
            </Content>
            <Content>
              <TitleSection
                titleText={addNewRecordingPageLabels.ADD_NEW_MISSING_ITEM}
              />
              <NewMissingItem store={store} />
            </Content>
            <Content>
              <TitleSection
                titleText={addNewRecordingPageLabels.ADD_NEW_AVAILABLE_ITEM}
              />
              <NewAvailableItem store={store} />
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

export default AddRecordingPage;
