import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import stylescustom from '../../../res/stylescustom';
import Header from '../../../component/Header';
import phonghop from '../../../data/phonghop';
import sizes from '../../../res/sizes';
import colors from '../../../res/color';
import {FAB} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function QuanLyPhongHop(props: Props) {
  const RenderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.item1}
        onPress={() => props.navigation.navigate('ThemPhongHop')}>
        <Text style={styles.text}>{item.name}</Text>
        <View style={styles.item}>
          <Text style={styles.text1}>Số ghế</Text>

          <Text style={styles.text1}>{item.soghe}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text1}>Trạng thái</Text>
          <Text style={styles.text1}>{item.trangthai}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text1}>Ghi chú</Text>
          <Text style={styles.text1}>{item.ghichu}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'Quản lý phòng họp'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={phonghop}
          renderItem={RenderItem}
          style={{width: '100%'}}
        />
      </View>
      <FAB
        color="#000"
        small={true}
        icon="plus"
        style={styles.icon}
        onPress={() => {
          props.navigation.navigate('ThemPhongHop');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item1: {
    width: '90%',
    padding: 10,
    backgroundColor: colors.colorOrange1,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: sizes._15sdp,
  },
  text: {
    color: 'black',
    fontSize: sizes._font_size_big,
    fontWeight: '500',
  },
  text1: {
    color: 'black',
    fontSize: sizes._font_size_big,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'absolute',
    right: 15,
    bottom: 30,
    backgroundColor: '#00BFFF',
  },
});
