import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import stylescustom from '../../../res/stylescustom';
import Header from '../../../component/Header';
import colors from '../../../res/color';
import sizes from '../../../res/sizes';
import TextInputcustom from '../../../component/TextInputcustom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../../res/fonts';
import BuntomCustom1 from '../../../component/BuntomCustom1';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {checknumberdayval, consvertTime, gettimesss} from '../../../data/checkday';
import loailamviec from '../../../data/muc/loailamviec';
import {chonloai} from '../../../data/vietsub/vietsub';
import danhsachthoigianlamviec from '../../../data/itemnhanvien/danhsachthoigianlamviec';
import Loading from '../../../component/Loading';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import Modalselect from '../../../component/modal/Modalselect';
import ModalMuntiselectNhanVien from '../../../component/modal/ModalMuntiselectNhanVien';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalDelete from '../../../component/modal/ModalDelete';
import {useGetdepartmentsQuery, useWorkingShiftsMutation} from '../../../redux/api/auth.api';
import {NavigationProp} from '@react-navigation/native';
import {Alert} from 'react-native';
interface Props {
  navigation: NavigationProp<Record<string, any>>;
  route?: any;
}
export default function ThemCaLamViec(props: Props) {
  const {name, description, start_date, end_date, start_at, end_at, type, id} =
    props?.route?.params?.item || {};

  const [tenca, setTenCa] = useState(name);
  const [errtenca, setErrTenCa] = useState('');
  const [chuthich, setChuThich] = useState(description);
  const [timecheckin, settimecheckin] = useState(start_date);
  const [errtimecheckin, setErrtimecheckin] = useState('');
  const [timecheckout, setTimecheckout] = useState(end_date);
  const [timelinestart, setTimelinestart] = useState(start_at);
  const [errtimelinestart, setErrTimelinestart] = useState('');
  const [timelineend, setTimelineend] = useState(end_at);
  const [errtimelineend, setErrTimelineend] = useState('');
  const [showcheckin, setShowcheckin] = useState(false);
  const [showcheckout, setShowcheckout] = useState(false);
  const [showbatdau, setShowbatdau] = useState(false);
  const [showketthuc, setShowketthuc] = useState(false);
  const [checkkieu, setCheckkieu] = useState(type ? type : 'regular');
  const [chonthu, setChonthu] = useState<any>([]);
  const [showPhongBan, setShowPhongBan] = useState(false);
  const [chonPhongBan, setchonPhongBan] = useState<any>('');
  const [showNhanVien, setshowNhanVien] = useState(false);
  const [chonNhanVien, setchonNhanVien] = useState<any>('');
  const [data, setData] = useState<any>(danhsachthoigianlamviec);
  const [timestThu2, setTimestThu2] = useState('');
  const [timeenThu2, setTimeedThu2] = useState('');
  const [timestThu3, setTimestThu3] = useState('');
  const [timeenThu3, setTimeedThu3] = useState('');
  const [timestThu4, setTimestThu4] = useState('');
  const [timeenThu4, setTimeedThu4] = useState('');
  const [timestThu5, setTimestThu5] = useState('');
  const [timeenThu5, setTimeedThu5] = useState('');
  const [timestThu6, setTimestThu6] = useState('');
  const [timeenThu6, setTimeedThu6] = useState('');
  const [timestThu7, setTimestThu7] = useState('');
  const [timeenThu7, setTimeedThu7] = useState('');
  const [timestCN, setTimestCN] = useState('');
  const [timeenCN, setTimeedCN] = useState('');
  const [showst2, setShowst2] = useState(false);
  const [showen2, setShowen2] = useState(false);
  const [showst3, setShowst3] = useState(false);
  const [showen3, setShowen3] = useState(false);
  const [showst4, setShowst4] = useState(false);
  const [showen4, setShowen4] = useState(false);
  const [showst5, setShowst5] = useState(false);
  const [showen5, setShowen5] = useState(false);
  const [showst6, setShowst6] = useState(false);
  const [showen6, setShowen6] = useState(false);
  const [showst7, setShowst7] = useState(false);
  const [showen7, setShowen7] = useState(false);
  const [showstcn, setShowstcn] = useState(false);
  const [showencn, setShowencn] = useState(false);
  const timeoutIdRef: any = useRef();
  const handleChange = (val: any) => {
    let temp = data.map((item: any) => {
      if (val === item.name) {
        return {...item, isChecked: !item.isChecked};
      }
      return item;
    });
    setData(temp);
  };

  useEffect(() => {
    let notes = data?.filter((item: any) => item.isChecked === true).map((item: any) => item.note);
    setChonthu(notes);
  }, [data]);

  const {data: departments} = useGetdepartmentsQuery('');
  const [WorkingShift, {isLoading}] = useWorkingShiftsMutation();
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const defaultData = {
    start_at: timelinestart,
    end_at: timelineend,
    is_weekend: 0,
  };
  const result = [] as any;
  daysOfWeek.forEach(day => {
    const obj = {weekday: day, ...defaultData};
    if (chonthu && chonthu.includes(day)) {
      obj.start_at = null;
      obj.end_at = null;
      obj.is_weekend = 1;
    }
    result.push(obj);
  });
  const sua = async () => {
    try {
      await WorkingShift({
        url: `/api/v1/working-shifts/${id}`,
        data: {
          name: tenca,
          type: checkkieu,
          departments: chonPhongBan ? [chonPhongBan.id] : [],
          weekdays: chonthu,
          users: chonNhanVien ? chonNhanVien : [],
          start_date: timecheckin,
          end_date: timecheckout,
          start_at: timelinestart,
          end_at: timelineend,
          description: chuthich,
          details:
            checkkieu === 'regular'
              ? result
              : [
                  {
                    weekday: 'sun',
                    start_at: timestCN,
                    end_at: timeenCN,
                    is_weekend: timeenCN ? 0 : 1,
                  },
                  {
                    weekday: 'mon',
                    start_at: timestThu2,
                    end_at: timeenThu2,
                    is_weekend: timeenThu2 ? 0 : 1,
                  },
                  {
                    weekday: 'tue',
                    start_at: timestThu3,
                    end_at: timeenThu3,
                    is_weekend: timeenThu3 ? 0 : 1,
                  },
                  {
                    weekday: 'wed',
                    start_at: timestThu4,
                    end_at: timeenThu4,
                    is_weekend: timeenThu4 ? 0 : 1,
                  },
                  {
                    weekday: 'thu',
                    start_at: timestThu5,
                    end_at: timeenThu5,
                    is_weekend: timeenThu5 ? 0 : 1,
                  },
                  {
                    weekday: 'fri',
                    start_at: timestThu6,
                    end_at: timeenThu6,
                    is_weekend: timeenThu6 ? 0 : 1,
                  },
                  {
                    weekday: 'sat',
                    start_at: timestThu7,
                    end_at: timeenThu7,
                    is_weekend: timeenThu7 ? 0 : 1,
                  },
                ],
        },
        type: 'PATCH',
      }).unwrap();
      Alert.alert('Cập nhật thành công');
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Cập nhật thất bại');
    }
  };

  const check = async () => {
    try {
      await WorkingShift({
        url: `/api/v1/working-shifts`,
        data: {
          name: tenca,
          type: checkkieu,
          departments: chonPhongBan ? [chonPhongBan.id] : [],
          weekdays: chonthu,
          users: chonNhanVien ? chonNhanVien : [],
          start_date: timecheckin,
          end_date: timecheckout,
          start_at: timelinestart,
          end_at: timelineend,
          description: chuthich,
          details:
            checkkieu === 'regular'
              ? result
              : [
                  {
                    weekday: 'sun',
                    start_at: timestCN,
                    end_at: timeenCN,
                    is_weekend: timeenCN ? 0 : 1,
                  },
                  {
                    weekday: 'mon',
                    start_at: timestThu2,
                    end_at: timeenThu2,
                    is_weekend: timeenThu2 ? 0 : 1,
                  },
                  {
                    weekday: 'tue',
                    start_at: timestThu3,
                    end_at: timeenThu3,
                    is_weekend: timeenThu3 ? 0 : 1,
                  },
                  {
                    weekday: 'wed',
                    start_at: timestThu4,
                    end_at: timeenThu4,
                    is_weekend: timeenThu4 ? 0 : 1,
                  },
                  {
                    weekday: 'thu',
                    start_at: timestThu5,
                    end_at: timeenThu5,
                    is_weekend: timeenThu5 ? 0 : 1,
                  },
                  {
                    weekday: 'fri',
                    start_at: timestThu6,
                    end_at: timeenThu6,
                    is_weekend: timeenThu6 ? 0 : 1,
                  },
                  {
                    weekday: 'sat',
                    start_at: timestThu7,
                    end_at: timeenThu7,
                    is_weekend: timeenThu7 ? 0 : 1,
                  },
                ],
        },
        type: 'POST',
      }).unwrap();
      Alert.alert('Cập nhật thành công');
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Cập nhật thất bại');
    }
  };
  return (
    <View style={stylescustom.container}>
      <Header title textTittle={'CA LÀM VIỆC'} back onBackPress={() => props.navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: sizes._20sdp,
              alignItems: 'center',
              marginBottom: 20,
              width: sizes._screen_width * 0.9,
              alignSelf: 'center',
            }}>
            <Text style={styles.text}>Thông tin ca làm</Text>
            <View style={styles.gach} />
            <TextInputcustom
              icon="pencil"
              placeholder={'Nhập tên ca'}
              value={tenca}
              setValue={(val: any) => setTenCa(val)}
            />
            {errtenca ? <Text style={stylescustom.err}>{errtenca}</Text> : null}

            <TextInputcustom
              icon="pencil"
              placeholder={'Ghi chú'}
              value={chuthich}
              setValue={setChuThich}
            />
            <Text style={[styles.text, {marginTop: sizes._30sdp}]}>Thời gian hiệu lực</Text>
            <View style={styles.gach} />
            <TouchableOpacity style={styles.textinput} onPress={() => setShowcheckin(true)}>
              <MaterialCommunityIcons name="clock-check" color={'#3366FF'} size={24} />
              <Text style={styles.text1}>{timecheckin ? timecheckin : 'Ngày bắt đầu'}</Text>
            </TouchableOpacity>
            {errtimecheckin ? <Text style={stylescustom.err}>{errtimecheckin}</Text> : null}
            <TouchableOpacity style={styles.textinput} onPress={() => setShowcheckout(true)}>
              <MaterialCommunityIcons name="clock-alert" color={'#3366FF'} size={24} />
              <Text style={styles.text1}>{timecheckout ? timecheckout : 'Ngày kết thúc'}</Text>
            </TouchableOpacity>

            <Text style={[styles.text, {marginTop: sizes._30sdp}]}>Chọn loại</Text>
            <View style={styles.gach} />
            <View style={[stylescustom.row2, {width: sizes._screen_width * 0.9, marginTop: 15}]}>
              {loailamviec.map((item: any, index: any) => {
                return (
                  <View key={index} style={stylescustom.row1}>
                    <Icon
                      name={
                        checkkieu == item.name
                          ? 'checkbox-marked-circle'
                          : 'checkbox-blank-circle-outline'
                      }
                      color={'#3366FF'}
                      size={25}
                      onPress={() => setCheckkieu(item.name)}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: sizes._screen_width * 0.04,
                      }}>
                      {chonloai(item.name)}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.gach} />

            {checkkieu === 'regular' ? (
              <>
                <Text style={[styles.text, {marginTop: sizes._30sdp}]}>Thời gian làm việc</Text>
                <View style={styles.gach} />
                <TouchableOpacity style={styles.textinput} onPress={() => setShowbatdau(true)}>
                  <MaterialCommunityIcons name="clock-check" color={'#3366FF'} size={24} />
                  <Text style={styles.text1}>
                    {timelinestart ? consvertTime(timelinestart) : 'Bắt đầu'}
                  </Text>
                </TouchableOpacity>
                {errtimelinestart ? <Text style={stylescustom.err}>{errtimelinestart}</Text> : null}
                <TouchableOpacity style={styles.textinput} onPress={() => setShowketthuc(true)}>
                  <MaterialCommunityIcons name="clock-alert" color={'#3366FF'} size={24} />
                  <Text style={styles.text1}>
                    {timelineend ? consvertTime(timelineend) : 'Kết thúc'}
                  </Text>
                </TouchableOpacity>
                {errtimelineend ? <Text style={stylescustom.err}>{errtimelineend}</Text> : null}
                <Text style={[styles.text, {marginTop: sizes._30sdp}]}>
                  Chọn ngày nghỉ cuối tuần
                </Text>
                <View
                  style={[
                    stylescustom.row2,
                    {
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      marginTop: 20,
                    },
                  ]}>
                  {data?.map((item: any, index: any) => {
                    return (
                      <View key={index} style={[stylescustom.row1, {margin: 5}]}>
                        <Icon
                          name={
                            item?.isChecked == true
                              ? 'checkbox-marked-circle'
                              : 'checkbox-blank-circle-outline'
                          }
                          color={'#3366FF'}
                          size={25}
                          onPress={() => handleChange(item?.name)}
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: sizes._screen_width * 0.04,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </>
            ) : (
              <>
                <Text style={[styles.text, {marginTop: sizes._30sdp}]}>Chọn gian làm việc</Text>
                <View style={[stylescustom.row2, styles.viewthu]}>
                  <Text style={styles.thu}>Thứ 2</Text>
                  <TouchableOpacity style={styles.time} onPress={() => setShowst2(true)}>
                    <Text>{timestThu2 ? consvertTime(timestThu2) : null}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.time} onPress={() => setShowen2(true)}>
                    <Text>{timeenThu2 ? consvertTime(timeenThu2) : null}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    stylescustom.row2,
                    {
                      marginTop: 10,
                      width: sizes._screen_width * 0.9,
                    },
                  ]}>
                  <Text style={styles.thu}>Thứ 3</Text>
                  <TouchableOpacity style={styles.time} onPress={() => setShowst3(true)}>
                    <Text>{timestThu3 ? consvertTime(timestThu3) : null}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.time} onPress={() => setShowen3(true)}>
                    <Text>{timeenThu3 ? consvertTime(timeenThu3) : null}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    stylescustom.row2,
                    {
                      marginTop: 10,
                      width: sizes._screen_width * 0.9,
                    },
                  ]}>
                  <Text style={styles.thu}>Thứ 4</Text>
                  <TouchableOpacity style={styles.time} onPress={() => setShowst4(true)}>
                    <Text>{timestThu4 ? consvertTime(timestThu4) : null}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.time} onPress={() => setShowen4(true)}>
                    <Text>{timeenThu4 ? consvertTime(timeenThu4) : null}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    stylescustom.row2,
                    {
                      marginTop: 10,
                      width: sizes._screen_width * 0.9,
                    },
                  ]}>
                  <Text style={styles.thu}>Thứ 5</Text>
                  <TouchableOpacity style={styles.time} onPress={() => setShowst5(true)}>
                    <Text>{timestThu5 ? consvertTime(timestThu5) : null}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.time} onPress={() => setShowen5(true)}>
                    <Text>{timeenThu5 ? consvertTime(timeenThu5) : null}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    stylescustom.row2,
                    {
                      marginTop: 10,
                      width: sizes._screen_width * 0.9,
                    },
                  ]}>
                  <Text style={styles.thu}>Thứ 6</Text>
                  <TouchableOpacity style={styles.time} onPress={() => setShowst6(true)}>
                    <Text>{timestThu6 ? consvertTime(timestThu6) : null}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.time} onPress={() => setShowen6(true)}>
                    <Text>{timeenThu6 ? consvertTime(timeenThu6) : null}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    stylescustom.row2,
                    {
                      marginTop: 10,
                      width: sizes._screen_width * 0.9,
                    },
                  ]}>
                  <Text style={styles.thu}>Thứ 7</Text>
                  <TouchableOpacity style={styles.time} onPress={() => setShowst7(true)}>
                    <Text>{timestThu7 ? consvertTime(timestThu7) : null}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.time} onPress={() => setShowen7(true)}>
                    <Text>{timeenThu7 ? consvertTime(timeenThu7) : null}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    stylescustom.row2,
                    {
                      marginTop: 10,
                      width: sizes._screen_width * 0.9,
                    },
                  ]}>
                  <Text style={styles.thu}>Chủ nhật</Text>
                  <TouchableOpacity style={styles.time} onPress={() => setShowstcn(true)}>
                    <Text>{timestCN ? consvertTime(timestCN) : null}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.time} onPress={() => setShowencn(true)}>
                    <Text>{timeenCN ? consvertTime(timeenCN) : null}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <Text style={[styles.text, {marginTop: sizes._30sdp}]}>Thêm phòng ban</Text>
            <View style={styles.gach} />
            <TouchableOpacity style={styles.textinput} onPress={() => setShowPhongBan(true)}>
              <View style={stylescustom.row1}>
                <MaterialIcons
                  name="group-work"
                  color={'#3366FF'}
                  size={25}
                  style={{marginLeft: sizes._8sdp}}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: sizes._font_size_big,
                    marginLeft: 5,
                    fontFamily: fonts.textRegular,
                  }}>
                  {chonPhongBan
                    ? chonPhongBan.name
                      ? chonPhongBan.name
                      : chonPhongBan
                    : 'Thêm phòng ban'}
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={[styles.text, {marginTop: sizes._30sdp}]}>Thêm viên</Text>
            <View style={styles.gach} />
            <TouchableOpacity style={styles.textinput} onPress={() => setshowNhanVien(true)}>
              <View style={stylescustom.row1}>
                <MaterialIcons
                  name="group-work"
                  color={'#3366FF'}
                  size={25}
                  style={{marginLeft: sizes._8sdp}}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: sizes._font_size_big,
                    marginLeft: 5,
                    fontFamily: fonts.textRegular,
                  }}>
                  {'Thêm nhân viên'}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                marginTop: sizes._25sdp,
                width: sizes._screen_width * 0.9,
              }}>
              <BuntomCustom1 text="Lưu" onpress={id ? sua : check} />
            </View>
          </View>
        </ScrollView>
      </View>
      {isLoading && <Loading />}

      <DateTimePickerModal
        isVisible={showcheckin}
        is24Hour={true}
        mode="date"
        onConfirm={(date: Date) => {
          let time = checknumberdayval(date);
          settimecheckin(time);
          setShowcheckin(false);
        }}
        onCancel={() => setShowcheckin(false)}
      />
      <DateTimePickerModal
        isVisible={showcheckout}
        is24Hour={true}
        mode="date"
        onConfirm={(date: Date) => {
          let time = checknumberdayval(date);

          setTimecheckout(time);

          setShowcheckout(false);
        }}
        onCancel={() => setShowcheckout(false)}
      />
      <DateTimePickerModal
        isVisible={showbatdau}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setErrTimelinestart('');
          setTimelinestart(time);
          setShowbatdau(false);
        }}
        onCancel={() => setShowbatdau(false)}
      />
      <DateTimePickerModal
        isVisible={showketthuc}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimelineend(time);
          setShowketthuc(false);
        }}
        onCancel={() => setShowketthuc(false)}
      />
      <Modalselect
        isShow={showPhongBan}
        item={departments?.data}
        name={'Chọn phòng ban'}
        toggleDate={() => setShowPhongBan(false)}
        select={setchonPhongBan}
      />
      <ModalMuntiselectNhanVien
        search
        isShow={showNhanVien}
        select={setchonNhanVien}
        name="Chọn nhân viên"
        toggleDate={() => {
          setshowNhanVien(false);
        }}
      />
      <DateTimePickerModal
        isVisible={showst2}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimestThu2(time);
          setShowst2(false);
        }}
        onCancel={() => setShowst2(false)}
      />
      <DateTimePickerModal
        isVisible={showen2}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimeedThu2(time);
          setShowen2(false);
        }}
        onCancel={() => setShowen2(false)}
      />
      <DateTimePickerModal
        isVisible={showst3}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimestThu3(time);
          setShowst3(false);
        }}
        onCancel={() => setShowst3(false)}
      />
      <DateTimePickerModal
        isVisible={showen3}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimeedThu3(time);
          setShowen3(false);
        }}
        onCancel={() => setShowen3(false)}
      />
      <DateTimePickerModal
        isVisible={showst4}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimestThu4(time);
          setShowst4(false);
        }}
        onCancel={() => setShowst4(false)}
      />
      <DateTimePickerModal
        isVisible={showen4}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimeedThu4(time);
          setShowen4(false);
        }}
        onCancel={() => setShowen4(false)}
      />
      <DateTimePickerModal
        isVisible={showst5}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimestThu5(time);
          setShowst5(false);
        }}
        onCancel={() => setShowst5(false)}
      />
      <DateTimePickerModal
        isVisible={showen5}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimeedThu5(time);
          setShowen5(false);
        }}
        onCancel={() => setShowen5(false)}
      />
      <DateTimePickerModal
        isVisible={showst6}
        is24Hour={true}
        mode="time"
        onConfirm={(date: any) => {
          let time = gettimesss(date);
          setTimestThu6(time);
          setShowst6(false);
        }}
        onCancel={() => setShowst6(false)}
      />
      <DateTimePickerModal
        isVisible={showen6}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimeedThu6(time);
          setShowen6(false);
        }}
        onCancel={() => setShowen6(false)}
      />
      <DateTimePickerModal
        isVisible={showst7}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimestThu7(time);
          setShowst7(false);
        }}
        onCancel={() => setShowst7(false)}
      />
      <DateTimePickerModal
        isVisible={showen7}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimeedThu7(time);
          setShowen7(false);
        }}
        onCancel={() => setShowen7(false)}
      />
      <DateTimePickerModal
        isVisible={showstcn}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimestCN(time);
          setShowstcn(false);
        }}
        onCancel={() => setShowstcn(false)}
      />
      <DateTimePickerModal
        isVisible={showencn}
        is24Hour={true}
        mode="time"
        onConfirm={(date: Date) => {
          let time = gettimesss(date);
          setTimeedCN(time);
          setShowencn(false);
        }}
        onCancel={() => setShowencn(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.colorText,
    fontSize: sizes._font_size_big,
    width: sizes._screen_width,
    marginLeft: sizes._20sdp,
    fontFamily: fonts.textRegular,
  },
  gach: {
    backgroundColor: colors.colorDargrey,
    opacity: 0.5,
    width: '100%',
    height: 1,
    marginTop: sizes._5sdp,
  },
  textinput: {
    height: sizes._60sdp,
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: sizes._25sdp,
    fontFamily: fonts.textRegular,
  },
  textinput1: {
    height: sizes._60sdp,
    width: sizes._screen_width * 0.9,
    borderRadius: 10,
    backgroundColor: '#e8e9ec9e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: sizes._25sdp,
    justifyContent: 'space-between',
    fontFamily: fonts.textRegular,
  },
  text1: {
    fontSize: sizes._font_size_big,
    color: colors.colorText,
    marginLeft: sizes._10sdp,
    opacity: 0.4,
    fontFamily: fonts.textRegular,
  },
  item: {
    flexDirection: 'row',
    width: sizes._screen_width * 0.9,
    height: sizes._50sdp,
    alignItems: 'center',
    backgroundColor: '#e8e9ec9e',
    marginTop: sizes._25sdp,
    borderRadius: 10,
    paddingLeft: 5,
    justifyContent: 'space-between',
  },
  text2: {
    color: colors.colorText,
    fontSize: sizes._font_size_big,
    marginLeft: 5,
    opacity: 0.4,
    fontFamily: fonts.textRegular,
  },
  thu: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes._font_size_big_big_large,
    width: sizes._screen_width * 0.2,
  },
  time: {
    height: sizes._40sdp,
    width: sizes._screen_width * 0.3,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewthu: {
    marginTop: 10,
    width: sizes._screen_width * 0.9,
  },
});
