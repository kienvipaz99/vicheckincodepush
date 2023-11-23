import * as React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import {fullday} from '../../data/checkday';
import danhsachdiadiem from '../../data/danhsachdiadiem';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import Header from '../Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationProp} from '@react-navigation/native';

interface BaoCaoDiaDiemThangProps {
  navigation: NavigationProp<Record<string, any>>;
}

const BaoCaoDiaDiemThang = (props: BaoCaoDiaDiemThangProps) => {
  const RenderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={[stylescustom.shadowitem, styles.item]}
        onPress={() => props.navigation.navigate('ChiTietBaoCao', {item})}>
        <View style={[stylescustom.row2, styles.item2]}>
          <Text style={[styles.text, {marginLeft: 15}]}>{item.name}</Text>
          <Text style={[styles.text, {marginRight: 15}]}>{item.nhanvien.length}</Text>
        </View>
        <View
          style={{
            width: sizes._screen_width * 0.85,
            alignSelf: 'center',
            paddingBottom: 20,
          }}>
          <View
            style={{
              marginTop: 15,
            }}>
            <View style={stylescustom.row1}>
              <Image source={images.address} style={{height: 30, width: 30}} />
              <Text style={styles.text1}>{item.diachi}</Text>
            </View>
          </View>
          <View style={[stylescustom.row2, {marginTop: 15}]}>
            <View style={stylescustom.row1}>
              <Icon name="calendar-check-o" color={colors.colorText} size={26} />
              <Text style={styles.text1}>Thời gian bắt đầu</Text>
            </View>
            <Text style={styles.text1}>{fullday(item.datecheckstart)}</Text>
          </View>
          <View style={[stylescustom.row2, {marginTop: 15}]}>
            <View style={stylescustom.row1}>
              <Icon name="calendar-times-o" color={colors.colorText} size={26} />
              <Text style={styles.text1}>Thời gian kết thúc</Text>
            </View>
            <Text style={styles.text1}>{fullday(item.datecheckend)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'BÁO CÁO ĐỊA ĐIỂM THÁNG'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <View style={{width: sizes._screen_width, marginTop: sizes._25sdp}}>
          <FlatList
            data={danhsachdiadiem}
            renderItem={RenderItem}
            contentContainerStyle={{paddingBottom: 20, paddingTop: 10}}
          />
        </View>
      </View>
    </View>
  );
};

export default BaoCaoDiaDiemThang;

const styles = StyleSheet.create({
  container: {
    width: sizes._screen_width,
  },
  item: {
    backgroundColor: 'white',
    width: sizes._screen_width * 0.9,
    borderRadius: sizes._10sdp,
    alignSelf: 'center',
  },
  item2: {
    backgroundColor: colors.colorDargrey,
    borderTopLeftRadius: sizes._10sdp,
    borderTopRightRadius: sizes._10sdp,
    height: 50,
  },
  text: {
    color: colors.colorText,
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_max_max,
  },
  text1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginLeft: 15,
  },
});
