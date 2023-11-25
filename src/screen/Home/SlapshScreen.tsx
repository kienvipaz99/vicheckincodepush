import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import images from '../../res/images';
import sizes from '../../res/sizes';
import {NavigationProp} from '@react-navigation/native';

interface SlapScreenProps {
  navigation: NavigationProp<Record<string, any>>;
}

const SlapshScreen = (props: SlapScreenProps) => {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 5000);
  });
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ImageBackground
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        source={images.slap}>
        <Image
          source={images.logoslap}
          style={{
            height: sizes._215sdp,
            width: sizes.width * 0.26,
            marginTop: sizes._screen_height * 0.3,
          }}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};

export default SlapshScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
