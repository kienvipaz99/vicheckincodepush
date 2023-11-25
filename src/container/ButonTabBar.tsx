import {Image, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home/Home';
import images from '../res/images';
import fonts from '../res/fonts';
import TienIch from '../screen/Home/TienIch';
import LichVanNien from '../screen/Home/LichVanNien';
import TimekeepingRating from '../screen/TimekeepingRating';
import sizes from '../res/sizes';
import PersonalInformation from '../screen/PersonalInformation';
import {NavigationProp} from '@react-navigation/native';
import stylescustom from '../res/stylescustom';

const Tab = createBottomTabNavigator();
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const ButonTabBar = (props: Props) => {
  const isAndroid = Platform.OS === 'android';
  return (
    <Tab.Navigator
      initialRouteName="Trang chủ"
      screenOptions={{
        tabBarActiveTintColor: '#12449c',

        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: sizes._screen_height * 0.1,
          ...stylescustom.shadowitem,
        },
        tabBarLabelStyle: {
          fontSize: sizes._screen_width * 0.035,
          fontFamily: fonts.textRegular,
          marginBottom: isAndroid ? 3 : 0,
        },
      }}>
      <Tab.Screen
        name="Lịch"
        component={LichVanNien}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <>
                <Image
                  source={images.iconlich}
                  style={{height: 27, width: 27}}
                  resizeMode={'contain'}
                />
              </>
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
                <Image source={images.BXH} style={{height: 26, width: 24.5}} />
              </>
            );
          },

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Trang chủ')}
                activeOpacity={1}
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 60,
                  bottom: 10,
                  ...stylescustom.shadowitem,
                }}>
                <Image source={images.home} style={{height: 30, width: 30}} />
              </TouchableOpacity>
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
                  style={{height: 26, width: 26, resizeMode: 'cover'}}
                />
              </>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Người dùng"
        component={PersonalInformation}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <>
                <Image source={images.icnguoidung} style={{height: 37, width: 37}} />
              </>
            );
          },

          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default ButonTabBar;
