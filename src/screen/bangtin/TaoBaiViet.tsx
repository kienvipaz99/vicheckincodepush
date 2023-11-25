import {Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import stylescustom from '../../res/stylescustom';
import Header from '../../component/Header';
import sizes from '../../res/sizes';
import images from '../../res/images';
import fonts from '../../res/fonts';
import colors from '../../res/color';
import ImageCropPicker from 'react-native-image-crop-picker';
import BuntomCustom1 from '../../component/BuntomCustom1';
import ButtomDang from '../../component/renderItem/Butomcustom/ButtomDang';
import {isRequired} from '../../res/validate';
import {useDispatch, useSelector} from 'react-redux';
import {image, addImage} from '../../redux/state/image';
import RenderImage from './RenderImage';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const TaoBaiViet = (props: Props) => {
  const datas: any = useSelector(image);
  const dispatch = useDispatch();
  let photo = datas.payload.checkimage.image;

  const [txtInput, setTxtInput] = useState('');

  const choosePhoto = () => {
    ImageCropPicker.openPicker({
      multiple: true,
    }).then((images: any) => {
      images.map((itemsss: any) => {
        try {
          if (photo.find((item: any) => item === itemsss.path)) {
            // console.log('aaaa');
          } else {
            dispatch(addImage(itemsss.path));
          }
          //   dispatch(image('aaaa'));
        } catch (error) {
          console.log(error, 'aaa');
        }
      });
    });
  };

  const check = isRequired(txtInput);
  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'TẠO BÀI VIẾT'}
        back
        onBackPress={() => props.navigation.goBack()}
      />

      <View style={stylescustom.contentContainer}>
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{width: sizes._screen_width}}>
            <View style={styles.item2}>
              <View style={styles.item3}>
                <Image source={images.avatar} style={styles.img} />
                <View style={{marginLeft: sizes._10sdp}}>
                  <Text style={styles.name}>Nguyễn Văn Kiên</Text>
                </View>
              </View>
              <ButtomDang checked={check} navigation={props.navigation} />
            </View>
            <View style={styles.gach} />
            <View style={{width: sizes._screen_width}}>
              <TextInput
                placeholder="Bạn đang nghĩ gì?"
                style={styles.txtInput}
                multiline
                scrollEnabled={true}
                cursorColor={'black'}
                value={txtInput}
                onChangeText={setTxtInput}
              />
              <RenderImage press={() => props.navigation.navigate('ChinhSua')} photo={photo} />
            </View>
            <View style={styles.gach} />
          </View>
        </ScrollView>
      </View>

      <View style={{height: 60, width: sizes._screen_width, marginLeft: 15}}>
        <TouchableOpacity style={styles.item1} onPress={choosePhoto}>
          <Image source={images.photo} style={styles.imgphoto} resizeMode={'cover'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaoBaiViet;

const styles = StyleSheet.create({
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: sizes._20sdp,
    marginTop: sizes._10sdp,
    justifyContent: 'space-between',
  },
  name: {
    color: 'black',
    fontSize: sizes._font_size_big,
    fontWeight: '600',
    fontFamily: fonts.textRegular,
  },
  img: {height: sizes._50sdp, width: sizes._50sdp, borderRadius: 60},
  txtInput: {
    color: 'black',
    fontSize: sizes._font_size_big,
    fontFamily: fonts.textRegular,
    padding: 10,
  },
  gach: {
    width: sizes._screen_width,
    height: 1,
    backgroundColor: colors.colorDargrey,
    marginTop: sizes._20sdp,
  },
  imgphoto: {tintColor: 'black', height: 40, width: 40},
  item1: {height: 40, width: 40, position: 'absolute', bottom: 10},
  img1: {
    width: sizes._screen_width,
    height: sizes._400sdp,
    resizeMode: 'cover',
    marginTop: 20,
  },
  item3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'space-around',
    height: sizes._410sdp,
  },
  image1: {
    height: sizes._200sdp,
    width: sizes._screen_width,
  },
  viewImage: {
    height: sizes._400sdp,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image2: {
    height: sizes._400sdp,
    width: sizes._screen_width * 0.6,
  },
  image3: {
    height: sizes._199sdp,
    width: sizes._screen_width * 0.39,
  },
  image4: {
    height: sizes._400sdp * 0.33,
    width: sizes._screen_width * 0.39,
  },
  viewImage1: {
    height: sizes._400sdp,
    justifyContent: 'space-between',
  },
  view: {
    height: sizes._400sdp * 0.33,
    width: sizes._screen_width * 0.39,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'white',
    fontSize: sizes._screen_width * 0.1,
    fontFamily: fonts.textRegular,
  },
});
