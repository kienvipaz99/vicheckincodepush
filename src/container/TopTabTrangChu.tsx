import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import sizes from '../res/sizes';
import {NavigationProp} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import RenderItemTrangChu from '../component/RenderItemTrangchu';
import fonts from '../res/fonts';
import stylescustom from '../res/stylescustom';
import colors from '../res/color';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  item: any;
}

export default function TopTab(props: Props) {
  const [index, setIndex] = useState(1);
  const Screen = [
    {
      id: 1,
      name: 'Quản lý',
      item: props?.item?.QuanLy,
    },
    {
      id: 2,
      name: 'Đơn từ',
      item: props?.item?.donTu,
    },
    {
      id: 3,
      name: 'Cài đặt',
      item: props?.item?.caiDat,
    },
  ];

  return (
    <View style={styles.view4}>
      <View style={styles.view}>
        {Screen.map(item => (
          <Pressable
            style={index === item?.id ? styles.view1 : styles.view3}
            onPress={() => setIndex(item?.id)}
            key={item?.id}>
            <Text
              style={[
                styles.txt,
                {
                  color: index === item?.id ? 'white' : 'black',
                },
              ]}>
              {item?.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{alignItems: 'center', width: sizes.width * 0.9}}>
        <RenderItemTrangChu item={Screen[index - 1]?.item} navigation={props.navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f4f4f4',
    height: 40,
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...stylescustom.shadowitem,
  },
  view1: {
    height: 40,
    backgroundColor: '#69bc45',
    borderRadius: 60,
    width: (sizes._screen_width * 0.9) / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view3: {
    height: 40,
    borderRadius: 60,
    width: (sizes._screen_width * 0.9) / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  txt: {
    fontSize: sizes.width * 0.045,
    fontFamily: fonts.textBold,
    color: colors.colorText,
  },
  view4: {flex: 1, marginBottom: 50, alignItems: 'center', width: sizes.width},
});
