const {default: images} = require('../res/images');

const itemadmin = {
  QuanLy: [
    {
      id: 1,
      name: 'Lịch họp',
      navigation: 'Calendarr',
      img: images.lichhop,
      background: '#f1f9e1',
      color: '#8ac111',
    },
    {
      id: 2,
      name: 'Lương',
      navigation: 'Wage',
      img: images.luong,
      background: '#fef2df',
      color: '#ffa008',
    },
    {
      id: 3,
      name: 'Báo cáo chấm công',
      navigation: 'BaoCaoChamCong',
      img: images.baocaochamcong,
      background: '#e0fbfc',
      color: '#00d7e2',
    },
    {
      id: 4,
      name: 'Công việc được giao',
      navigation: 'CongViecDuocGiaoAdmin',
      img: images.congviec,
      background: '#e2f2fe',
      color: '#2fa7ff',
    },

    {
      id: 5,
      name: 'Báo cáo địa điểm',
      navigation: 'BaoCaoDiaDiemThang',
      img: images.baocaodiadiem,
      background: '#ffefef',
      color: '#ff5f5f',
    },
  ],
  donTu: [
    {
      id: 6,
      name: 'Báo cáo đơn từ',
      navigation: 'SingleWordsss',
      img: images.baocaodontu,
      background: '#f0efff',
      color: '#6e5fff',
    },

    {
      id: 7,
      name: 'Chỉ định nghỉ phép',
      navigation: 'ChiDinhNghiPhep',
      img: images.xinnghiphep,
      background: '#e2f2fe',
      color: '#2fa7ff',
    },
    {
      id: 11,
      name: 'Quản lý chấm công',
      navigation: 'TopTabQuenChamCongAdmin',
      img: images.clock,
      background: '#e2f2fe',
      color: '#2fa7ff',
    },
  ],
  caiDat: [
    {
      id: 8,
      name: 'Người dùng',
      navigation: 'PersonalInformation',
      img: images.nguoidung,
      background: '#e0fbfc',
      color: '#5be6ed',
    },
    {
      id: 9,
      name: 'Đổi mật khẩu',
      navigation: 'ChangePasss',
      img: images.doimk,
      background: '#ffefef',
      color: '#ff5f5f',
    },
    {
      id: 10,
      name: 'Đăng xuất',
      navigation: 'Login',
      img: images.dangxuat,
      background: '#e2f2fe',
      color: '#2fa7ff',
    },
  ],
};
export default itemadmin;
