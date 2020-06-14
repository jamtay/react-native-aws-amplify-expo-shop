import Constants from 'expo-constants';
import fetch from 'node-fetch';
import {API, graphqlOperation} from 'aws-amplify';
import {createStore} from '../src/graphql/mutations';

/**
 * To use this you must have the expo constants set.
 * Create a config/secret.config.js and run `npm run env:secret`
 * The TestButtons.js file which can be found in ExplorePage.js can be used as a visual way to use this method
 *
 * Load data from a search string into dynamoDB/Elastic search
 * Query Here API to get data, transform it and post it to graphql endpoint
 * @param searchString Name of the store to find data for
 */
export const loadRealDataFromHereApiToElasticSearch = async searchString => {
  const encodedSearchString = encodeURIComponent(searchString);
  const app_id = Constants.manifest.extra.hereApiId;
  const app_code = Constants.manifest.extra.hereApiCode;

  const ukSearchArea = '54.3562%2C-3.2965%3Br%3D565116';
  let searchUrl =
    'https://places.ls.hereapi.com/places/v1/discover/search?' +
    `q=${encodedSearchString}` +
    `&in=${ukSearchArea}` +
    '&Accept-Language=en-GB%2Cen%3Bq%3D0.9%2Ces-ES%3Bq%3D0.8%2Ces%3Bq%3D0.7%2Cen-US%3Bq%3D0.6' +
    `&app_id=${app_id}` +
    `&app_code=${app_code}`;

  let numberOfRequests = 0;
  let numberOfResultsReturned = 0;
  let allItems = [];
  let itemNames = [];

  do {
    numberOfRequests = numberOfRequests + 1;
    console.log(
      `Making request number ${numberOfRequests} for search string: ${searchString}`,
    );
    const results = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'en-GB,en;q=0.9,es-ES;q=0.8,es;q=0.7,en-US;q=0.6',
      },
    });

    const returnedData = await results.json();
    if (!results.ok) {
      throw new Error(
        `Data not fetch properly from here api for search string: ${searchString}. Returned code: ${
          results.status
        } and error ${
          returnedData.error
        } with message ${returnedData.error_description ||
          returnedData.message}`,
      );
    }
    // For some reason on the first call the response is wrapped in a results. Then afterwards it is not
    const items =
      numberOfRequests === 1 ? returnedData.results.items : returnedData.items;
    console.log(
      `Returned ${items.length} results for search string: ${searchString}`,
    );
    allItems.push(...items);
    const nextUrl =
      numberOfRequests === 1 ? returnedData.results.next : returnedData.next;
    numberOfResultsReturned += items.length;
    searchUrl = nextUrl;
  } while (searchUrl !== undefined);

  console.log('Total number of requests made ' + numberOfRequests);
  console.log('Total number of results returned ' + numberOfResultsReturned);
  console.log('Now uploading results to AWS...');
  // UK government postcode regex
  const postcodeRegex = new RegExp(
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/g,
  );
  // Find anything with numbers and letters in if the postcodeRegex cannot find a postcode
  const secondaryPostcodeRegex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/g);

  // Display - description for image to display, description for title, postcode on large cards, addressLine1, addressLine2 and county for address
  // Search - description, fullAddress
  for (const item of allItems) {
    const address = item.vicinity.split('<br/>');
    const fullAddress = address.join(' ');
    let postcode = '';
    for (const addressLine of address) {
      if (postcodeRegex.test(addressLine)) {
        postcode = addressLine;
      }
    }
    if (postcode === '') {
      for (const addressLine of address) {
        if (
          addressLine.length < 8 &&
          secondaryPostcodeRegex.test(addressLine)
        ) {
          postcode = addressLine;
        }
      }
    }

    const addressesWithoutPostcode = address.filter(
      addressLine => addressLine !== postcode,
    );
    const description = `${searchString} ${addressesWithoutPostcode[1] || addressesWithoutPostcode[0] || ''}`;
    itemNames.push(description);
    await API.graphql(
      graphqlOperation(createStore, {
        input: {
          name: searchString,
          description: description,
          fullAddress: fullAddress,
          addressLine1: addressesWithoutPostcode[0] || '',
          addressLine2: addressesWithoutPostcode[1] || '',
          addressLine3: addressesWithoutPostcode[2] || '',
          postcode: postcode || '',
          country: 'GB',
          longitude: item.position[0] || '',
          latitude: item.position[1] || '',
          itemsRecorded: [],
        },
      }),
    );
  }
  return itemNames;
};
