import {FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header';
import sizes from '../../res/sizes';
import images from '../../res/images';
import RenderItemNew from './RenderItemNew';
import colors from '../../res/color';
import stylescustom from '../../res/stylescustom';
import fonts from '../../res/fonts';
import datamangxh from '../../data/feckData/datamangxh';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const News = (props: Props) => {
  const [items, setItems] = useState(datamangxh);

  const setItem = (val: any) => {
    setItems(val);
  };
  const RederItems = ({item}: any) => {
    return (
      <RenderItemNew item={item} items={items} setItems={setItem} navigation={props.navigation} />
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'BẢN TIN NỘI BỘ'}
        back
        onBackPress={() => props.navigation.goBack()}
      />

      <View style={stylescustom.contentContainer}>
        <FlatList
          listKey="sdvds"
          showsVerticalScrollIndicator={false}
          data={items || []}
          renderItem={RederItems}
          keyExtractor={(item, index) =>
            item && item.id ? `${item?.id?.toString()}` : index?.toString()
          }
          ListFooterComponent={() => (
            <View style={styles.item5}>
              <Text style={styles.txt2}>Bạn đã xem hết bảng tin !!!</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.item4}
          onPress={() => props.navigation.navigate('TaoBaiViet')}>
          <Image source={images.thembaiviet} style={styles.img1} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  itememoji: {
    width: sizes._screen_width,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
  },
  item4: {position: 'absolute', bottom: 10, right: 5},
  img1: {height: sizes._60sdp, width: sizes._60sdp},
  item5: {
    alignItems: 'center',
    height: 150,
    width: sizes._screen_width,
    justifyContent: 'center',
    backgroundColor: colors.colorDargrey,
  },
  txt2: {
    color: 'black',
    fontFamily: fonts.textBold,
    fontSize: sizes._font_size_maxs,
  },
});
