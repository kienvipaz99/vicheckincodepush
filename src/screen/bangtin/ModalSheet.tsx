import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import sizes from '../../res/sizes';

import images from '../../res/images';
import fonts from '../../res/fonts';
import colors from '../../res/color';
import {FlatList} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import Buttomlike from '../../component/renderItem/Butomcustom/Buttomlike';
interface Props {
  refRBSheet: any;
  items?: any;
  handleChange?: any;
}
export default function ModalSheet(props: Props) {
  const [cmt, setCmt] = useState('');
  const RenderItem = ({item, index}: any) => {
    return (
      <View style={styles.item}>
        <Image source={item.img} style={styles.img} />
        <View style={styles.item2}>
          <Text style={styles.txt}>{item.user}</Text>
          <Text style={styles.txt1}>{item.title}</Text>
        </View>
      </View>
    );
  };
  return (
    /*@ts-ignore */
    <RBSheet
      ref={props.refRBSheet}
      closeOnDragDown={true}
      // keyboardAvoidingViewEnabled={true}
      closeOnPressMask={false}
      dragFromTopOnly={true}
      height={sizes._screen_height * 0.5}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      <View style={[styles.item3, {justifyContent: 'space-between', marginLeft: 15}]}>
        <View style={[styles.item3]}>
          <Image source={images.like} style={styles.icon2} />
          <Text style={[styles.txt, {marginLeft: sizes._10sdp}]}>{props.items.numberlike}</Text>
        </View>
        <Buttomlike items={props.items} handleChange={props.handleChange} />
      </View>
      <FlatList
        data={props.items.binhluan}
        renderItem={RenderItem}
        style={{marginBottom: 5, marginTop: 15}}
      />
      <TextInput
        style={styles.textinput}
        value={cmt}
        onChange={(val: any) => setCmt(val)}
        placeholder={'Viết bình luận'}
      />
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  item2: {
    alignSelf: 'flex-start',
    marginLeft: sizes._15sdp,
    backgroundColor: '#f0f2f5',
    padding: 10,
    borderRadius: sizes._15sdp,
  },
  item: {
    flexDirection: 'row',
    marginTop: sizes._10sdp,
    width: '80%',
    marginBottom: 10,
  },
  icon2: {height: 20, width: 20},
  item3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item5: {
    height: sizes._35sdp,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: sizes._25sdp,
    justifyContent: 'space-between',
  },
  txt3: {
    marginLeft: 5,
    fontSize: sizes._screen_width * 0.05,
    fontFamily: fonts.textBold,
    color: colors.colorText,
  },
  img: {
    height: sizes._40sdp,
    width: sizes._40sdp,
    borderRadius: 60,
    marginLeft: 15,
  },
  txt: {
    fontFamily: fonts.textBold,
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
  },
  txt1: {
    fontFamily: fonts.textRegular,
    color: colors.colorText,
    fontSize: sizes._font_size_big_big_large,
  },
  textinput: {
    height: sizes._50sdp,
    width: '95%',
    backgroundColor: '#f0f2f5',
    alignSelf: 'center',
    borderRadius: sizes._60sdp,
    paddingLeft: sizes._15sdp,
    marginBottom: sizes._10sdp,
    color: 'black',
    fontSize: sizes._font_size_big_big_large,
    fontFamily: fonts.textRegular,
  },
});
