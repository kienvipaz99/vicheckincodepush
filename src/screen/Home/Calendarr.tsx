import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../component/Header';
import sizes from '../../res/sizes';
import DateWord from '../../component/DateWord';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const Calendarr = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header
        title
        textTittle={'LỊCH HỌP'}
        back
        onBackPress={() => props.navigation.goBack()}
        rightContent
        taolichhop
        onPressTaoLichHop={() => props.navigation.navigate('TaoLichHop')}
      />
      <View style={styles.contentContainer}>
        <DateWord navigation={props.navigation} />
      </View>
    </View>
  );
};
export default Calendarr;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: sizes._20sdp,
    width: '100%',
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
  },
  view: {width: '100%', height: '100%'},
});
