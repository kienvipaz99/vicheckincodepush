import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  NativeModules,
  Linking,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../../res/images';
import sizes from '../../res/sizes';
import ICon from 'react-native-vector-icons/FontAwesome';
import fonts from '../../res/fonts';

const ModalOpenSettingWifi = ({show1, toggleDate}: any) => {
  const openWifi = () => {
    Platform.OS === 'ios'
      ? Linking.openURL('App-Prefs:root=WIFI')
      : NativeModules.OpenSettings.openWifiSetting((data: any) => data);
  };
  const openData = () => {
    Platform.OS === 'ios'
      ? Linking.openURL('App-Prefs:root=MOBILE_DATA_SETTINGS_ID')
      : NativeModules.OpenSettings.openDataSetting((data: any) => data);
  };
  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}></View>
      <View style={styles.img}>
        <Image
          resizeMode="contain"
          source={images.notData}
          style={{height: sizes._csreen_height * 0.19, width: '80%'}}
        />
        <Text style={styles.txtInternet}>Không có Internet</Text>
        <Text style={styles.textCheck}>Kiểm tra kết nối Internet</Text>
        <Text style={styles.textCheck}>và thử lại</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: sizes._20sdp,
          marginTop: sizes._16sdp,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity style={styles.btnWifi} onPress={openWifi}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ICon name="wifi" color={'white'} size={16} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
              }}>
              Wifi
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btndata} onPress={openData}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={images.datamobile} style={{height: 16, width: 16, tintColor: 'white'}} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
              }}>
              Mobile Data
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <Modal visible={show1} animationType="slide" transparent={true} statusBarTranslucent={true}>
        <View style={styles.container1}>
          <TouchableWithoutFeedback onPress={() => toggleDate()}>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderHeader()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalOpenSettingWifi;
const styles = StyleSheet.create({
  container1: {
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
    fontWeight: '500',
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
    width: '45%',
    backgroundColor: '#ED6041',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._50sdp,
  },
});
