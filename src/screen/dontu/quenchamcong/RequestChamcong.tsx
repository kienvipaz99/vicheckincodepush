import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes';
import stylescustom from '../../../res/stylescustom';
import colors from '../../../res/color';
export default function RequestChamcong({data}: {data?: attendanceRequest[]}) {
  const RenderItem = ({item, index}: {item: attendanceRequest; index: number}) => {
    return (
      <View style={styles.view}>
        <Text>{index + 1}. Đơn quên chấm công</Text>
        <View style={stylescustom.row2}>
          <Text>Ngày:</Text>
          <Text>{item?.in_date}</Text>
        </View>
        <View style={stylescustom.row2}>
          <Text>Chấm công vào:</Text>
          <Text>{item?.in_date}</Text>
        </View>
        <View style={stylescustom.row2}>
          <Text>Chấm công ra:</Text>
          <Text>{item?.in_date}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item, index}: {item: attendanceRequest; index: number}) => (
          <RenderItem item={item} index={index} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    padding: 10,
    borderRadius: 15,
    ...stylescustom.shadowitem,
    backgroundColor: colors.colorWhite,
    alignSelf: 'center',
    marginTop: 20,
  },
});
