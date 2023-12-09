import {StyleSheet, Text} from 'react-native';
import React from 'react';
import stylescustom from '../../res/stylescustom';

export default function TextError({text}: {text: string}) {
  return <>{text && <Text style={stylescustom.err}>{text}</Text>}</>;
}

const styles = StyleSheet.create({});
