import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {classify} from '../../data/classify';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {level} from '../../data/level';
export default function SelectClasify({
  select,
  setSelect,
  levels,
  setLevel,
}: {
  select: string;
  setSelect: (val: string) => void;
  levels: string;
  setLevel: (val: string) => void;
}) {
  return (
    <>
      <Text style={[styles.titile, {marginTop: 15}]}>Mức độ cuộc họp</Text>
      <View style={styles.view}>
        {level.map(item => (
          <Pressable key={item.id} onPress={() => setLevel(item?.name)} style={styles.press}>
            <MaterialIcons
              name={levels === item.name ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={21}
              color={colors.colorOrange}
              style={{marginRight: 8}}
            />
            <Text style={styles.titile}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.titile, {marginTop: 15}]}>Phạm vi cuộc họp</Text>
      <View style={styles.view}>
        {classify.map(item => (
          <Pressable key={item.id} onPress={() => setSelect(item?.name)} style={styles.press}>
            <MaterialIcons
              name={select === item.name ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={21}
              color={colors.colorOrange}
              style={{marginRight: 8}}
            />
            <Text style={styles.titile}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titile: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  press: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
