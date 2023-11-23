import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes';
import images from '../../../res/images';
import fonts from '../../../res/fonts';

interface Props {
  items: any;
  handleChange: any;
  like?: boolean;
}
const Buttomlike = (props: Props) => {
  return (
    <TouchableOpacity
      style={{height: 25, width: 25, marginRight: 10}}
      key={props.items?.id}
      onPress={() => props.handleChange(props.items?.id)}>
      <View style={styles.item3}>
        <Image
          source={props.items.like ? images.like1 : images.unlike}
          style={{
            height: 25,
            width: 25,
            tintColor: props.items.like ? '#1877f2' : undefined,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Buttomlike;

const styles = StyleSheet.create({
  txt1: {
    marginLeft: 10,
    fontFamily: fonts.text,
    color: 'black',
    fontSize: sizes._font_size_big_big_large,
  },
  item3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
