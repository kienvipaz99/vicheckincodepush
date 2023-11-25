import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import fonts from '../res/fonts';
import sizes from '../res/sizes';
import {authApi, useLogoutMutation} from '../redux/api/auth.api';
import {resetAxiosInterceptors} from '../redux/api/axiosClient';
import stylescustom from '../res/stylescustom';
import {NavigationProp} from '@react-navigation/native';
import {addUser} from '../redux/state/Data';
interface RenderItemTrangChuProps {
  item?: any;
  navigation: NavigationProp<Record<string, any>>;
}
const RenderItemTrangChu = (props: RenderItemTrangChuProps) => {
  const [logotbtn, {isLoading}] = useLogoutMutation();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await logotbtn('').unwrap();
      dispatch(
        addUser({
          email: '',
          password: '',
        }),
      );
      dispatch(authApi.util.resetApiState());
      resetAxiosInterceptors();
      props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.item1}>
      {props.item.map((item: any, index: number) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => {
              if (item.navigation === 'Login') {
                logout();
              } else {
                props.navigation.navigate(item.navigation);
              }
            }}
            style={{
              width: (sizes._screen_width * 0.9) / 3,
              alignItems: 'center',
              ...stylescustom.shadowitem,
            }}>
            <View style={[styles.item, {backgroundColor: item.background}]}>
              <Image source={item.img} style={{tintColor: item.color}} />
            </View>
            <Text style={styles.txt}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RenderItemTrangChu;

const styles = StyleSheet.create({
  item: {
    width: sizes._screen_width * 0.25,
    height: sizes._screen_width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  txt: {
    textAlign: 'center',
    color: 'black',
    fontSize: sizes._csreen_width * 0.045,
    fontFamily: fonts.textRegular,
    marginTop: 7,
    marginBottom: 10,
    width: (sizes._csreen_width * 0.9) / 3.5,
  },
  item1: {
    flexDirection: 'row',
    marginTop: sizes._40sdp,
    flexWrap: 'wrap',
    width: sizes.width * 0.9,
  },
});
