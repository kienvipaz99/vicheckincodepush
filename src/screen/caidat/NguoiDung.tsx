import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface NguoiDungProps {}

const NguoiDung = (props: NguoiDungProps) => {
  return (
    <View style={styles.container}>
      <Text>NguoiDung</Text>
    </View>
  );
};

export default NguoiDung;

const styles = StyleSheet.create({
  container: {},
});
