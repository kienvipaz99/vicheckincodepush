import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import stylescustom from '../../res/stylescustom';
import Header from '../../component/Header';
import sizes from '../../res/sizes';
import images from '../../res/images';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import {convert} from '../../res/validate';
import danhsachminigame from '../../data/feckData/danhsachminigame';
import DanhSach from './DanhSach';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function Game(props: Props) {
  const RenderItem = ({item}: any) => {
    return <DanhSach item={item} />;
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'DANH SÁCH MINI GAME'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            style={stylescustom.row}
            onPress={() => props.navigation.navigate('DoiQua')}>
            <Text style={styles.txt}>{convert(5000000)}</Text>
            <Image source={images.star} style={stylescustom.imgStar} />
          </TouchableOpacity>
          <FlatList data={danhsachminigame} renderItem={RenderItem} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: sizes._screen_width,
  },
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
});
