import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import {useDispatch, useSelector} from 'react-redux';
import {addImage, deleteImage, image} from '../../redux/state/image';
import sizes from '../../res/sizes';
import images from '../../res/images';
import ImageCropPicker from 'react-native-image-crop-picker';
import {NavigationProp} from '@react-navigation/native';
interface ViewImageProps {
  navigation: NavigationProp<Record<string, any>>;
}
const ChinhSua = (props: ViewImageProps) => {
  const datas: any = useSelector(image);
  const dispatch = useDispatch();
  const data = datas.payload.checkimage.image;

  const deleteimg = (val: any) => {
    dispatch(deleteImage(val));
  };
  const choosePhoto = async () => {
    ImageCropPicker.openPicker({
      multiple: true,
    }).then(images => {
      images.map(itemsss => {
        try {
          if (data.find((item: any) => item === itemsss.path)) {
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
  const RenderItem = ({item, index}: any) => {
    return (
      <ImageBackground source={{uri: item}} style={styles.imgbg}>
        <TouchableOpacity style={styles.icon1} onPress={() => deleteimg(item)}>
          <Image source={images.iconX} style={styles.icon} />
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'CHỈNH SỬA'} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={RenderItem}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity style={styles.footer} onPress={choosePhoto}>
                  <Text style={styles.footerText}>+ {'  '}Thêm ảnh</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChinhSua;

const styles = StyleSheet.create({
  container: {
    width: sizes._screen_width,
  },
  icon: {
    height: 30,
    width: 30,
    tintColor: 'white',
    elevation: 20,
  },
  icon1: {
    height: 30,
    width: 30,
    marginTop: sizes._10sdp,
    alignSelf: 'flex-end',
    marginRight: sizes._10sdp,
    elevation: 20,
  },
  imgbg: {
    width: sizes._screen_width,
    height: sizes._screen_height * 0.8,
    marginBottom: sizes._20sdp,
  },
  footer: {
    height: sizes._40sdp,
    width: sizes._screen_width * 0.9,
    borderColor: '#1877f2',
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes._15sdp,
  },
  footerText: {
    color: '#1877f2',
    fontSize: sizes._font_size_big_big_large,
  },
});
