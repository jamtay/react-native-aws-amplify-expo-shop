import {API, graphqlOperation} from 'aws-amplify';
import {getStore} from '../src/graphql/queries';
import {createStore} from '../src/graphql/mutations';

const SIMPLE_ID = 'TEST_ID1';

const simpleData = {
  id: SIMPLE_ID,
  name: 'Booths test',
  description: 'Booths test',
  fullAddress: 'Test address',
  addressLine1: '<>',
  addressLine2: '<>',
  postcode: '<>',
  county: '<>',
  country: '<>',
};

export const fakeData = [
  {
    name: 'Booths',
    description: 'Booths St Annes',
    fullAddress:
      'Main Drive off Heyhouses Lane Lytham St Annes FY8 3UT Lancashire United Kingdom Great Britain',
    addressLine1: 'Main Drive',
    addressLine2: 'Lytham St Annes',
    postcode: 'FY8 3UT',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Lytham',
    fullAddress:
      'Haven Road Lytham FY8 5EG Lancashire United Kingdom Great Britain',
    addressLine1: 'Haven Road',
    addressLine2: 'Lytham',
    postcode: 'FY8 5EG',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Penrith',
    fullAddress:
      'Westgate House Brunswick Road CA11 7JU Penrith Cumbria United Kingdom Great Britain',
    addressLine1: 'Westgate House',
    addressLine2: 'Brunswick Road',
    postcode: 'CA11 7JU',
    county: 'Cumbria',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Barrowford',
    fullAddress:
      '3 Halstead Barrowford Nelson BB9 6HH Lancashire United Kingdom Great Britain',
    addressLine1: '3 Halstead',
    addressLine2: 'Nelson Barrowford',
    postcode: 'BB9 6HH',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Burscough',
    fullAddress:
      'Unit 1 Ringtail Retail Park Burscough Ormskirk L40 8AD Lancashire United Kingdom Great Britain',
    addressLine1: 'Unit 1 Ringtail Retail Park',
    addressLine2: 'Burscough Ormskirk',
    postcode: 'L40 8AD',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Carnforth',
    fullAddress:
      'Scotland Road Carnforth LA5 9JZ Lancashire United Kingdom Great Britain',
    addressLine1: 'Scotland Road',
    addressLine2: 'Carnforth',
    postcode: 'LA5 9JZ',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Chorley',
    fullAddress:
      'New Market Road Chorley PR7 1DB Lancashire United Kingdom Great Britain',
    addressLine1: 'New Market Road',
    addressLine2: 'Chorley',
    postcode: 'PR7 1DB',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Clitheroe',
    fullAddress:
      'Station Road Clitheroe BB7 2JT Lancashire United Kingdom Great Britain',
    addressLine1: 'Station Road',
    addressLine2: 'Clitheroe',
    postcode: 'BB7 2JT',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Fulwood',
    fullAddress:
      '256 270 256/270 Sharoe Green Lane Fulwood Preston PR2 9HD Lancashire United Kingdom Great Britain',
    addressLine1: '256/270 Sharoe Green Lane',
    addressLine2: 'Fulwood Preston',
    postcode: 'PR2 9HD',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Garstang',
    fullAddress:
      'Park Hill Road Garstang PR3 1EF Lancashire United Kingdom Great Britain',
    addressLine1: 'Park Hill Road',
    addressLine2: 'Garstang',
    postcode: 'PR3 1EF',
    county: 'Lancashire',
    country: 'GB',
  },
  {
    name: 'Booths',
    description: 'Booths Hesketh Bank',
    fullAddress:
      '24 Station Road Hesketh Bank Preston PR4 6SN Lancashire United Kingdom Great Britain',
    addressLine1: '24 Station Road',
    addressLine2: 'Hesketh Bank Preston',
    postcode: 'PR4 6SN',
    county: 'Lancashire',
    country: 'GB',
  },
];

const dataToCreate = [simpleData, ...fakeData];

const isDataLoaded = async () => {
  const response = await API.graphql(
    graphqlOperation(getStore, {
      id: SIMPLE_ID,
    }),
  );
  console.log('checking if DATA is already loaded');
  return response.data.getStore !== null;
};

export const createStores = async () => {
  const dataloaded = await isDataLoaded();
  if (!dataloaded) {
    console.log('DATA not loaded, loading data now');
    dataToCreate.forEach(async input => {
      const response = await API.graphql(
        graphqlOperation(createStore, {
          input: input,
        }),
      );
      console.log('Loaded DATA');
      console.log(response);
    });
  } else {
    console.error('DATA already loaded, not trying again');
  }
};
