import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import sizes from '../../res/sizes';
import images from '../../res/images';
import fonts from '../../res/fonts';
import BuntomCustom1 from '../BuntomCustom1';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
}
const ModalDate = (props: Props) => {
  const renderContent = () => (
    <View style={styles.content}>
      <Image source={images.notData} style={{height: 100, width: 100, marginTop: sizes._20sdp}} />
      <Text
        style={{
          color: 'black',
          fontSize: sizes._font_size_maxs,
          textAlign: 'center',
          width: '70%',
          fontFamily: fonts.textRegular,
        }}>
        Không có dữ liệu ngày công !!!
      </Text>
      <View style={{padding: 10, width: '80%'}}>
        <BuntomCustom1 text="Đóng" onpress={props.toggleDate} />
      </View>
    </View>
  );
  return (
    <View>
      <Modal
        visible={props.isShow}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}>
        <View style={styles.container1}>
          <TouchableWithoutFeedback onPress={props.toggleDate}>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderContent()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalDate;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._20sdp,
    position: 'absolute',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
  },
});
