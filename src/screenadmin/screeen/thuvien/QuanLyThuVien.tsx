import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {FAB, Searchbar} from 'react-native-paper';

import Header from '../../../component/Header';

import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import stylescustom from '../../../res/stylescustom';
import {SwipeListView} from 'react-native-swipe-list-view';
import Popover from 'react-native-popover-view/dist/Popover';

import {tusach} from '../../../data/feckData/tusach';
import {ScrollView} from 'react-native-gesture-handler';
import fonts from '../../../res/fonts';
import {NavigationProp} from '@react-navigation/native';
interface componentNameProps {
  navigation: NavigationProp<Record<string, any>>;
}

const QuanLyThuVien = (props: componentNameProps) => {
  const [search, setSearch] = React.useState('');
  const [show, setShow] = useState(false);

  // const open = (val: any) => {
  //   setShow(val);
  // };
  const RenderItem = ({item, index}: any) => {
    return (
      <Pressable style={styles.item} onPress={() => {}}>
        <Image
          source={item.img}
          resizeMode={'cover'}
          style={{
            height: sizes._screen_width * 0.6,
            width: sizes._screen_width * 0.4,
            borderRadius: 20,
          }}
        />
        <Text style={styles.txt1}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'Thư Viện Sách'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: sizes._screen_width}} showsVerticalScrollIndicator={false}>
          <Searchbar
            inputStyle={{height: sizes._55sdp, fontFamily: fonts.textRegular}}
            style={styles.search}
            placeholder="Tìm kiếm sách"
            onChangeText={(val: any) => setSearch(val)}
            icon={'book-search'}
            value={search}
            cursorColor={'black'}
            onSubmitEditing={() => {}}
          />
          <Text style={styles.txt}>Số lượng sách: {tusach.length}</Text>

          <View
            style={{
              width: sizes._screen_width * 0.9,
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 30,
            }}>
            {tusach.map((item: any, index: any) => {
              return (
                <View key={index}>
                  <RenderItem item={item} index={index} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <FAB
        color="#000"
        small={true}
        icon="plus"
        style={{
          position: 'absolute',
          right: 15,
          top: sizes._screen_height * 0.92,
          backgroundColor: '#00BFFF',
        }}
        onPress={() => {
          props.navigation.navigate('ThemSach');
        }}
      />
    </View>
  );
};

export default QuanLyThuVien;

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: sizes._font_size_max_max,
    fontFamily: fonts.textRegular,
    marginTop: sizes._25sdp,
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  txt1: {
    color: 'black',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
    width: sizes._screen_width * 0.3,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 5,
  },

  search: {
    width: sizes._screen_width * 0.9,
    marginTop: sizes._25sdp,
    height: sizes._50sdp,
    alignSelf: 'center',
    fontFamily: fonts.textRegular,
  },
  item: {
    width: sizes._screen_width * 0.4,
    alignItems: 'center',
    marginTop: 10,
  },
  txt4: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.textRegular,
    color: 'black',
    textTransform: 'capitalize',
  },
});
