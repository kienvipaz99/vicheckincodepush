import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import sizes from '../../res/sizes';
import stylescustom from '../../res/stylescustom';
import fonts from '../../res/fonts';
import images from '../../res/images';
interface Props {
  item?: any;
  keys?: string;
}
const RendeDanhSachCheckin = (props: Props) => {
  const RenderItem = ({item, index}: any) => {
    return (
      <View style={[styles.item, stylescustom.shadowitem]} key={item?.id}>
        <View style={stylescustom.row1}>
          <Text style={styles.number}>{index + 1}</Text>
          <Image
            source={item.img ? item?.img : images.iconuser1}
            style={styles.img}
            resizeMode={'center'}
          />
          <View style={{marginLeft: 10}}>
            {item?.user ? (
              <Text style={stylescustom.textName}>{item?.user?.full_name}</Text>
            ) : (
              <Text style={stylescustom.textName}>{item?.full_name}</Text>
            )}
            {item?.departments && (
              <Text style={stylescustom.textEmail}>{item?.departments[0]?.name}</Text>
            )}
          </View>
        </View>
        {item?.time ? (
          <Text style={[stylescustom.textEmail, {marginRight: 10}]}>{item?.time}p</Text>
        ) : null}
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {props?.item?.length > 0 ? (
        <FlatList
          data={props.item}
          renderItem={RenderItem}
          style={{marginBottom: 5}}
          contentContainerStyle={{
            marginTop: sizes._10sdp,
            width: sizes._screen_width,
          }}
          keyExtractor={(item: any) => `${props.keys + item.id}`}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          removeClippedSubviews
        />
      ) : (
        <>
          <Image source={images.notData} resizeMode={'cover'} style={{height: 200, width: 200}} />
          <Text
            style={{
              fontFamily: fonts.textRegular,
              fontSize: sizes._font_size_max,
              color: 'black',
              marginTop: 15,
            }}>
            Không có dữ liệu !!!
          </Text>
        </>
      )}
    </View>
  );
};

export default memo(RendeDanhSachCheckin);

const styles = StyleSheet.create({
  item: {
    width: sizes._screen_width * 0.9,
    height: sizes._70sdp,
    backgroundColor: 'white',
    alignSelf: 'center',

    borderRadius: sizes._10sdp,
    marginBottom: sizes._20sdp,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 60,
    marginLeft: 10,
  },
  number: {
    marginLeft: 20,
    color: 'black',
    fontSize: sizes._font_size_big_big,
    fontFamily: fonts.textRegular,
  },
});
