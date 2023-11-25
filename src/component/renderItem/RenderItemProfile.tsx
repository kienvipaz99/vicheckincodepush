import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import Icons from 'react-native-vector-icons/AntDesign';
import IconUser from 'react-native-vector-icons/FontAwesome';
import IconBook from 'react-native-vector-icons/MaterialCommunityIcons';
import IconRank from 'react-native-vector-icons/EvilIcons';
import IconLogout from 'react-native-vector-icons/Entypo';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  name: string;
  icon: string;
  navi: any;
  navigation: NavigationProp<Record<string, any>>;
}

const RenderItemProfile = (props: Props) => {
  const Icon = () => {
    return (
      <>
        {props.icon === 'user' && (
          <IconUser name={props.icon} color={'black'} size={30} style={{width: 30}} />
        )}
        {props.icon === 'book-edit-outline' && (
          <IconBook name={props.icon} color={'black'} size={30} style={{width: 30}} />
        )}
        {props.icon === 'chart' && (
          <IconRank name={props.icon} color={'black'} size={30} style={{width: 30}} />
        )}
        {props.icon === 'lock-reset' && (
          <IconBook name={props.icon} color={'black'} size={30} style={{width: 30}} />
        )}
        {props.icon === 'log-out' && (
          <IconLogout name={props.icon} color={'black'} size={30} style={{width: 30}} />
        )}
      </>
    );
  };
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate(props.navi);
      }}
      style={styles.item}>
      <Icon />
      <Text style={styles.text}>{props.name}</Text>

      <Icons name="right" color={'black'} size={30} />
    </TouchableOpacity>
  );
};

export default RenderItemProfile;

const styles = StyleSheet.create({
  item: {
    height: sizes._60sdp,
    width: '100%',
    borderRadius: sizes._15sdp,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: sizes._20sdp,
  },
  text: {width: '75%', fontSize: sizes._font_size_maxs, color: 'black', marginLeft: sizes._15sdp},
});
