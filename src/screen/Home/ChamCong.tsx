import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import Header from '../../component/Header';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import {gettimes, thu11, day} from '../../data/checkday';
import {RootState} from '../../redux/store';
import {useEmployeeQuery} from '../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
interface ChamCongProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const ChamCong = (props: ChamCongProps) => {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const id = useAppSelect(data => data?.infoUser?.id);
  const {data} = useEmployeeQuery(`${id}`);
  const image = useAppSelect(data => data?.data?.imageCheckin);
  return (
    <View style={styles.container}>
      <Header title textTittle={'CHẤM CÔNG'} back onBackPress={() => props.navigation.goBack()} />
      <View style={[stylescustom.contentContainer, {justifyContent: 'center'}]}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('CameraCheck', {uuid: data?.uuid})}>
          {image == '' ? (
            <Image
              style={{
                height: sizes._screen_width * 0.6,
                width: sizes._screen_width * 0.6,
                borderRadius: 128,
              }}
              resizeMode={'contain'}
              source={images.imageAvatar}
            />
          ) : (
            <Image
              style={{
                height: sizes._screen_width * 0.6,
                width: sizes._screen_width * 0.6,
                borderRadius: 128,
              }}
              source={{uri: image}}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.txt}>
          {thu11()},{day()}
        </Text>
        <View style={styles.item}>
          <View style={{alignItems: 'center'}}>
            <Image source={images.cancel} style={styles.img} />

            {image ? (
              <>
                {props.route?.params === 'success' ? (
                  <Text style={styles.txt1}>Bạn là kiên</Text>
                ) : (
                  <Text style={styles.txt1}>Đéo phải kiên</Text>
                )}
              </>
            ) : (
              <Text style={styles.txt1}>Bạn chưa checkin</Text>
            )}

            <Text style={{fontFamily: fonts.textRegular, color: 'black'}}>
              {image ? gettimes() : '--:--'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChamCong;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: sizes._screen_width * 0.2,
    width: sizes._screen_width * 0.2,
  },
  item: {
    alignItems: 'center',
    width: sizes._screen_width * 0.8,

    marginTop: 20,
  },
  time: {
    fontSize: sizes._50sdp,
    fontFamily: fonts.textBold,
    color: colors.colorText,
  },
  txt: {
    fontSize: sizes._font_size_maxs,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
    marginTop: 15,
  },
  txt1: {
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
  },
});
