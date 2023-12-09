import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import stylescustom from '../res/stylescustom';
import Header from '../component/Header';
import sizes from '../res/sizes';
import TextInputcustom from '../component/TextInputcustom';
import colors from '../res/color';
import fonts from '../res/fonts';
import SelectClasify from './meetings/SelectClasify';
import ModalMuntiselectPhongBan from '../component/modal/ModalMuntiselectPhongBan';
import ModalMuntiselectNhanVien from '../component/modal/ModalMuntiselectNhanVien';
import SelectRoom from './meetings/SelectRoom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusMeeting from './meetings/StatusMeeting';
import BuntomCustom1 from '../component/BuntomCustom1';
import axios from 'axios';
import {API_LOCAL} from '../URI_FACE';
import ModalPickDate from '../component/modal/ModalPickDate';
import ModalPickTime from '../component/modal/ModalPickTime';
import {consvertTime} from '../data/checkday';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import TextError from '../component/errorstext/TextError';
import {Alert} from 'react-native';
export default function TaoLichHop({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const [title, setTitle] = useState('');
  const [clasify, setClasify] = useState('all');
  const [level, setLevel] = useState('normal');
  const [showdepartment, setshowdepartment] = useState(false);
  const [selectdepartment, setselectdepartment] = useState<Departments[]>();
  const [showuser, setshowuser] = useState(false);
  const [selectuser, setselectuser] = useState([]);
  const tenPhongString = selectdepartment?.map(item => item?.name).join(', ');
  const [link, setLink] = useState('');
  const [online, setOnline] = useState(false);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState(1);
  const [day, setDay] = useState('');
  const [showPickDate, setShowPickDate] = useState(false);
  const [time_start, setTime_Start] = useState('');
  const [time_end, setTime_End] = useState('');
  const [showPick_Time_Start, setShowPick_Time_Start] = useState(false);
  const [showPick_Time_End, setShowPick_Time_End] = useState(false);
  const [file, setFile] = useState<DocumentPickerResponse[]>([]);
  const [err, setErr] = useState({
    title: '',
    level: '',
    classify: '',
    content: '',
    host: '',
    status: '',
    members: '',
    online: '',
    link: '',
    day: '',
    time_start: '',
    time_end: '',
    slice_content: '',
    room: '',
  });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const Upload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('level', level);
      formData.append('title', title);
      formData.append('classify', clasify);
      formData.append('content', content),
        formData.append('host', 34),
        formData.append('status', 'upcoming'),
        selectuser?.forEach(member => {
          formData.append(`members[]`, member);
        });
      formData.append('online', online ? 1 : 0),
        formData.append('link', link),
        formData.append('day', day),
        formData.append('time_start', time_start),
        formData.append('time_end', time_end),
        formData.append('room', room),
        file?.forEach((item: DocumentPickerResponse) => {
          formData.append('slice_content[]', {
            name: item?.name,
            size: item?.size,
            type: item?.type,
            uri: item?.uri,
          });
        });
      const data = await axios.post(`${API_LOCAL}/meeting`, formData, config);
      Alert.alert('Tạo lịch họp thành công', 'Lịch họp đã được tạo thành công.', [
        {
          text: 'Thoát',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ]);
    } catch (error: any) {
      let err = error?.response?.data?.errors;
      console.log(err);
      setErr({
        classify: err?.classify,
        content: err?.content,
        day: err?.day,
        host: err?.host,
        level: err?.level,
        link: err?.link,
        members: err?.members,
        online: err?.online,
        slice_content: err?.slice_content,
        status: err?.status,
        time_end: err?.time_end,
        time_start: err?.time_start,
        title: err?.title,
        room: err?.room,
      });
    }
    setIsLoading(false);
  };
  const DeleteFile = (indexParams: number) => {
    const aa = file?.filter((item, index) => index !== indexParams);
    setFile(aa);
  };
  const Pickfile = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.plainText,
        ],
      });
      setFile(res);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('error -----', error);
      }
    }
  };
  return (
    <View style={stylescustom.container}>
      <Header back title textTittle={'Tạo lịch họp'} onBackPress={() => navigation.goBack()} />
      <View style={stylescustom.contentContainer}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Thông tin cuộc họp</Text>
            <TextInputcustom
              value={title}
              setValue={setTitle}
              placeholder="Tiêu đề cuộc họp"
              icon="lead-pencil"
            />
            <TextError text={err.title} />
            <SelectClasify
              select={clasify}
              setSelect={setClasify}
              levels={level}
              setLevel={setLevel}
            />
            {clasify === 'department' && (
              <>
                <Text style={[styles.txt, {marginTop: 10}]}>Chọn phòng ban</Text>
                <Pressable style={styles.prees} onPress={() => setshowdepartment(true)}>
                  <Text style={styles.txt}>
                    {selectdepartment ? tenPhongString : 'Chọn phòng ban'}
                  </Text>
                </Pressable>
              </>
            )}
            {clasify === 'custom' && (
              <>
                <Text style={[styles.txt, {marginTop: 10}]}>Chọn nhân viên</Text>
                <Pressable style={styles.prees} onPress={() => setshowuser(true)}>
                  <Text style={styles.txt}>{'Chọn nhân viên'}</Text>
                </Pressable>
                <TextError text={err.members} />
              </>
            )}
            <StatusMeeting link={link} setLink={setLink} setOnline={setOnline} online={online} />
            {!online && <SelectRoom value={room} setValue={setRoom} />}
            <TextError text={err.room} />
            <Text style={[styles.txt, {marginTop: 15}]}>Chọn thời gian</Text>
            <Pressable style={styles.prees} onPress={() => setShowPickDate(true)}>
              <MaterialIcons
                name="calendar-today"
                color={colors.colorDargrey}
                size={25}
                style={{marginRight: 10}}
              />
              <Text style={styles.txt}>{day ? day : 'Chọn ngày'}</Text>
            </Pressable>
            <TextError text={err.day} />
            <View style={[stylescustom.row2, {marginTop: 15}]}>
              <View style={{width: sizes.width * 0.4}}>
                <Pressable style={styles.time} onPress={() => setShowPick_Time_Start(true)}>
                  <MaterialCommunityIcons
                    name="clock"
                    color={colors.colorDargrey}
                    size={25}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.txt}>
                    {time_start ? consvertTime(time_start) : 'Bắt đầu'}
                  </Text>
                </Pressable>
                <TextError text={err.time_start} />
              </View>
              <View style={{width: sizes.width * 0.4}}>
                <Pressable style={styles.time} onPress={() => setShowPick_Time_End(true)}>
                  <MaterialCommunityIcons
                    name="clock-alert"
                    color={colors.colorDargrey}
                    size={25}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.txt}>{time_end ? consvertTime(time_end) : 'Kết thúc'}</Text>
                </Pressable>
                <TextError text={err.time_end} />
              </View>
            </View>
            <Text style={[styles.title, {marginTop: 20}]}>Thông tin cuộc họp</Text>
            <Text style={[styles.txt, {marginTop: 15}]}>File cuộc họp (pdf,docx,doc,exel)</Text>
            <View style={styles.view}>
              <MaterialCommunityIcons
                name="file-upload"
                color={colors.colorDargrey}
                size={40}
                onPress={Pickfile}
              />
              <Text style={styles.txt}>Tải file lên tại đây !!!</Text>
            </View>
            <TextError text={err.slice_content} />

            {file?.map((item, index) => {
              return (
                <View key={index + 'file'} style={[stylescustom.row2]}>
                  <View style={[styles.view, {width: sizes.width * 0.78}]}>
                    <MaterialCommunityIcons
                      name="file"
                      color={colors.colorDargrey}
                      size={40}
                      onPress={Pickfile}
                    />
                    <Text style={[styles.txt]}>{item?.name}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="delete-forever"
                    color={colors.colorDargrey}
                    size={30}
                    onPress={() => DeleteFile(index)}
                  />
                </View>
              );
            })}
            <TextInputcustom
              muntiline
              numberOfLines={4}
              value={content}
              setValue={setContent}
              placeholder="Nội dung cuộc họp"
              icon="notebook"
            />
            <TextError text={err.content} />

            <View style={styles.btn}>
              <BuntomCustom1 text="Gửi" onpress={Upload} isLoading={isLoading} />
            </View>
          </View>
        </ScrollView>
      </View>
      <ModalMuntiselectPhongBan
        name="Chọn phòng ban"
        isShow={showdepartment}
        toggleDate={() => setshowdepartment(false)}
        select={setselectdepartment}
        selected={selectdepartment}
      />
      <ModalMuntiselectNhanVien
        isShow={showuser}
        name="Chọn nhân viên"
        toggleDate={() => setshowuser(false)}
        select={setselectuser}
        selected={selectuser}
        search
      />
      <ModalPickDate setValue={setDay} show={showPickDate} setShow={setShowPickDate} />
      <ModalPickTime
        setValue={setTime_Start}
        setShow={setShowPick_Time_Start}
        show={showPick_Time_Start}
      />
      <ModalPickTime
        setValue={setTime_End}
        setShow={setShowPick_Time_End}
        show={showPick_Time_End}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: sizes.width * 0.9, alignSelf: 'center', marginTop: 20, paddingBottom: 50},
  title: {
    color: colors.colorText,
    fontFamily: fonts.textRegular,
    fontSize: sizes.width * 0.05,
  },
  txt: {color: colors.colorText, fontFamily: fonts.textRegular, fontSize: sizes.width * 0.04},
  prees: {
    width: sizes.width * 0.9,
    height: 50,
    borderWidth: 1,
    borderColor: colors.colorText,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    width: sizes.width * 0.4,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.colorText,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btn: {width: sizes.width * 0.5, alignSelf: 'center', marginTop: 30},
  view: {
    ...stylescustom.row1,
  },
});
