import React, {useState, memo, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import sizes from '../res/sizes';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../res/color';
import fonts from '../res/fonts';
import {
  checknumberdayval,
  consvertThangNam,
  dayMonth,
  fullday1,
  thangnam,
  thu,
} from '../data/checkday';
import Icon from 'react-native-vector-icons/Entypo';
import RenderItemHop from './renderItem/RenderItemHop';
import {NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import stylescustom from '../res/stylescustom';
import {dayWeeks} from '../res/convert';
import {thanhphan} from '../data/feckData/datathanhphan';
import {Image} from 'react-native';
import images from '../res/images';
import axios from 'axios';
import {API_LOCAL} from '../URI_FACE';
let mm = 30 * 24 * 60 * 60 * 1000;
let ngay = new Date().getDate();
let d = new Date().toISOString().slice(0, 10);
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const DateWord = (props: Props) => {
  const [datas, setDatas] = useState<any>([]);
  const [day, setDay] = useState(new Date().getTime());
  const param = consvertThangNam(day);
  const [level, setLevel] = useState('all');
  const callApi = async (level: string) => {
    try {
      const response = await axios.get(
        `${API_LOCAL}/meeting?month=${param.month}&year=${param.year}&level=${level}`,
        config,
      );
      const groupedData = response?.data.reduce((acc: any, item: any) => {
        const key = item?.day;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
      setDatas(groupedData);
    } catch (error) {
      console.log(error);
    }
  };
  const [select, setSelect] = useState(checknumberdayval(d));
  const [dataLichHop, setDataLichHop] = useState([]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      callApi(level);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    setDataLichHop(datas[checknumberdayval(select)]);
  }, [datas]);

  const getItemLayout = (item: any, index: number) => {
    return {
      length: (sizes.width * 0.9) / 7,
      offset: ((sizes.width * 0.9) / 7) * index,
      index,
    };
  };

  const renderItem = ({item, index}: {item: string; index: number}) => {
    const color = fullday1(select) == item ? colors.colorWhite : colors.colorText;
    const fontSize =
      fullday1(select) == item ? sizes._font_size_big : sizes._font_size_big_big_large;
    const font = fullday1(select) == item ? fonts.textBold : fonts.textRegular;
    const coloraa = datas[checknumberdayval(item)] == undefined ? 'transparent' : '#4D4B4B';
    return (
      <View key={index} style={[styles.item1]}>
        <Text style={styles.item4}>{thu(item)}</Text>
        {fullday1(select) === item ? (
          <TouchableOpacity
            style={styles.item2}
            onPress={() => {
              setSelect(checknumberdayval(item));
              setDataLichHop(datas[checknumberdayval(item)]);
            }}>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0.5}}
              colors={['#11449c', '#055fc5']}
              style={styles.item2}>
              <Text style={{color: color, fontSize: fontSize, fontFamily: font}}>
                {new Date(item).getDate()}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.item2}
            onPress={() => {
              setSelect(item);
              setDataLichHop(datas[checknumberdayval(item)]);
            }}>
            <Text style={{color: color, fontSize: fontSize, fontFamily: font}}>
              {new Date(item).getDate()}
            </Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 30,
            backgroundColor: coloraa,
            marginTop: 5,
          }}
        />
      </View>
    );
  };

  const RenderItemsss = ({item, index}: {item: RoomMeeting; index: number}) => {
    return <RenderItemHop item={item} navigation={props.navigation} />;
  };
  return (
    <View style={styles.view2}>
      <View style={styles.header}>
        {thanhphan.map(item => (
          <Pressable
            key={'thanhphan' + item.id}
            style={[styles.view1, {borderColor: level === item.type ? 'red' : colors.gray}]}
            onPress={() => setLevel(item?.type)}>
            <Text
              style={[
                stylescustom.txt,
                {fontFamily: level === item.type ? fonts.textBold : fonts.textRegular},
              ]}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.view}>
        <View style={styles.item5}>
          <Icon
            onPress={() => {
              setDay(day - mm);
            }}
            name="chevron-left"
            size={30}
            color={colors.colorText}
          />
          <Text style={styles.txt1}>Tháng {thangnam(day)}</Text>
          <Icon
            onPress={() => {
              setDay(day + mm);
            }}
            name="chevron-right"
            size={30}
            color={colors.colorText}
          />
        </View>
        <View style={styles.line} />
        <FlatList
          data={dayWeeks(day)}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          getItemLayout={getItemLayout}
          snapToAlignment="start"
          initialScrollIndex={ngay - 1}
          style={{marginBottom: 10}}
        />
      </View>
      <View style={styles.item6}>
        <Text style={styles.txt1}>
          Lịch họp ({dataLichHop == undefined ? 0 : dataLichHop.length})
        </Text>
        <Text style={styles.txt3}>{thu(select) + ', ' + dayMonth(select)}</Text>
      </View>

      <View style={styles.view3}>
        {dataLichHop == undefined ? (
          <View style={styles.view4}>
            <Image source={images.notData} style={styles.img} />
            <Text style={styles.txt1}>Bạn chưa có lịch họp nào !!!</Text>
          </View>
        ) : (
          <FlatList
            data={dataLichHop}
            renderItem={RenderItemsss}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'flex-end', paddingBottom: 30}}
          />
        )}
      </View>
    </View>
  );
};
export default memo(DateWord);
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: sizes.width * 0.9,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  item1: {
    width: (sizes.width * 0.9) / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item2: {
    height: 40,
    width: 40,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item4: {
    color: colors.colorDargrey,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
    marginBottom: 10,
  },
  txt1: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
  },
  item5: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: sizes.width * 0.8,
    alignSelf: 'center',
    padding: 10,
  },
  txt3: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.045,
  },
  item6: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.width * 0.9,
    marginTop: 15,
  },
  line: {width: '100%', height: 1, backgroundColor: colors.colorDargrey, marginBottom: 10},
  view: {
    backgroundColor: colors.colorWhite,
    ...stylescustom.shadowitem,
    width: sizes.width * 0.9,
    marginTop: 20,
    borderRadius: 15,
  },
  header: {
    ...stylescustom.row2,
    width: sizes.width * 0.9,
    marginTop: 20,
  },
  view1: {
    width: (sizes.width * 0.9) / 3.1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray1,
    borderRadius: 10,
    borderWidth: 1,
  },
  view2: {
    flex: 1,
    alignItems: 'center',
  },
  view3: {marginTop: sizes._15sdp, flex: 1, width: sizes.width, alignItems: 'flex-end'},
  view4: {
    alignItems: 'center',
    width: sizes.width,
  },
  img: {
    width: sizes.width * 0.4,
    height: sizes.width * 0.4,
    marginTop: 20,
  },
});
