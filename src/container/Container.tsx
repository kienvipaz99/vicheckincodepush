import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/Login/Login';
import Home1 from './Home1';
import PersonalInformation from '../screen/PersonalInformation';
import ChangePasss from '../screen/Login/ChangePasss';
import ButtonTabBarAdmin from './ButtonTabBarAdmin';
import Notification from '../screen/Notification';
import Timkeeping from '../screen/Timkeeping';
import RequestManagement from '../screen/RequestManagement';
import Wage from '../screen/Wage';
import QLChiNhanh from '../screenadmin/screeen/chinhanh/QLChiNhanh';
import {useNetInfo} from '@react-native-community/netinfo';
import ModalCheckinternet from '../component/modal/ModalCheckinternet';
import ModalOpenSettingWifi from '../component/modal/ModalOpenSettingWifi';
import AddChiNhanh from '../screenadmin/screeen/chinhanh/AddChiNhanh';
import Map1 from '../screenadmin/screeen/chinhanh/Map1';
import PhongBan from '../screenadmin/screeen/phongban/PhongBan';
import AddPhongban from '../screenadmin/screeen/phongban/AddPhongban';
import QuanLyNhanVien from '../screenadmin/screeen/nhanvien/QuanLyNhanVien';
import ThemNhanVien from '../screenadmin/screeen/nhanvien/ThemNhanVien';
import QuanLyChucVu from '../screenadmin/screeen/quanlychucvu/QuanLyChucVu';
import Themchucvu from '../screenadmin/screeen/quanlychucvu/Themchucvu';
import CaLamViec from '../screenadmin/screeen/calamviec/CaLamViec';
import ThemCaLamViec from '../screenadmin/screeen/calamviec/ThemCaLamViec';
import ThemDiaDiem from '../screenadmin/screeen/diadiem/ThemDiaDiem';
import DiaDiem from '../screenadmin/screeen/diadiem/DiaDiem';
import ChiTietChamCong from '../screenadmin/screeen/quanlychamcong/ChiTietChamCong';
import QuanLyPhongHop from '../screenadmin/screeen/phonghop/QuanLyPhongHop';
import ThemPhongHop from '../screenadmin/screeen/phonghop/ThemPhongHop';
import QuanLyThuVien from '../screenadmin/screeen/thuvien/QuanLyThuVien';
import ThemSach from '../screenadmin/screeen/thuvien/ThemSach';
import DangKiMuonSach from '../screenadmin/screeen/thuvien/DangKiMuonSach';
import SlapshScreen from '../screen/Home/SlapshScreen';
import XinGapKhach from '../screen/dontu/XinGapKhach';
import BaoCaoChamCong from '../screen/BaoCaoChamCong';
import LocBaoCao from '../screen/LocBaoCao';
import TaoLichHop from '../screen/TaoLichHop';
import CameraCheck from '../screen/Home/CameraCheck';
import CongViecDuocGiao from '../screen/CongViecDuocGiao';
import DiSomVeMuon from '../screen/dontu/DiSomVeMuon';
import DangKyCa from '../screen/dontu/DangKyCa';
import QuenChamCong from '../screen/dontu/QuenChamCong';
import XinNghiPhep from '../screen/dontu/XinNghiPhep';
import News from '../screen/bangtin/News';
import ThanSoHoc from '../screen/ThanSoHoc';
import TaoBaiViet from '../screen/bangtin/TaoBaiViet';
import Calendarr from '../screen/Home/Calendarr';
import ChiTietLichHop from '../component/ChiTietLichHop';
import Game from '../screen/minigame/Game';
import ChinhSua from '../screen/bangtin/ChinhSua';
import XemAnh from '../screen/bangtin/XemAnh';
import DoiQua from '../screen/minigame/DoiQua';
import SingleWordsss from '../screenadmin/SingleWord';
import ThongkeCheckin from '../component/TopTabThongke/ThongkeCheckin';
import CongViecDuocGiaoAdmin from '../screenadmin/component/Congviecduocgiao/CongViecDuocGiaoAdmin';
import GiaoViec from '../screenadmin/component/Congviecduocgiao/GiaoViec';
import BaoCaoDiaDiemThang from '../component/baocaodiadiem/BaoCaoDiaDiemThang';
import ChiTietBaoCao from '../component/baocaodiadiem/ChiTietBaoCao';
import DuyetDon from '../screen/request/DuyetDon';
import TangCa from '../screenadmin/screeen/tangca/TangCa';
import ChamCong from '../screen/Home/ChamCong';
import {useDispatch} from 'react-redux';
import ChiDinhNghiPhep from '../screen/dontu/ChiDinhNghiPhep';
import messaging from '@react-native-firebase/messaging';
import {FCM} from '../redux/state/fcmtoken';
import {navigationRef} from '../../RootNavigation';
import TodayAttendance from '../screen/todayAttendance/TodayAttendance';
import NhanVien from '../screenadmin/screeen/nhanvien/NhanVien';
import SuaChucVu from '../screenadmin/screeen/quanlychucvu/SuaChucVu';
import DonGapKhachHang from '../screen/chitietdon/DonGapKhachHang';
import DonQuenChamCong from '../screen/chitietdon/DonQuenChamCong';
import DonDimuonVeSom from '../screen/chitietdon/DonDimuonVeSom';
import DonXinNghiPhep from '../screen/chitietdon/DonXinNghiPhep';
import TopTabQuenChamCong from '../screen/dontu/quenchamcong/TopTabQuenChamCong';
const Stack = createNativeStackNavigator();
function Container() {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const [open1, setOpen1] = useState(false);
  React.useEffect(() => {
    async function Token() {
      const token = await messaging().getToken();
      if (token) {
        dispatch(FCM(token));
      }
    }
    Token();
  }, []);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (netInfo?.isConnected === false) {
      setOpen1(true);

      const timer1 = setTimeout(() => {
        setOpen1(false);
        setOpen(true);
      }, 3000);

      return () => clearTimeout(timer1);
    } else {
      setOpen(false);
    }
  }, [netInfo]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SlapshScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SlapshScreen" component={SlapshScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ButtonTabBarAdmin" component={ButtonTabBarAdmin} />
        <Stack.Screen name="ChiDinhNghiPhep" component={ChiDinhNghiPhep} />
        <Stack.Screen name="Home1" component={Home1} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
        <Stack.Screen name="ChangePasss" component={ChangePasss} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Timkeeping" component={Timkeeping} />
        <Stack.Screen name="RequestManagement" component={RequestManagement} />
        <Stack.Screen name="Wage" component={Wage} />
        <Stack.Screen name="QLChiNhanh" component={QLChiNhanh} />
        <Stack.Screen name="AddChiNhanh" component={AddChiNhanh} />
        <Stack.Screen name="Map1" component={Map1} />
        <Stack.Screen name="PhongBan" component={PhongBan} />
        <Stack.Screen name="Chấm công" component={ChamCong} />
        <Stack.Screen name="AddPhongban" component={AddPhongban} />
        <Stack.Screen name="QuanLyNhanVien" component={QuanLyNhanVien} />
        <Stack.Screen name="ThemNhanVien" component={ThemNhanVien} />
        <Stack.Screen name="SingleWordsss" component={SingleWordsss} />
        <Stack.Screen name="QuanLyChucVu" component={QuanLyChucVu} />
        <Stack.Screen name="Themchucvu" component={Themchucvu} />
        <Stack.Screen name="CaLamViec" component={CaLamViec} />
        <Stack.Screen name="ThemCaLamViec" component={ThemCaLamViec} />
        <Stack.Screen name="ThemDiaDiem" component={ThemDiaDiem} />
        <Stack.Screen name="DiaDiem" component={DiaDiem} />
        <Stack.Screen name="ChiTietChamCong" component={ChiTietChamCong} />
        <Stack.Screen name="QuanLyPhongHop" component={QuanLyPhongHop} />
        <Stack.Screen name="ThemPhongHop" component={ThemPhongHop} />
        <Stack.Screen name="QuanLyThuVien" component={QuanLyThuVien} />
        <Stack.Screen name="ThemSach" component={ThemSach} />
        <Stack.Screen name="DangKiMuonSach" component={DangKiMuonSach} />
        <Stack.Screen name="XinGapKhach" component={XinGapKhach} />
        <Stack.Screen name="BaoCaoChamCong" component={BaoCaoChamCong} />
        <Stack.Screen name="LocBaoCao" component={LocBaoCao} />
        <Stack.Screen name="ChiTietLichHop" component={ChiTietLichHop} />
        <Stack.Screen name="Calendarr" component={Calendarr} />
        <Stack.Screen name="TaoLichHop" component={TaoLichHop} />
        <Stack.Screen name="CameraCheck" component={CameraCheck} />
        <Stack.Screen name="ConViecDuocGiao" component={CongViecDuocGiao} />
        <Stack.Screen name="DiSomVeMuon" component={DiSomVeMuon} />
        <Stack.Screen name="DangKyCa" component={DangKyCa} />
        <Stack.Screen name="QuenChamCong" component={QuenChamCong} />
        <Stack.Screen name="XinNghiPhep" component={XinNghiPhep} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="ThanSoHoc" component={ThanSoHoc} />
        <Stack.Screen name="TaoBaiViet" component={TaoBaiViet} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="ChinhSua" component={ChinhSua} />
        <Stack.Screen name="XemAnh" component={XemAnh} />
        <Stack.Screen name="DoiQua" component={DoiQua} />
        <Stack.Screen name="ThongkeCheckin" component={ThongkeCheckin} />
        <Stack.Screen name="CongViecDuocGiaoAdmin" component={CongViecDuocGiaoAdmin} />
        <Stack.Screen name="GiaoViec" component={GiaoViec} />
        <Stack.Screen name="BaoCaoDiaDiemThang" component={BaoCaoDiaDiemThang} />
        <Stack.Screen name="ChiTietBaoCao" component={ChiTietBaoCao} />
        {/* @ts-ignore */}
        <Stack.Screen name="TodayAttendance" component={TodayAttendance} />
        {/* @ts-ignore */}
        <Stack.Screen name="DuyetDon" component={DuyetDon} />
        <Stack.Screen name="TangCa" component={TangCa} />
        <Stack.Screen name="NhanVien" component={NhanVien} />
        <Stack.Screen name="SuaChucVu" component={SuaChucVu} />
        {/*@ts-ignore*/}
        <Stack.Screen name="DonGapKhachHang" component={DonGapKhachHang} />
        <Stack.Screen name="DonQuenChamCong" component={DonQuenChamCong} />
        <Stack.Screen name="DonDimuonVeSom" component={DonDimuonVeSom} />
        <Stack.Screen name="DonXinNghiPhep" component={DonXinNghiPhep} />
        <Stack.Screen name="TopTabQuenChamCong" component={TopTabQuenChamCong} />
      </Stack.Navigator>
      <ModalCheckinternet isShow={open1}></ModalCheckinternet>
      <ModalOpenSettingWifi show1={open} toggleDate={() => setOpen(false)}></ModalOpenSettingWifi>
    </NavigationContainer>
  );
}

export default Container;
