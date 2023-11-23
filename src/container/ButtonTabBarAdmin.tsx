import {StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import sizes from '../res/sizes';
import Manage from '../screenadmin/TrangchuAdmin';
import images from '../res/images';
import fonts from '../res/fonts';
import LichVanNien from '../screen/Home/LichVanNien';
import ChamCong from '../screen/Home/ChamCong';
import TimekeepingRating from '../screen/TimekeepingRating';
import TienIch from '../screen/Home/TienIch';
import {NavigationProp} from '@react-navigation/native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const Tab = createBottomTabNavigator();
const ButonTabBarAdmin = (props: Props) => {
  const isAndroid = Platform.OS === 'android';
  return (
    <Tab.Navigator
      initialRouteName="Trang chủ"
      screenOptions={{
        tabBarActiveTintColor: '#12449c',

        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: sizes._screen_height * 0.09,
        },
        tabBarLabelStyle: {
          fontSize: sizes._screen_width * 0.035,
          fontFamily: fonts.textRegular,
          marginBottom: isAndroid ? 3 : -10,
        },
      }}>
      <Tab.Screen
        name="Trang chủ"
        component={Manage}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <>
                <Image
                  source={images.home}
                  resizeMode={'contain'}
                  style={{height: 29, width: 29}}
                />
              </>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Lịch"
        component={LichVanNien}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <>
                <Image
                  source={images.iconlich}
                  resizeMode={'contain'}
                  style={{height: 27, width: 27}}
                />
              </>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chấm công"
        component={ChamCong}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Chấm công')}
                activeOpacity={1}
                style={styles.view}>
                <Image
                  source={images.camera}
                  resizeMode={'contain'}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="BXH"
        component={TimekeepingRating}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <>
                <Image source={images.BXH} resizeMode={'contain'} style={{height: 27, width: 27}} />
              </>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tiện ích"
        component={TienIch}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <>
                <Image
                  source={images.tienich}
                  resizeMode={'contain'}
                  style={{height: 27, width: 27}}
                />
              </>
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default ButonTabBarAdmin;

const styles = StyleSheet.create({
  view: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    bottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
});
