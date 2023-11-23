import React, {Component} from 'react';
import {View, Text, Modal, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';

import sizes from '../../res/sizes';
interface Props {
  val: any;
  isShow: any;
}
const ModalDelete = (props: Props) => {
  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: sizes._screen_width * 0.9,
        padding: 5,
      }}>
      <Image source={images.check} style={{height: 40, width: 40, marginLeft: 10}} />
      <View style={{marginLeft: sizes._20sdp, width: '79%'}}>
        <Text style={styles.toast}>{props.val}</Text>
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
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={{width: '100%', flex: 1, zIndex: 0}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderHeader()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalDelete;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  content: {
    marginBottom: sizes._25sdp,
    alignSelf: 'center',
    width: sizes._screen_width * 0.9,
    backgroundColor: '#bdffd2',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._8sdp,
  },

  toast: {
    color: 'black',
    fontFamily: fonts.textRegular,
    fontSize: 20,
  },
});
