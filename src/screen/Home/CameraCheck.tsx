import * as React from 'react';
import {View, StyleSheet, Image, Platform, Pressable} from 'react-native';
import Header from '../../component/Header';
import {Camera} from 'react-native-vision-camera';
import {useCameraDevices} from 'react-native-vision-camera';
import sizes from '../../res/sizes';
import images from '../../res/images';
import fonts from '../../res/fonts';
// import {checkin} from '../../redux/state/Data';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import URI_FACE, {config} from '../../URI_FACE';
import {NavigationProp} from '@react-navigation/native';
interface ChamCongProps {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}

const CameraCheck = (props: ChamCongProps) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const {uuid} = props.route?.params;
  const devices = useCameraDevices();
  const device = devices.front;
  const camera = React.useRef<Camera>(null);
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  const formData = new FormData();
  const takePhoto = async () => {
    try {
      if (camera.current == null) throw new Error('Camera Ref is Null');
      if (Platform.OS === 'ios') {
        const photo = await camera.current.takePhoto({
          skipMetadata: true,
        });
        // dispatch(checkin('file://' + photo.path));
      } else {
        const photo = await camera.current.takeSnapshot({
          quality: 85,
          skipMetadata: true,
        });
        // dispatch(checkin('file://' + photo.path));
        const item = {
          uri: 'file://' + photo.path,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };
        formData.append('photo', item);
        const up = await axios.post(`${URI_FACE}/photo/verify/${uuid}`, formData, config);

        await props.navigation.navigate('Chấm công', up.data?.status);
      }
    } catch (error) {}
  };
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Header title textTittle={'CHẤM CÔNG'} back onBackPress={() => props.navigation.goBack()} />
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'black',
        }}>
        <View
          style={{
            borderRadius: sizes._screen_width / 2,
            overflow: 'hidden',
            height: sizes._screen_width,
            width: sizes._screen_width,
            position: 'absolute',
            marginTop: sizes._50sdp,
          }}>
          {device != null && hasPermission ? (
            <Camera
              ref={camera}
              {...props}
              photo={true}
              style={{
                height: sizes._screen_width,
                width: sizes._screen_width,
              }}
              device={device}
              isActive={true}
              // frameProcessor={frameProcessor}
              frameProcessorFps={5}></Camera>
          ) : null}
        </View>

        <Pressable
          onPress={takePhoto}
          style={{position: 'absolute', alignSelf: 'center', bottom: 20}}>
          <Image
            source={images.cameras}
            style={{
              tintColor: 'white',
              width: 60,
              height: 60,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CameraCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  faces: {
    backgroundColor: 'white',
  },
  faceDesc: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: fonts.textRegular,
  },
});
