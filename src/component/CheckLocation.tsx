import {StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../res/sizes';
import GetLocation from 'react-native-get-location';
import images from '../res/images';
import fonts from '../res/fonts';

import GetTime from './GetTime';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const CheckLocation = (props: Props) => {
  const [latitude, setLatitude] = useState<any>(21.05877);
  const [longitude, setLongitude] = useState<any>(105.72177);

  let vido = latitude.toFixed(5);
  let kinhdo = longitude.toFixed(5);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        let a = location.latitude;

        setLatitude(a);
        let b = location.longitude;

        setLongitude(b);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  return (
    <TouchableOpacity
      style={{
        height: sizes._230sdp,
        width: sizes._230sdp,
        borderRadius: sizes._160sdp,
      }}
      onPress={() => {
        props.navigation.navigate('Chấm công');
      }}
      activeOpacity={0.7}>
      <ImageBackground
        source={images.logovitech}
        style={{
          height: sizes._230sdp,
          width: sizes._230sdp,
          borderRadius: sizes._160sdp,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.address}
          style={{height: 35, width: 35, tintColor: 'white', marginBottom: 10}}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {vido == vido && kinhdo == kinhdo ? (
            <Text style={styles.text}>Vị trí hợp lệ</Text>
          ) : (
            <Text style={styles.text}>Vị trí không hợp lệ</Text>
          )}
        </View>

        <GetTime />

        <Text style={styles.text1}>CHECK IN</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CheckLocation;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },
  text1: {
    color: 'white',
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_max_max,
  },
});
