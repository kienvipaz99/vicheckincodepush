import * as React from 'react';
import {View, StyleSheet, Image, Platform, Pressable} from 'react-native';

import {Camera} from 'react-native-vision-camera';
import {useCameraDevices} from 'react-native-vision-camera';
import sizes from '../../../res/sizes';
import images from '../../../res/images';

interface ChamCongProps {
  showCamera: () => void;
  photo: (val: string) => void;
}

const Camera1 = (props: ChamCongProps) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.front;
  const camera = React.useRef<Camera>(null);
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (camera.current == null) throw new Error('Camera Ref is Null');
      if (Platform.OS === 'ios') {
        const photo = await camera.current.takePhoto({
          skipMetadata: true,
        });
        props.photo('file://' + photo.path);
      } else {
        const photo = await camera.current.takeSnapshot({
          quality: 85,
          skipMetadata: true,
        });
        props.photo('file://' + photo.path);
      }
    } catch (error) {
      console.log(error, 'aaa');
    }
    props.showCamera();
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {device != null && hasPermission ? (
          <Camera
            ref={camera}
            photo={true}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessorFps={5}></Camera>
        ) : null}
      </View>

      <Pressable onPress={takePhoto} style={styles.image1}>
        <Image source={images.cameras} style={styles.image1} />
      </Pressable>
    </View>
  );
};

export default Camera1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  faces: {
    backgroundColor: 'white',
  },
  image: {
    borderRadius: sizes._screen_width / 2,
    overflow: 'hidden',
    height: sizes._screen_width,
    width: sizes._screen_width,
    position: 'absolute',
    marginTop: sizes._50sdp,
  },
  image1: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    height: 60,
    width: 60,
  },
  view: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
