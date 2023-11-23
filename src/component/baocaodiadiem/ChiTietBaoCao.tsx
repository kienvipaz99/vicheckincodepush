import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import stylescustom from '../../res/stylescustom';
import Header from '../Header';
import sizes from '../../res/sizes';
import {Searchbar} from 'react-native-paper';
import fonts from '../../res/fonts';
import colors from '../../res/color';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const ChiTietBaoCao = (props: Props) => {
  let danhsach = props.route.params.item.nhanvien;

  const [search, setSearch] = useState('');
  const RenderItem = ({item, index}: any) => {
    return (
      <View style={[styles.item, stylescustom.shadowitem]}>
        <View style={stylescustom.row1}>
          <View style={stylescustom.row1}>
            <Text style={[{marginLeft: 10}, [styles.txt2]]}>{index + 1}</Text>
            <Image source={item.img} style={styles.img} />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.txt1}>{item.name}</Text>
            <Text style={styles.txt2}>{item.chucvu}</Text>
          </View>
        </View>

        <Text style={[styles.txt2, {marginRight: 10}]}>{item.cong} công</Text>
      </View>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'CHI TIẾT CHẤM CÔNG'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <View style={{width: sizes._screen_width, alignItems: 'center'}}>
          <Searchbar
            value={search}
            onChangeText={setSearch}
            icon={'account-search'}
            placeholder="Tìm kiếm nhân viên"
            cursorColor={'black'}
            style={{
              width: sizes._screen_width * 0.9,
              marginTop: 20,
              fontFamily: fonts.textRegular,
            }}
          />
        </View>
        <FlatList
          data={danhsach}
          renderItem={RenderItem}
          contentContainerStyle={{width: sizes._screen_width, marginTop: 20}}
        />
      </View>
    </View>
  );
};

export default ChiTietBaoCao;

const styles = StyleSheet.create({
  item: {
    height: sizes._screen_height * 0.078,
    backgroundColor: 'white',
    width: sizes._screen_width * 0.9,
    marginTop: sizes._15sdp,
    borderRadius: sizes._10sdp,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  img: {height: 40, width: 40, borderRadius: 60, marginLeft: sizes._10sdp},
  txt: {
    fontFamily: fonts.textRegular,
    fontSize: sizes._screen_width * 0.03,

    color: colors.colorDargrey,
  },
  txt1: {
    fontFamily: fonts.textBold,
    color: colors.colorText,
    fontSize: sizes._screen_width * 0.04,
  },
  txt2: {
    fontFamily: fonts.textRegular,
    color: colors.colorText,
    fontSize: sizes._screen_width * 0.04,
  },
});
