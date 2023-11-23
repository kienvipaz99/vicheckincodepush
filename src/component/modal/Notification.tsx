import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import colors from '../../res/color';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
  data: any;
}
const Notification = (props: Props) => {
  const renderHeader = () => (
    <>
      <Text style={styles.cc}>{props.data?.title}</Text>
      <View style={styles.item1}>
        <Text style={styles.txt}>{props.data?.body}</Text>
        <TouchableOpacity style={styles.btn} onPress={props.toggleDate}>
          <Text style={styles.txtbtn}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View>
      <Modal
        visible={props.isShow}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}>
        <View style={styles.container1}>
          <TouchableWithoutFeedback>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderHeader()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default Notification;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: sizes._screen_width * 0.8,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: sizes._20sdp,
    position: 'absolute',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  cc: {
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_maxs,
    color: 'black',
    marginLeft: 20,
    marginTop: sizes._10sdp,
  },
  txtbtn: {
    color: 'white',
    fontSize: sizes._font_size_max,
    fontFamily: fonts.textRegular,
  },
  item1: {
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
  },
  btn: {
    height: 50,
    width: '40%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes._20sdp,
    borderRadius: 10,
    marginBottom: sizes._20sdp,
  },
});
