import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import stylescustom from '../res/stylescustom';
import Header from '../component/Header';
import WebView from 'react-native-webview';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
export default function ThanSoHoc(props: Props) {
  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'THẦN SỐ HỌC'} back onBackPress={() => props.navigation.goBack()} />
      <WebView
        style={styles.view}
        source={{
          uri: 'https://phanmemmkt.vn/than-so-hoc',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1, width: '100%', marginTop: 20},
});
