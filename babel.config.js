module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      '@babel/plugin-transform-flow-strip-types',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-throw-expressions',
    ],
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
  };
};
