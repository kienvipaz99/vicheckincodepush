import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
interface Props {
  press?: any;
  photo: any;
}
export default function RenderImage(props: Props) {
  let photo = props.photo;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => props.press()}>
      {photo.length == 1 ? (
        <Image source={{uri: photo[0]}} style={styles.img1} />
      ) : photo.length == 2 ? (
        <View style={styles.image}>
          <Image source={{uri: photo[0]}} style={styles.image1} />
          <Image source={{uri: photo[1]}} style={styles.image1} resizeMode={'cover'} />
        </View>
      ) : photo.length == 3 ? (
        <View style={styles.viewImage}>
          <Image source={{uri: photo[0]}} style={styles.image2} />
          <View style={styles.viewImage1}>
            <Image source={{uri: photo[1]}} style={styles.image3} />
            <Image source={{uri: photo[2]}} style={styles.image3} />
          </View>
        </View>
      ) : photo.length == 4 ? (
        <View style={styles.viewImage}>
          <Image source={{uri: photo[0]}} style={styles.image2} />
          <View style={styles.viewImage1}>
            <Image source={{uri: photo[1]}} style={styles.image4} />
            <Image source={{uri: photo[2]}} style={styles.image4} />
            <Image source={{uri: photo[3]}} style={styles.image4} />
          </View>
        </View>
      ) : photo.length > 4 ? (
        <View style={styles.viewImage}>
          <Image source={{uri: photo[0]}} style={styles.image2} />
          <View style={styles.viewImage1}>
            <Image source={{uri: photo[1]}} style={styles.image4} />
            <Image source={{uri: photo[2]}} style={styles.image4} />
            <View style={styles.image4}>
              <Image source={{uri: photo[3]}} style={styles.image4} />
              <View style={styles.view}>
                <Text style={styles.txt}>+{photo.length - 4}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'space-around',
    height: sizes._410sdp,
  },
  image1: {
    height: sizes._200sdp,
    width: sizes._screen_width,
  },
  viewImage: {
    height: sizes._400sdp,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image2: {
    height: sizes._400sdp,
    width: sizes._screen_width * 0.6,
  },
  image3: {
    height: sizes._199sdp,
    width: sizes._screen_width * 0.39,
  },
  image4: {
    height: sizes._400sdp * 0.33,
    width: sizes._screen_width * 0.39,
  },
  viewImage1: {
    height: sizes._400sdp,
    justifyContent: 'space-between',
    width: sizes._screen_width * 0.39,
  },
  view: {
    height: sizes._400sdp * 0.33,
    width: sizes._screen_width * 0.39,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'white',
    fontSize: sizes._screen_width * 0.1,
    fontFamily: fonts.textRegular,
  },
  img1: {
    width: sizes._screen_width,
    height: sizes._400sdp,
    resizeMode: 'cover',
    marginTop: 20,
  },
});
