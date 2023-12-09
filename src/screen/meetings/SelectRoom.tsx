import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../res/color';
import fonts from '../../res/fonts';
import sizes from '../../res/sizes';
import axios from 'axios';
import {API_LOCAL} from '../../URI_FACE';
interface Room {
  id: number;
  name: string;
  location: string;
  status: boolean;
}
export default function SelectRoom({
  value,
  setValue,
}: {
  value: number;
  setValue: (val: number) => void;
}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState<Room[]>([]);
  useEffect(() => {
    const requset = async () => {
      try {
        const datas = await axios.get(`${API_LOCAL}/room_meet`, config);
        setData(datas?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    requset();
  }, []);
  const renderItem = (item: Room) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item?.name}</Text>
        {item.id === value && (
          <MaterialIcons
            style={styles.icon}
            color={colors.colorOrange}
            name="radio-button-checked"
            size={25}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.placeholderStyle}
      data={data || []}
      maxHeight={200}
      labelField="name"
      valueField="id"
      placeholder={'Chọn phòng họp'}
      //@ts-ignore
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item?.id);
        setIsFocus(false);
      }}
      renderItem={renderItem}
      renderLeftIcon={() => (
        <MaterialIcons
          style={styles.icon}
          color={isFocus ? colors.colorOrange : colors.colorDargrey}
          name="home-work"
          size={25}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: colors.colorText,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  label: {
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.04,
  },
  icon: {
    marginRight: 5,
  },
});
