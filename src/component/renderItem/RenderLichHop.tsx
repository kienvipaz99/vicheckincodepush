import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import LichHop from '../../screen/LichHop';

interface RenderLichHopProps {
  item: any;
}

const RenderLichHop = (props: RenderLichHopProps) => {
  return (
    <View style={{marginTop: sizes._5sdp, marginBottom: 10}}>
      <Text style={styles.txt2}>{props.item.time}</Text>
      <View style={styles.item}>
        <View
          style={{
            backgroundColor: 'green',
            height: sizes._screen_height * 0.08,
            width: sizes._15sdp,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <View>
          <Text style={styles.txt}>{props.item.title}</Text>
          {props.item.time == undefined ? null : (
            <Text style={styles.txt1}>{props.item.content}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(RenderLichHop);

const styles = StyleSheet.create({
  container: {},
  item: {
    flex: 1,
    borderRadius: 10,

    marginRight: 10,
    backgroundColor: 'white',

    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
    marginLeft: sizes._20sdp,
  },
  txt2: {
    color: 'black',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
  },
  txt1: {
    color: colors.colorDargrey,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,
    marginLeft: sizes._20sdp,
  },
});
