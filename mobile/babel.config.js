module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // react-native-worklets/plugin powers Reanimated 4 and must stay last.
  plugins: ['react-native-worklets/plugin'],
};
