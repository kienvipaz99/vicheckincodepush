const {default: images} = require('../res/images');

const itemtrangchu = {
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
      navigation: 'ConViecDuocGiao',
      img: images.congviec,
      background: '#e2f2fe',
      color: '#2fa7ff',
    },
    {
      id: 5,
      name: 'Báo cáo đơn từ',
      navigation: 'RequestManagement',
      img: images.baocaodontu,
      background: '#ffefef',
      color: '#ff5f5f',
    },
  ],
  donTu: [
    // {
    //   id: 6,
    //   name: 'Xin đi muộn về sớm',
    //   navigation: 'DiSomVeMuon',
    //   img: images.xindisomvemuon,
    //   background: '#ffefef',
    //   color: '#ff5f5f',
    // },
    // {
    //   id: 7,
    //   name: 'Đăng ký ca',
    //   navigation: 'DangKyCa',
    //   img: images.dangkyca,
    //   background: '#f3f9e7',
    //   color: '#8ac111',
    // },

    {
      id: 9,
      name: 'Xin đi gặp khách',
      navigation: 'XinGapKhach',
      img: images.gapkhach,
      background: '#e0fbfc',
      color: '#00d7e2',
    },
    {
      id: 8,
      name: 'Quên chấm công',
      navigation: 'TopTabQuenChamCong',
      img: images.clock,
      background: '#fff5e6',
      color: 'orange',
    },
    {
      id: 11,
      name: 'Xin nghỉ phép',
      navigation: 'XinNghiPhep',
      img: images.xinnghiphep,
      background: '#f0efff',
      color: '#6e5fff',
    },
  ],
  caiDat: [
    {
      id: 12,
      name: 'Người dùng',
      navigation: 'PersonalInformation',
      img: images.nguoidung,
      background: '#e0fbfc',
      color: '#5be6ed',
    },
    {
      id: 13,
      name: 'Đổi mật khẩu',
      navigation: 'ChangePasss',
      img: images.doimk,
      background: '#ffefef',
      color: '#ff5f5f',
    },
    {
      id: 14,
      name: 'Đăng xuất',
      navigation: 'Login',
      img: images.dangxuat,
      background: '#e2f2fe',
      color: '#2fa7ff',
    },
  ],
};
export default itemtrangchu;
