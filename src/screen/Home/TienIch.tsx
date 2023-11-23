import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import stylescustom from '../../res/stylescustom';
import itemTienich from '../../data/itemTienich';
import sizes from '../../res/sizes';
const TienIch = ({navigation}: any) => {
  function renderItem({item, index}: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{margin: 5}}
        onPress={() => {
          if (item.check == 0) {
            ToastAndroid.show('Tính năng đang phát triển !', ToastAndroid.SHORT);
          } else {
            navigation.navigate(item.navigation);
          }
        }}>
        <Image source={item.image} style={{width: sizes._csreen_width * 0.43, height: 100}} />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <Header title textTittle={'TIỆN ÍCH'} back onBackPress={() => navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <FlatList
          data={itemTienich}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          renderItem={renderItem}
          numColumns={2}
          style={{width: '100%', marginTop: sizes._20sdp}}
        />
      </View>
    </View>
  );
};

export default TienIch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
