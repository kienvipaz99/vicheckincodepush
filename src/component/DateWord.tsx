import React, {useState, memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import sizes from '../res/sizes';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../res/color';
import fonts from '../res/fonts';
import {checknumberday, fullday, thangnam, thu} from '../data/checkday';
import Icon from 'react-native-vector-icons/AntDesign';
import itemlichhop from '../data/itemlichhop';
import RenderItemHop from './renderItem/RenderItemHop';
import {NavigationProp} from '@react-navigation/native';
let mm = 30 * 24 * 60 * 60 * 1000;
let ngay = new Date().getDate();
let data: any = itemlichhop;
let d = new Date().toISOString().slice(0, 10);
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const DateWord = (props: Props) => {
  const [day, setDay] = useState(new Date().getTime());
  const [select, setSelect] = useState<any>(checknumberday());
  const [dataLichHop, setDataLichHop] = useState<any>(data[d]);
  const getItemLayout = (item: any, index: number) => {
    return {
      length: sizes._csreen_width / 7,
      offset: (sizes._csreen_width / 7) * index,
      index,
    };
  };
  const days = () => {
    let curent = new Date(day);
    let month = curent.getMonth() + 1;
    let year = curent.getFullYear();
    let numberday = new Date(year, month, 0).getDate();
    let week = [];
    for (let i = 1; i <= numberday; i++) {
      let ngay = i;
      let fullday = year + '-' + month + '-' + ngay;
      week.push(fullday);
    }
    return week;
  };

  const renderItem = ({item, index}: any) => {
    const color = select == item ? colors.colorWhite : colors.colorText;
    const fontSize = select == item ? sizes._font_size_big : sizes._font_size_big_big_large;
    const backgroundColor = select == item ? '#00CD66' : colors.colorWhite;
    const font = select == item ? fonts.textRegular : fonts.textRegular;
    const coloraa = data[item] == undefined ? 'transparent' : '#4D4B4B';
    return (
      <View key={index} style={[styles.item1]}>
        <Text style={[styles.item4]}>{thu(item)}</Text>
        <TouchableOpacity
          style={[styles.item2, {backgroundColor: backgroundColor}]}
          onPress={() => {
            setSelect(item);
            setDataLichHop(data[item]);
          }}>
          <Text style={{color: color, fontSize: fontSize, fontFamily: font}}>
            {new Date(item).getDate()}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 5,
            width: 5,
            borderRadius: 30,
            backgroundColor: coloraa,
          }}
        />
      </View>
    );
  };
  const RenderItemsss = ({item, index}: any) => {
    return <RenderItemHop item={item} navigation={props.navigation} />;
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.item5}>
          <Icon
            onPress={() => {
              setDay(day - mm);
            }}
            name="caretleft"
            size={sizes._font_size_max}
            color={colors.colorText}
          />
          <Text style={styles.txt1}>Tháng {thangnam(day)}</Text>
          <Icon
            onPress={() => {
              setDay(day + mm);
            }}
            name="caretright"
            size={sizes._font_size_max}
            color={colors.colorText}
          />
        </View>

        <View style={styles.item}>
          <FlatList
            data={days()}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            getItemLayout={getItemLayout}
            snapToAlignment="start"
            initialScrollIndex={ngay - 1}
          />
        </View>
      </View>

      <View style={styles.item7}>
        <View style={styles.item6}>
          <Text style={styles.txt2}>
            Lịch họp ({dataLichHop == undefined ? 0 : dataLichHop.length})
          </Text>
          <Text style={styles.txt3}>{thu(select) + ', ' + fullday(select)}</Text>
        </View>

        <View style={{marginTop: sizes._15sdp, height: '100%', paddingBottom: 200}}>
          {dataLichHop == undefined ? (
            <Text style={styles.txt1}>Bạn chưa có lịch họp nào !!!</Text>
          ) : (
            <FlatList
              data={dataLichHop}
              renderItem={RenderItemsss}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};
export default memo(DateWord);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: sizes._screen_width,
    alignItems: 'center',
    marginBottom: 10,
  },
  item1: {
    width: sizes._screen_width / 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  item2: {
    height: 35,
    width: 35,
    borderRadius: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  item4: {
    color: colors.colorDargrey,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },

  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_max,
  },
  item5: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: sizes._60sdp,
  },
  txt2: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
  },
  txt3: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big,
    marginRight: sizes._20sdp,
  },
  item6: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item7: {
    marginLeft: sizes._20sdp,
    marginTop: sizes._20sdp,
  },
});
