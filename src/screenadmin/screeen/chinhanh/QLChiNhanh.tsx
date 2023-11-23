import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import Header from '../../../component/Header';
import colors from '../../../res/color';
import images from '../../../res/images';
import sizes from '../../../res/sizes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import itemChiNhanhs from '../../../data/itemnhanvien/itemChiNhanh';
import stylescustom from '../../../res/stylescustom';
import fonts from '../../../res/fonts';
import {NavigationProp} from '@react-navigation/native';

interface QLChiNhanhProps {
  navigation: NavigationProp<Record<string, any>>;
}
const QLChiNhanh = (props: QLChiNhanhProps) => {
  const Item = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.item1}
        onPress={() =>
          props.navigation.navigate('AddChiNhanh', {
            data: {
              name: item.name,
              diachi: item.diachi,
              diachiIp: item.diachiIp,
            },
          })
        }>
        <View style={styles.item}>
          <Icon name="home-city" color={'black'} size={20} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <View style={styles.item}>
          <Image source={images.address} style={styles.img} />
          <Text style={styles.text}>{item.diachi}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="wifi" color={'black'} size={20} />
          <Text style={styles.text}>{item.diachiIp}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        back
        onBackPress={() => props.navigation.goBack()}
        title
        textTittle={'QUẢN LÝ CHI NHÁNH'}
        rightContent
        iconadd
        opressadd={() => props.navigation.navigate('AddChiNhanh')}
      />
      <View style={stylescustom.contentContainer}>
        <FlatList
          data={itemChiNhanhs}
          renderItem={Item}
          contentContainerStyle={{paddingBottom: 20}}
          style={{width: sizes._screen_width}}
        />
      </View>
    </View>
  );
};

export default QLChiNhanh;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.colorWhite,
    width: '100%',
    borderTopRightRadius: sizes._20sdp,
    borderTopLeftRadius: sizes._20sdp,
    height: sizes._screen_height,
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.colorWhite,
  },
  item: {flexDirection: 'row', alignItems: 'center'},
  text: {
    marginLeft: sizes._20sdp,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big,
  },
  item1: {
    width: sizes._screen_width * 0.9,
    backgroundColor: colors.colorWhite,
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: sizes._15sdp,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: sizes._20sdp,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    height: 20,
    width: 20,
    tintColor: 'black',
  },
});
