# Intro

This is a React Native application, with a backend written using GraphQL. The GraphQL server was generated by AWS amplify from the schema found in amplify/backend/api/shopqueuefinder/schema.graphql

## Technologies
- React Native 
- Expo
- Jest, Detox, Storybook
- GraphQL
- AWS Amplify
- ElasticSearch, DynamoDB

## Demo 

![Demo application](demo.gif)

# Running locally

The api is deployed to AWS AppSync but the frontend can be run using a simulator. Follow these steps: https://reactnative.dev/docs/environment-setup

## Running with expo

Run `npm start` Which will open an expo console using tunnel. Once the QR code is generated, then scan the QR code in the expo app to use this app on a device. Can also select to run on a simulator from this menu

**Note**: Expo-cli only supports >=10.13.0 <11.0.0 (Active LTS), >=12.0.0 <13.0.0 (Active LTS), and  >=13.0.0 <14.0.0 (Current Release) versions of node. 
Run `nvm use 13.14.0` and use **nvm** to manage node versions


## Running on IOS

Once the simulator is installed following the above links commands, run
`react-native run-ios` to start the app in the simulator. Can hit `R` to reload the app after changing the source code.

### Issues

I had some issues setting up graphql connections and development. `Error: @react-native-community/netinfo: NativeModule.RNCNetInfo is null` To overcome this I had to run `npm install @react-native-community/netinfo` then following this run `cd ios && pod install && cd ..` to install the pod

## Running on android

Again, follow the instructions in the dev setup link. Make sure you have AVDs installed by going to Android studio > configure > AVD manager. The download an AVD.

Find an emulator to use by running `emulator -list-avds` Then run one of those emulators with a command such as `emulator -avd Android_Accelerated_Nougat`. I have this command aliased such as
`alias startEmulatorAndroid='emulator -avd Android_Accelerated_Nougat'`

Then run `react-native run-android` to run the app

### Things to remember

Set environment variables:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export ANDROID_SDK_ROOT=$ANDROID_HOME
export ANDROID_AVD_HOME=~/.android/avd
```

## Storybooks

1. `export default from './storybook';` from App.js, instead of `export default App;` 
2. `npm start`
3. Run on simulator or device
4. `npm run storybook` 

# Environment variables with expo

Using the https://github.com/manoj-nama/expo-env#readme package for setting environment variables.
See the `./config` folder for config files, and run `npm run env:<ENV_NAME>` where env name is the same as the file name (e.g staging, mock, development) 
and there is a corresponding npm script (e.g `"env:mock": "expo-env --env=mock --configPath=./config",`) for the environment.

To access the variable a function like this can be used

```js
import Constants from 'expo-constants';

export const getIsUsingMock = () => {
  return Constants.manifest.extra.isUsingMock || false;
};
```

# Getting store data from HERE api

1. Create a file called `config/secret.config.js`
2. Add the code below
3. Run the command `npm run env:secret` to set these environment variables
4. Expose the `TestButtons` by uncommenting the code in `app/screens/ExplorePage.js` 
5. Click button to load data from home page.  Make sure to change `const searchString = ` in `/bin/TestButtons.js` to the data you want to upload, e.g the stores name
6. **Important** Before committing make sure to run `npm run env:development`
7. There is a husky pre-commit setup to do this


```.javascript
module.exports = {
  isUsingMock: true,
  hereApiKey: '<ADD_API_KEY_HERE>',
};
```

Where the values are stored in `Constants.manifest.extra`

# Mocking API

1. Run mock with `amplify mock`
2. Change `aws-exports.js` file to point to `http://localhost:20002/graphql` and not `http://192.168.1.245:20002/graphql` for aws_appsync_graphqlEndpoint
3. Visit `http://localhost:20002/graphql` and add data to API
4. Change to use mock config `npm run env:mock`
5. Run frontend with `npm start` then start the simulator or device

**Note**: Elasticsearch cannot be mocked. Therefore when `npm run env:mock` is ran, it just uses list functions (dynamoDB) so searching returns results but does not execute the actual search

# Frontend tests

1. npm run ios
2. npm run detox:build
3. npm run detox:test

## TODO for testing

1. Fix eslint issues in the spec file. When I added jest and detox eslint plugins it broken the tests last time

# Design

Currently using nativebase

## Icons

Icons can be found here https://oblador.github.io/react-native-vector-icons/ and it looks as if it is using Ionicons

To use other icons pass in the correct type from "AntDesign, Ionicons, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, Foundation, MaterialIcons, MaterialCommunityIcons, Octicons, Roboto, rubicon-icon-font, SimpleLineIcons, Zocial" like this

```jsx
<Button transparent>
  <Icon name="heart-multiple" type="MaterialCommunityIcons" />
</Button>
```

# Backend/GraphQL

To change the backend, update the schema found at `amplify/backend/api/shopqueuefinder/schema.graphql`. Then run `amplify api gql-compile` and `amplify push`. This will prompt you to override the queries, mutations and subscriptions that are auto-generated. Select yes, and no code has to be manually created!

## Cleaning up and recreating

### Delete everything (Doesn't seem to recover very well. Cannot delete the environment anymore or add anything to it)

- Delete elastic search
- Delete DynamoDBs
- Delete App Sync

### Delete only elasticsearch

- Run `amplify push` after removing searchable from in `amplify/backend/api/shopqueuefinder/schema.graphql`
- Find instance through AWS app sync data sources and delete
- Delete data from DynamoDB so can reload the next day. Or run a reindex in elasticsearch the next day if you haven't delted the data

### To recreate if only deleted elastic search (20 mins roughly)

- Run `amplify push` after adding searchable from in `amplify/backend/api/shopqueuefinder/schema.graphql`
- This might take a while or might fail. Can check progress in AWS amplify service in AWS: https://eu-west-2.console.aws.amazon.com/amplify/home?region=eu-west-2#/d12fs2j2ibk8c0. Click backend environments > select environment > order by time. Can view more in Cloud formation. Once had to rollback as it was stuck. This can be done by finding the active in progress deployment and clicking actions and rollback. After it has rolledback, run `amplify push` again and try again (But must wait until rollback is complete)

### To recreate if deleted everything

Run `amplify init` and call the env something new

## DynamoDB

DynamoDB is used as the data source. To see the data source and even inline edit the data go to the management console at https://eu-west-2.console.aws.amazon.com/appsync/home?region=eu-west-2#/apis

The select the app. Go to data sources in the left hand side menu. Then you can view and edit the data.

## Example queries and mutations

Go to https://eu-west-2.console.aws.amazon.com/appsync/home?region=eu-west-2#/apis. Then select the app and select queries in the menu.

```graphql
mutation CreateStore {
  createStore(
    input: {
      name: "A Name again"
      description: "This is the field that gets searched for name
      fullAddress: "This is the address field that will be searched"
      itemsRecorded: ["Toilet paper", "Second thing"]
      addressLine1: "line 1"
      addressLine2: "line2"
      postcode: "postcode"
      country: "country"
    }
  ) {
    id
    addressLine1
    addressLine2
    postcode
  }
}

mutation CreateRecording {
  createRecording(
    input: {
      type: QUEUE_TIME
      queueTime: 100
      floatTimestamp: 1588508779
      storeID: "29d7c2c2-b5a8-4049-ba3f-cd59fdca9af6"
    }
  ) {
    id
    store {
      name
      description
    }
  }
}

query GetStores {
  listStores(limit: 5) {
    items {
      name
      id
      addressLine1
      addressLine2
      recordings {
        items {
          id
          type
          queueTime
        }
      }
    }
  }
}

query GetRecordings {
  listRecordings(limit: 5) {
    items {
      id
      storeID
    }
  }
}

query FilterByRecording {
  listRecordings(
    filter: {storeID: {eq: "4989adb4-8036-4454-bc0a-24a81a5c1814"}}
  ) {
    items {
      store {
        name
      }
    }
  }
}

query FilterByQueueTimeRecording {
  listRecordings(filter: {queueTime: {gt: 99}}) {
    items {
      store {
        name
      }
      queueTime
    }
  }
}

query FilterStores {
  listStores(limit: 100, filter: {name: {contains: "Booths"}}) {
    items {
      id
      name
    }
  }
}

//description and fullAddress are the searchable fields
query SearchStores {
  searchStores(sort:{
    field:name,
    direction:asc
  }, limit:4, filter: {
    and: [{
      description: {
        regexp:"aa.*"
      }
    }, {
      description:{
        regexp:"a.*"
      }
    }, {
      fullAddress:{
        regexp:"3.*"
      }
    }, {
      fullAddress:{
        regexp:"halst.*"
      }
    }]
  }) {
    items {
      name
      addressLine1
      description
    }
  }
}

query getLastHourRecordings {
  searchRecordings(filter:{
    storeID:{
      eq:"29d7c2c2-b5a8-4049-ba3f-cd59fdca9af6"
    },
    and:[{
      floatTimestamp:{
        range: [1588508778, 1588508780]
      }
    }]
  }) {
    items {
      id
      queueTime
      store {
        name
        description
      }
    }
  }
}
```
