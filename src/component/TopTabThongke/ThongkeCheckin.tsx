import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import stylescustom from '../../res/stylescustom';
import Header from '../Header';
import TopTabThongke from './TopTabThongke';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}
const ThongkeCheckin = (props: Props) => {
  let number = props.route.params.number;

  return (
    <View style={stylescustom.container}>
      <Header
        title
        textTittle={'THỐNG KÊ CHECKIN'}
        back
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={stylescustom.contentContainer}>
        <TopTabThongke number={number} />
      </View>
    </View>
  );
};

export default ThongkeCheckin;

const styles = StyleSheet.create({});
