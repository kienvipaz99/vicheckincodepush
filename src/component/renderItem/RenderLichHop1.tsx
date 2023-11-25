import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';

interface RenderLichHop1Props {}

const RenderLichHop1 = (props: RenderLichHop1Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', marginTop: sizes._30sdp}}>
      <Text style={styles.txt}>Chưa có lịch họp nào</Text>
    </View>
  );
};

export default React.memo(RenderLichHop1);

const styles = StyleSheet.create({
  container: {},
  txt: {
    color: 'black',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
    marginLeft: sizes._20sdp,
  },
});
