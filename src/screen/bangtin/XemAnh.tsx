import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import images from '../../res/images';
import sizes from '../../res/sizes';
import Icons from 'react-native-vector-icons/Octicons';
import fonts from '../../res/fonts';
import colors from '../../res/color';
import ModalSheet from './ModalSheet';

interface XemAnhProps {
  route: any;
}

const XemAnh = (props: XemAnhProps) => {
  let data = props.route.params.items;

  let image = props.route.params.data;

  const refRBSheet: any = React.useRef();
  const [items, setItems] = React.useState(data);

  const [count, setCount] = React.useState(0);

  const handleChange = (val: any) => {
    let temp = () => {
      setCount(count + 1);

      if (val === items.id) {
        if (count % 2 == 0) {
          return {
            ...items,
            like: !items.like,
            numberlike: items.numberlike + 1,
          };
        } else {
          return {
            ...items,
            like: !items.like,
            numberlike: items.numberlike - 1,
          };
        }
      }
    };
    setItems(temp());
  };
  const Rendercontent = () => (
    <>
      <View style={styles.item1}>
        <View style={styles.item2}>
          <Image source={items.avatar} style={styles.img} />
          <View style={{marginLeft: sizes._10sdp}}>
            <Text style={styles.name}>{items.name}</Text>
            <Text style={{fontFamily: fonts.text}}>{items.time}</Text>
          </View>
        </View>
        <View style={{width: sizes._screen_width}}>
          <Text style={styles.txt}>{items.title}</Text>
        </View>
        <View style={{width: sizes._screen_width}}>
          {/* <RenderImage photo={data} press={press} /> */}
        </View>
        <View style={styles.item4}>
          <View style={styles.item3}>
            <Image source={images.like} style={styles.icon1} />
            <Text style={styles.txt2}>{items.numberlike}</Text>
          </View>
          <Text style={styles.binhluan}>{items.binhluan?.length} bình luận</Text>
        </View>
        <View style={styles.itemcamxuc}>
          <TouchableOpacity
            style={styles.item5}
            key={items?.id}
            onPress={() => handleChange(items?.id)}>
            <Image
              source={items?.like ? images.like1 : images.unlike}
              style={{
                height: 25,
                width: 25,
                tintColor: items?.like ? '#1877f2' : undefined,
              }}
            />
            <Text style={styles.txt1}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={styles.item3}>
              <Icons name="comment" size={sizes._25sdp} color={'black'} />
              <Text style={styles.txt1}>Bình luận</Text>
            </View>
          </TouchableOpacity>
        </View>
        {image.map((item: any, index: any) => (
          <Image
            key={index}
            source={{
              uri: item,
            }}
            resizeMode={'cover'}
            style={{
              width: sizes._screen_width,
              height: sizes._screen_width * 1.2,
              marginBottom: 20,
            }}
          />
        ))}
      </View>
      <ModalSheet refRBSheet={refRBSheet} handleChange={handleChange} items={items} />
    </>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'rgba(0, 0, 0, 0.2)'} translucent={false} />
      <FlatList data={[]} renderItem={null} ListFooterComponent={Rendercontent} />
    </View>
  );
};

export default XemAnh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {height: sizes._40sdp, width: sizes._40sdp, borderRadius: 60},
  item1: {
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: sizes._10sdp,
    marginTop: sizes._10sdp,
  },
  name: {
    color: 'black',
    fontSize: sizes._font_size_big,

    fontFamily: fonts.textBold,
  },
  itemcamxuc: {
    width: sizes._screen_width,
    height: sizes._40sdp,
    borderColor: colors.colorDargrey,
    borderWidth: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon1: {height: 15, width: 15},
  icon2: {height: 20, width: 20},
  txt: {
    marginLeft: sizes._15sdp,
    marginTop: sizes._15sdp,
    color: '#220000',
    fontFamily: fonts.textRegular,
  },
  item4: {
    width: sizes._screen_width,
    height: sizes._30sdp,

    alignItems: 'center',
    marginLeft: sizes._25sdp,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  binhluan: {
    marginRight: sizes._screen_width * 0.1,
    fontFamily: fonts.text,
  },
  txt1: {
    marginLeft: 10,
    fontFamily: fonts.text,
    color: 'black',
    fontSize: sizes._font_size_big_big_large,
  },
  txt2: {
    marginLeft: 10,
    color: '#808080',
    fontFamily: fonts.text,
  },
  img1: {width: sizes._screen_width, alignItems: 'center'},

  item5: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
