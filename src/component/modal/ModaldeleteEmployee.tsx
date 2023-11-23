import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import sizes from '../../res/sizes';

import fonts from '../../res/fonts';
interface Props {
  show: boolean;
  toggleDate: () => void;
  delete: () => void;
}
const ModaldeleteEmployee = (props: Props) => {
  const close = () => {
    props.toggleDate();
  };

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}></View>
      <View style={styles.img}>
        <Text style={styles.txtInternet}>Bạn có đồng ý xoá tài khoản</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: sizes._20sdp,
          marginTop: sizes._16sdp,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity style={styles.btnWifi} onPress={() => props.delete()}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.textRegular,

                color: '#FFFFFF',
              }}>
              Đồng ý
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btndata} onPress={close}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.textRegular,

                color: '#FFFFFF',
              }}>
              Đóng
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <Modal
        visible={props.show}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}>
        <View style={styles.container}>
          <View style={styles.content}>{renderHeader()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModaldeleteEmployee;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    zIndex: 1,
    width: '80%',
    backgroundColor: '#FCFCFC',
    borderRadius: 16,
  },

  headerContainer: {
    left: sizes._25sdp,
    top: sizes._25sdp,
  },
  img: {
    marginTop: sizes._40sdp,
    alignItems: 'center',
  },
  txtInternet: {
    fontSize: 18,
    color: '#212121',
    marginTop: sizes._15sdp,
    fontFamily: fonts.textRegular,
  },
  textCheck: {
    marginTop: sizes._5sdp,
    fontWeight: '500',
    color: '#666666',
    fontSize: 16,
    fontFamily: fonts.textRegular,
  },
  btnWifi: {
    height: sizes._45sdp,
    backgroundColor: '#0BA7FF',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes._50sdp,
  },
  btndata: {
    height: sizes._45sdp,
    width: '30%',
    backgroundColor: '#ED6041',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._50sdp,
  },
});
