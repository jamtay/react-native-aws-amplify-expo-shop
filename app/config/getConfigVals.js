import Constants from 'expo-constants';

export const getIsUsingMock = () => {
  return Constants.manifest.extra.isUsingMock || false;
};
