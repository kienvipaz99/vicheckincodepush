import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import IconCalender from 'react-native-vector-icons/FontAwesome';
import IconSimpe from 'react-native-vector-icons/SimpleLineIcons';

interface Props {
  name: any;
  icon: string;
  navigation: () => void;
}
const RenderItemMenu = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        height: sizes._150sdp,
        width: '40%',
        margin: '5%',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
      }}
      onPress={props.navigation}>
      <IconCalender name={props.icon} size={40} color={'black'} />
      <Text style={{marginTop: 10, fontSize: sizes._font_size_max_max, color: 'black'}}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderItemMenu;

const styles = StyleSheet.create({});
