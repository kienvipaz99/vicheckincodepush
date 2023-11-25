import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
import colors from '../res/color';
import fonts from '../res/fonts';
import images from '../res/images';
import sizes from '../res/sizes';
import stylescustom from '../res/stylescustom';
import {NavigationProp} from '@react-navigation/native';
import {useEmployeeQuery} from '../redux/api/auth.api';

interface HeaderHomeProps {
  data: number;
  navigation: NavigationProp<Record<string, any>>;
  id: number;
}
const HeaderHome = (props: HeaderHomeProps) => {
  const {data} = useEmployeeQuery(`${props.id}`);

  return (
    <ImageBackground source={images.bg_header_app} style={styles.img1}>
      <View style={styles.view2}>
        <View style={stylescustom.row1}>
          <Image
            source={
              data?.profile_picture?.full_url
                ? {uri: data?.profile_picture?.full_url}
                : images.iconuser1
            }
            style={styles.img}
          />
          <View style={{left: 12}}>
            <Text style={styles.txt1}>{data?.full_name}</Text>
            <Text style={styles.txt}>{data?.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => props.navigation.navigate('Notification')}>
          <Image source={images.icnotifi} style={styles.view1} />
          <View style={styles.view}>
            <Text
              style={{
                color: 'white',

                fontFamily: fonts.textRegular,
              }}>
              {props.data > 99 ? '99+' : props.data}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {},
  view: {
    backgroundColor: 'red',
    height: 25,
    width: 25,
    borderRadius: 30,
    right: sizes._screen_width * 0.06,
    marginTop: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view1: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    right: 10,
  },
  txt: {
    color: colors.colorWhite,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 60,
    borderWidth: 1.3,
    borderColor: 'white',
    marginLeft: sizes._25sdp,
  },
  txt1: {
    color: colors.colorWhite,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },
  img1: {
    width: '100%',
    height: sizes._csreen_height * 0.24,
    position: 'absolute',
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: sizes._50sdp,
  },
});
