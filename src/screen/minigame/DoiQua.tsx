import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import {Searchbar} from 'react-native-paper';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import {convert} from '../../res/validate';
import images from '../../res/images';
import colors from '../../res/color';
import {tusach} from '../../data/feckData/tusach';
import {NavigationProp} from '@react-navigation/native';
interface componentNameProps {
  navigation: NavigationProp<Record<string, any>>;
}

const DoiQua = (props: componentNameProps) => {
  const [searchQua, setSearchQua] = React.useState('');
  const RenderItem = ({item, index}: any) => {
    return (
      <View style={styles.item} key={index}>
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
        <View style={stylescustom.row}>
          <Text style={styles.txt1}>{item.sao}</Text>
          <Image source={images.star} style={{height: 30, width: 30}} />
        </View>
      </View>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'ĐỔI QUÀ'} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: '100%'}}>
          <View style={[stylescustom.row]}>
            <Text style={styles.txt}>{convert(5000000)}</Text>
            <Image source={images.star} style={stylescustom.imgStar} />
          </View>
          <Searchbar
            style={styles.searchbar}
            cursorColor={'black'}
            placeholder="Search"
            onChangeText={setSearchQua}
            value={searchQua}
          />
          <FlatList
            data={tusach}
            renderItem={RenderItem}
            horizontal={false}
            scrollEnabled={false}
            // nestedScrollEnabled={true}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-around',
              marginTop: sizes._25sdp,
              marginBottom: 30,
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default DoiQua;

const styles = StyleSheet.create({
  container: {},
  txt: {
    color: colors.colorText,
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
  searchbar: {
    width: sizes._screen_width * 0.9,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: sizes._25sdp,
    fontFamily: fonts.textRegular,
    alignSelf: 'center',
  },
  item: {
    width: sizes._screen_width * 0.4,
  },
  txt1: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.textRegular,
    color: 'black',
    textTransform: 'capitalize',
  },
});
