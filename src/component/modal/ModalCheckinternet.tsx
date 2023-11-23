import React, {Component} from 'react';
import {View, Text, Modal, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../../res/color';
import images from '../../res/images';

import sizes from '../../res/sizes';

const ModalCheckinternet = ({isShow}: any) => {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={images.nowifi} style={{height: 25, width: 25}} />
        <View style={{marginLeft: sizes._40sdp}}>
          <Text style={styles.toast}>Oops! Something went wrong with</Text>
          <Text style={styles.toast}>internet connection</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <Modal visible={isShow} animationType="slide" transparent={true} statusBarTranslucent={true}>
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
export default ModalCheckinternet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  content: {
    marginBottom: sizes._25sdp,
    margin: '2.5%',
    width: '95%',
    backgroundColor: colors.colorOrange1,
    height: sizes._70sdp,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._8sdp,
  },

  headerContainer: {},
  toast: {
    color: '#212121',
    fontWeight: '400',
    fontSize: 14,
  },
});
