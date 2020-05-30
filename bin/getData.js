// TODO: Search here api for a string, e.g Booths
// 1. Save results to a file in a data directory (Which I will move out of repo at the end of data gathering) using fileName booths_pageNumber.json
// 2. Post to GraphQL endpoint each response
// 3. Repeat 1 & 2 until no more `res.results.next`
import Constants from 'expo-constants';

export const getData = searchString => {
  console.log(Constants.manifest.extra.hereApiKey);
};
