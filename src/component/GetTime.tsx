import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import fonts from '../res/fonts';
import sizes from '../res/sizes';

export default function GetTime() {
  const [time, setTime] = useState<any>(new Date().toLocaleTimeString());
  useEffect(() => {
    let secTimer = setInterval(() => {
      const d = new Date();
      const hh = [d.getHours(), d.getMinutes(), d.getSeconds()].map(a => (a < 10 ? '0' + a : a));
      setTime(hh.join(':'));
      // setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);
  return (
    <>
      <Text style={styles.text1}>{time}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: 'white',
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_maxs,
  },
});
