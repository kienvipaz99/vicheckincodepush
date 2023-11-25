import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import sizes from '../res/sizes';
import {StyleSheet} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.view}>
      <View style={styles.view1}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

export default Loading;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: sizes._screen_width,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
  },
  view1: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 0,
    flex: 1,
    backgroundColor: 'white',
  },
});
