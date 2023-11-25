import {View} from 'react-native';
import React from 'react';
import ButonTabBar from './ButonTabBar';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const Home1 = (props: Props) => {
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <ButonTabBar navigation={props.navigation} />
      </View>
    </>
  );
};

export default Home1;
