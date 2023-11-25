import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import sizes from '../../res/sizes';

import images from '../../res/images';
import colors from '../../res/color';
import fonts from '../../res/fonts';
interface Props {
  isShow: boolean;
  toggleDate: () => void;
}
const ModalRoot = (props: Props) => {
  const [check, setCheck] = useState('1');

  const renderContent = () => (
    <View style={styles.content}>
      <View
        style={{
          marginTop: 10,
          alignItems: 'center',
          width: sizes._screen_width * 0.75,
          paddingBottom: 20,
        }}>
        <Text
          style={{
            color: colors.colorText,
            fontFamily: fonts.textRegular,
            fontSize: sizes._screen_width * 0.08,
          }}>
          Vitech xin chào!
        </Text>
        <Image source={images.logo} />
        <Text
          style={{
            color: colors.colorText,
            fontFamily: fonts.textRegular,
            fontSize: sizes._screen_width * 0.05,
            marginTop: 10,
          }}>
          Chúng tôi nhận thấy rằng thiết bị của bạn không phù hợp với phần mềm của chúng tôi.Do đó
          vui lòng đăng nhập trên thiết bị khác để chấm công.{' '}
        </Text>
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
export default ModalRoot;
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
