import {FlatList, Image, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Octicons';
import React, {useRef, useState} from 'react';
import sizes from '../../res/sizes';
import images from '../../res/images';
import fonts from '../../res/fonts';
import colors from '../../res/color';
import ModalSheet from './ModalSheet';
import {useSelector} from 'react-redux';
import {image} from '../../redux/state/image';
import RenderImage from './RenderImage';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  item?: any;
  open?: any;
  onLongpres?: any;
  select?: any;
  items?: any;
  setItems?: any;
  navigation: NavigationProp<Record<string, any>>;
}
const RenderItemNew = (props: Props) => {
  const [items, setItems] = useState(props.item);
  const [count, setCount] = useState(0);
  const refRBSheet: any = useRef();
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
  const datas: any = useSelector(image);
  let data = datas.payload.checkimage.image;
  const press = () => {
    props.navigation.navigate('XemAnh', {items, data});
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.item1}>
        <View style={styles.item2}>
          <Image source={items.avatar} style={styles.img} />
          <View style={{marginLeft: sizes._10sdp}}>
            <Text style={styles.name}>{items.name}</Text>
            <Text style={{fontFamily: fonts.textRegular}}>{items.time}</Text>
          </View>
        </View>
        <View style={{width: sizes._screen_width}}>
          <Text style={styles.txt}>{items.title}</Text>
        </View>
        <View style={{width: sizes._screen_width}}>
          <RenderImage photo={data} press={press} />
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
      </View>
      <ModalSheet refRBSheet={refRBSheet} handleChange={handleChange} items={items} />
    </View>
  );
};
export default RenderItemNew;
const styles = StyleSheet.create({
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
    fontFamily: fonts.textRegular,
  },
  txt1: {
    marginLeft: 10,
    fontFamily: fonts.textRegular,
    color: 'black',
    fontSize: sizes._font_size_big_big_large,
  },
  txt2: {
    marginLeft: 10,
    color: '#808080',
    fontFamily: fonts.textRegular,
  },
  img1: {width: sizes._screen_width, alignItems: 'center'},

  item5: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
