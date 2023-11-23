import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Header from '../../../component/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import stylescustom from '../../../res/stylescustom';
import danhsachdiadiem from '../../../data/danhsachdiadiem';
import sizes from '../../../res/sizes';
import colors from '../../../res/color';
import fonts from '../../../res/fonts';
import {fullday} from '../../../data/checkday';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function DiaDiem(props: Props) {
  const RenderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => props.navigation.navigate('ThemDiaDiem', {item})}>
        <View style={stylescustom.row1}>
          <MaterialIcons name="map-clock" color={'black'} size={30} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text1}>
              {fullday(item.datecheckstart) + '=>' + fullday(item.datecheckend)}
            </Text>
            <Text style={styles.text1}>{item.diachi}</Text>
          </View>
        </View>
        <MaterialIcons name="map-marker-off" size={25} color={'black'} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        back
        onBackPress={() => props.navigation.goBack()}
        textTittle={'QUẢN LÝ ĐỊA ĐIỂM'}
        rightContent
        iconadd
        opressadd={() => props.navigation.navigate('ThemDiaDiem')}
      />
      <View style={stylescustom.contentContainer}>
        <FlatList
          data={danhsachdiadiem}
          renderItem={RenderItem}
          contentContainerStyle={{
            width: sizes._screen_width,
            paddingBottom: 20,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    alignSelf: 'center',
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    backgroundColor: colors.colorWhite,
    marginTop: sizes._20sdp,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  text: {
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
  },
  text1: {
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    color: colors.colorText,
  },
});
