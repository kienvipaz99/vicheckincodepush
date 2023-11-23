import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import sizes from '../res/sizes';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const Timkeeping = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'Chấm công tháng'}
        back
        onBackPress={() => props.navigation.goBack()}
      />

      <Text style={styles.text1}>Tổng hợp ngày công</Text>
    </View>
  );
};

export default Timkeeping;

const styles = StyleSheet.create({
  text1: {
    marginLeft: sizes._25sdp,
    marginTop: sizes._35sdp,
    fontSize: sizes._font_size_max_max,
    fontWeight: '500',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
