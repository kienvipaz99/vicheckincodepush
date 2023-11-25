import React, {memo} from 'react';
import {View, StyleSheet, ImageBackground, FlatList, Image} from 'react-native';
import fonts from '../../res/fonts';
import images from '../../res/images';
import sizes from '../../res/sizes';
import Renderdisom from './Renderdisom';
import {Text} from 'react-native';
interface RenderItemBXHProps {
  data: User[];
}
const RenderItemDiSom = (props: RenderItemBXHProps) => {
  const thu1 = props.data[0];
  const thu2 = props.data[1];
  const thu3 = props.data[2];

  const RenderItem = ({item, index}: {item: User; index: number}) => {
    return <Renderdisom index={index} item={item} phut={true} />;
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.item}>
        <View style={styles.item1}>
          <Image
            style={styles.img1}
            source={
              thu2?.profile_picture?.full_url
                ? {uri: thu2?.profile_picture?.full_url}
                : images.iconuser1
            }
          />
          <Text style={styles.txt}>{thu2?.full_name}</Text>

          <Text style={styles.txt1}>{thu2?.in_time_late} phút</Text>
        </View>
        <View style={styles.item2}>
          <Image
            style={styles.img1}
            source={
              thu1?.profile_picture?.full_url
                ? {uri: thu1?.profile_picture?.full_url}
                : images.iconuser1
            }
          />
          <Text style={styles.txt}>{thu1?.full_name}</Text>

          <Text style={styles.txt1}>{thu1?.in_time_late} phút</Text>
        </View>
        <View style={styles.item3}>
          <Image
            style={styles.img1}
            source={
              thu3?.profile_picture?.full_url
                ? {uri: thu3?.profile_picture?.full_url}
                : images.iconuser1
            }
          />
          <Text style={styles.txt}>{thu3?.full_name}</Text>

          <Text style={styles.txt1}>{thu3?.in_time_late} phút</Text>
        </View>
      </View>

      <ImageBackground style={styles.img} source={images.bgbxh}>
        <View style={styles.item4}>
          <FlatList
            data={props.data}
            showsVerticalScrollIndicator={false}
            renderItem={RenderItem}
            keyExtractor={item => item.id.toString()}
            removeClippedSubviews
            maxToRenderPerBatch={15}
            initialNumToRender={10}
            windowSize={10}
            contentContainerStyle={{
              paddingBottom: sizes._200sdp,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default RenderItemDiSom;

const styles = StyleSheet.create({
  container: {},
  img: {
    resizeMode: 'cover',
    height: sizes._560sdp,
    width: '100%',
    marginTop: 100,
  },
  img1: {
    height: sizes._screen_height * 0.05,
    width: sizes._screen_height * 0.05,
    borderRadius: 120,
  },
  txt: {
    fontSize: sizes._screen_width * 0.028,
    color: 'white',
    fontFamily: fonts.textRegular,
  },
  item: {
    width: sizes._screen_width * 0.9,
    flexDirection: 'row',
    top: 10,
  },
  item1: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',

    width: sizes._screen_width * 0.23,
    left: sizes._screen_width * 0.1,
    marginTop: sizes._16sdp,
  },
  item2: {
    alignItems: 'center',
    justifyContent: 'center',
    left: sizes._screen_width * 0.33,
    width: sizes._screen_width * 0.23,

    position: 'absolute',
    marginTop: -sizes._5sdp,
  },
  item3: {
    alignItems: 'center',
    justifyContent: 'center',
    left: sizes._screen_width * 0.57,
    marginTop: sizes._40sdp,
    width: sizes._screen_width * 0.24,

    position: 'absolute',
  },
  txt1: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 3,
    color: '#0751e0',
    fontFamily: fonts.textRegular,
    marginTop: 3,
  },
  item4: {
    alignSelf: 'center',
    marginTop: sizes._130sdp,
  },
});
