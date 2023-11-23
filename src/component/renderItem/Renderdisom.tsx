import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
interface Props {
  item: User;
  index: number;
  phut?: boolean;
}
export default function Renderdisom(props: Props) {
  return (
    <View style={styles.item} key={props.index}>
      <View style={styles.item4}>
        <View style={styles.item2}>
          <Text style={styles.txt}>{props.index + 1}</Text>
        </View>
        <Image
          style={styles.img}
          source={
            props.item?.profile_picture?.full_url
              ? {uri: props.item?.profile_picture?.full_url}
              : images.iconuser1
          }
        />
        <View style={styles.item6}>
          <Text style={styles.txt1}>{props.item?.full_name}</Text>
          <Text style={styles.txt2}>{props.item?.department?.name}</Text>
        </View>
      </View>

      {props.phut ? (
        <Text style={styles.item5}>{props.item?.in_time_late} phút</Text>
      ) : (
        <Text style={styles.item5}>{props.item?.work} công</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: sizes._screen_height * 0.078,
    backgroundColor: 'white',
    width: sizes._screen_width * 0.7,
    marginTop: sizes._10sdp,
    borderRadius: sizes._15sdp,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item1: {
    borderRadius: 120,
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  item2: {
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.colorDargrey,
    marginLeft: sizes._10sdp,
  },
  item4: {flexDirection: 'row', alignItems: 'center'},
  img: {height: 40, width: 40, borderRadius: 60, marginLeft: sizes._10sdp},
  item5: {
    marginRight: sizes._15sdp,
    fontFamily: fonts.textBold,
    color: colors.colorText,
    fontSize: sizes._screen_width * 0.03,
  },
  item6: {marginLeft: sizes._15sdp},
  txt: {
    fontFamily: fonts.textRegular,
    fontSize: sizes._screen_width * 0.03,

    color: colors.colorDargrey,
  },
  txt1: {
    fontFamily: fonts.textBold,
    color: colors.colorText,
    fontSize: sizes._screen_width * 0.03,
  },
  txt2: {
    fontFamily: fonts.textRegular,
    color: colors.colorText,
    fontSize: sizes._screen_width * 0.03,
  },
});
