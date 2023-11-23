import React, {Component} from 'react';
import {Platform, StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import sizes from '../res/sizes';
import images from '../res/images';
import fonts from '../res/fonts';

interface Props {
  back?: boolean;
  onBackPress?: any;
  title?: boolean;
  textTittle?: any;
  logo?: boolean;
  logoUri?: any;
  logoStyle?: any;
  user?: boolean;
  infoUser?: any;
  contentCustom?: any;
  contentCustomJSX?: any;
  rightContent?: boolean;
  seach?: boolean;
  onSeachPress?: any;
  setting?: boolean;
  onSettingPress?: () => void;
  qrCode?: boolean;
  onQRCodePress?: any;
  seach1?: boolean;
  onSeach1?: any;
  onnotifications?: any;
  notifications?: boolean;
  lenghtnotifi?: any;
  chitiet?: boolean;
  onpresschitiet?: any;
  chon?: boolean;
  opressChon?: any;
  iconadd?: boolean;
  opressadd?: any;
  save?: boolean;
  opPressSave?: any;
  taolichhop?: boolean;
  onPressTaoLichHop?: any;
  refs?: any;
}
interface State {}

//Kiểm tra thiết bị
const isAndroid = Platform.OS === 'android';

export default class Header extends Component<Props, State> {
  render() {
    const {
      onBackPress,
      title,
      textTittle,
      logo,
      logoUri,
      logoStyle,
      back,
      user,
      infoUser,
      rightContent,
      seach,
      onSeachPress,
      setting,
      onSettingPress,
      contentCustom,
      contentCustomJSX,
      qrCode,
      onQRCodePress,
      onSeach1,
      seach1,
      onnotifications,
      notifications,
      lenghtnotifi,
      chitiet,
      onpresschitiet,
      chon,
      opressChon,
      iconadd,
      opressadd,
      save,
      opPressSave,
      taolichhop,
      onPressTaoLichHop,
      refs,
    } = this.props;

    return (
      <View>
        <Image
          source={images.bg_header_app}
          style={{height: 500, position: 'absolute'}}
          resizeMode="cover"
        />
        <View style={styles.container}>
          {back && (
            <AntDesign
              name="caretleft"
              size={sizes._24sdp}
              color={'white'}
              style={styles.icon}
              onPress={() => this.props.onBackPress()}
            />
          )}
          <View
            style={{
              justifyContent: 'center',
              width: sizes._screen_width,
              alignItems: 'center',
              position: 'absolute',
            }}>
            {title && <Text style={[styles.titleContent]}>{textTittle}</Text>}
          </View>

          {contentCustom && contentCustomJSX}

          <View>
            {rightContent && (
              <>
                {notifications && (
                  <View style={{marginRight: sizes._15sdp, flexDirection: 'row'}}>
                    <Ionicons
                      name={isAndroid ? 'notifications' : 'ios-notifications'}
                      size={sizes._34sdp}
                      color={'white'}
                      style={styles.iconCenter}
                      onPress={this.props.onnotifications}
                    />
                    {lenghtnotifi === 0 ? null : (
                      <View
                        style={{
                          backgroundColor: 'red',
                          height: 25,
                          width: 25,
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          top: -8,
                        }}>
                        <Text style={{color: 'white', fontSize: 20}}>{lenghtnotifi}</Text>
                      </View>
                    )}
                  </View>
                )}
                {taolichhop && (
                  <AntDesign
                    onPress={() => onPressTaoLichHop()}
                    name="pluscircle"
                    color={'white'}
                    size={25}
                    style={{position: 'absolute', right: 10}}
                  />
                )}
                {chitiet && (
                  <TouchableOpacity onPress={() => onpresschitiet()}>
                    <Text style={{marginRight: sizes._15sdp, color: 'white'}}>{'Chi tiết'}</Text>
                  </TouchableOpacity>
                )}
                {seach1 && <TouchableOpacity onPress={() => onSeach1()}></TouchableOpacity>}
                {chon && (
                  <TouchableOpacity
                    onPress={() => opressChon()}
                    style={{marginRight: sizes._15sdp}}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: sizes._font_size_big_big,
                        fontWeight: '500',
                      }}>
                      Chọn
                    </Text>
                  </TouchableOpacity>
                )}
                {iconadd && (
                  <TouchableOpacity onPress={() => opressadd()} style={{marginRight: sizes._20sdp}}>
                    <Ionicons name="add-circle-outline" color={'white'} size={25} />
                  </TouchableOpacity>
                )}
                {save && (
                  <TouchableOpacity
                    ref={refs}
                    onPress={() => opPressSave()}
                    style={{marginRight: sizes._20sdp}}>
                    <Ionicons name="checkbox" color={'white'} size={25} />
                  </TouchableOpacity>
                )}
                {setting && (
                  <Ionicons
                    name="settings"
                    color={'white'}
                    size={25}
                    style={{marginRight: 20}}
                    onPress={onSettingPress}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes._50sdp,
    justifyContent: 'space-between',
  },
  avatar: {
    width: sizes._49sdp,
    height: sizes._49sdp,
    borderRadius: 45,
  },
  colorHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: sizes._screen_width,
    height: sizes._csreen_height / 4,
  },
  rectLeft: {
    opacity: 0.2,
    position: 'absolute',
    top: '6.75%',
    left: 0.93 * sizes._csreen_width - sizes._100sdp,
    borderRadius: sizes._15sdp,
    transform: [{rotate: '130deg'}],
  },
  rectRight: {
    opacity: 0.2,
    position: 'absolute',
    top: '1.5%',
    left: '6%',
    borderRadius: sizes._10sdp,
    transform: [{rotate: '130deg'}],
  },
  rectRightSub: {
    opacity: 0.2,
    position: 'absolute',
    top: '5%',
    left: '-4.46%',
    borderRadius: sizes._15sdp,
    transform: [{rotate: '115deg'}],
  },
  rectLeftSub: {
    opacity: 0.2,
    position: 'absolute',
    top: '-12%',
    left: '86%',
    borderRadius: sizes._15sdp,
    transform: [{rotate: '130deg'}],
  },
  titleContent: {
    fontSize: sizes._screen_width * 0.045,
    color: 'white',
    fontFamily: fonts.textRegular,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  titleUser: {
    color: 'white',
    fontSize: sizes._font_size_big,
    textTransform: 'uppercase',
  },
  subTitleUser: {
    color: 'white',
    fontSize: sizes._font_size_large,
  },
  icon: {
    left: sizes._25sdp,
    zIndex: 2,
  },
  iconCenter: {
    left: sizes._8sdp,
  },
});
