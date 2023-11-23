import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import images from '../../res/images';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  item: any;
  navigation: NavigationProp<Record<string, any>>;
}
const RenderItemHop = (props: Props) => {
  const item = props.item;

  return (
    <View>
      <Text style={styles.txt}>{item.time}</Text>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('ChiTietLichHop', {item: item})}>
        <View style={styles.item1}>
          <View style={styles.item2}>
            <Text style={styles.txt1}>{item.title}</Text>
            <Text
              style={[
                styles.txt,
                {
                  color:
                    item.mucdo == 'Quan trọng'
                      ? '#CC5F00'
                      : item.mucdo == 'Bình thường'
                      ? '#020202'
                      : item.mucdo == 'Đặc biệt quan trọng'
                      ? '#4109DF'
                      : undefined,
                },
              ]}>
              {item.mucdo}
            </Text>
            <Image source={images.check1} />
          </View>
          <Text style={styles.txt}>Nội dung: {item.content}</Text>
          <Text style={styles.txt}>Chủ trì: {item.nguoitruchi}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RenderItemHop;

const styles = StyleSheet.create({
  txt: {
    color: '#727070',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
  },
  item: {
    backgroundColor: '#0088CE',
    borderRadius: sizes._10sdp,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: sizes._10sdp,
    borderTopLeftRadius: sizes._10sdp,
    marginBottom: 5,
    marginTop: sizes._10sdp,
  },
  item1: {
    backgroundColor: '#E8F8FF',
    padding: 10,
    width: '98%',
    marginLeft: sizes._12sdp,
    borderBottomLeftRadius: sizes._10sdp,
    borderTopLeftRadius: sizes._10sdp,
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt1: {
    color: 'black',
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_big,
  },
});
