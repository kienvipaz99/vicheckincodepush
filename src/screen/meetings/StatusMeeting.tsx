import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {classify} from '../../data/classify';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {level} from '../../data/level';
import TextInputcustom from '../../component/TextInputcustom';
export default function StatusMeeting({
  setLink,
  link,
  online,
  setOnline,
}: {
  setLink: (val: string) => void;
  link: string;
  online: boolean;
  setOnline: (value: boolean) => void;
}) {
  const status = [
    {
      id: 1,
      title: 'Họp trực tuyến',
      status: true,
    },
    {
      id: 2,
      title: 'Họp Offline',
      status: false,
    },
  ];
  return (
    <>
      <Text style={[styles.titile, {marginTop: 15}]}>Trạng thái cuộc họp</Text>
      <View style={styles.view}>
        {status.map(item => (
          <Pressable
            key={item.id}
            onPress={() => {
              setOnline(item.status);
            }}
            style={styles.press}>
            <MaterialIcons
              name={online === item.status ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={21}
              color={colors.colorOrange}
              style={{marginRight: 8}}
            />
            <Text style={styles.titile}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
      {online && (
        <TextInputcustom placeholder="Link cuộc họp" icon="link" value={link} setValue={setLink} />
      )}
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
