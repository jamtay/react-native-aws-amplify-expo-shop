import 'react-native-gesture-handler';
/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomePage from './app/screens/HomePage';
import StorePage from './app/screens/StorePage';
import AddRecordingPage from './app/screens/AddRecordingPage';
import Explore from './app/screens/ExplorePage';

import {PAGE_NAMES} from './app/screens/pageNames';
import {headerOptions} from './app/constants/labels';

import Amplify from 'aws-amplify';
import store from './app/store/index';
import config from './aws-exports';

import {useFonts} from '@use-expo/font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from 'expo';

Amplify.configure(config);

// Add this line to remove the yellow warnings
// console.disableYellowBox = true;

const Stack = createStackNavigator();

const App = () => {
  let [isLoaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });

  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={PAGE_NAMES.EXPLORE_PAGE}>
          <Stack.Screen
            name={PAGE_NAMES.EXPLORE_PAGE}
            component={Explore}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={PAGE_NAMES.HOME_PAGE}
            component={HomePage}
            options={headerOptions}
          />
          <Stack.Screen
            name={PAGE_NAMES.STORE_PAGE}
            component={StorePage}
            options={headerOptions}
          />
          <Stack.Screen
            name={PAGE_NAMES.NEW_RECORDING_PAGE}
            component={AddRecordingPage}
            options={headerOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

// export default from './storybook';
export default App;
