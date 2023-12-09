import colors from './color';

export default function chuyenDoiNgayTiengViet(ngay) {
  switch (ngay) {
    case 'mon':
    case 'monday':
    case 1:
      return 'Thứ Hai';
    case 'tue':
    case 'tuesday':
    case 2:
      return 'Thứ Ba';
    case 'wed':
    case 'wednesday':
    case 3:
      return 'Thứ Tư';
    case 'thu':
    case 'thursday':
    case 4:
      return 'Thứ Năm';
    case 'fri':
    case 'friday':
    case 5:
      return 'Thứ Sáu';
    case 'sat':
    case 'saturday':
    case 6:
      return 'Thứ Bảy';
    case 'sun':
    case 'sunday':
    case 0:
      return 'Chủ Nhật';
    default:
      return 'Không hợp lệ';
  }
}
export function Gender(gender) {
  switch (gender) {
    case 'male':
      return 'Nam';
    case 'female':
      return 'Nữ';
    case 'other':
      return 'Khác';
    default:
      return gender;
  }
}
export function HouseMinute(time) {
  const initialTime = new Date(time);
  const vietnamTime = new Date(initialTime.getTime() + 7 * 60 * 60 * 1000);
  const vietnamHour = vietnamTime.getHours();
  const vietnamMinute = vietnamTime.getMinutes();
  const formattedHour = vietnamHour < 10 ? `0${vietnamHour}` : vietnamHour;
  const formattedMinute = vietnamMinute < 10 ? `0${vietnamMinute}` : vietnamMinute;
  const vietnamTimeString = `${formattedHour}:${formattedMinute}`;
  return vietnamTimeString;
}

export function money(val) {
  if (val) {
    return Number(val).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  } else {
    return Number(0).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
export function txt(val) {
  if (val?.length < 23) {
    return val;
  } else {
    return val?.substring(0, 22) + '...';
  }
}
export function txt1(val) {
  if (val?.length < 15) {
    return val;
  } else {
    return val?.substring(0, 13) + '...';
  }
}
export function isDay(ngay) {
  switch (ngay) {
    case 1:
      return 'mon';
    case 2:
      return 'tue';
    case 3:
      return 'wed';
    case 4:
      return 'thu';
    case 5:
      return 'fri';
    case 6:
      return 'sat';
    case 0:
      return 'sun';
    default:
      return 'Không hợp lệ';
  }
}
export const getLeaveType = loaiNghiPhep => {
  return loaiNghiPhep === 'Nghỉ 1 ngày'
    ? 'single_day'
    : loaiNghiPhep === 'Nghỉ nhiều ngày'
    ? 'multi_day'
    : loaiNghiPhep === 'Nghỉ theo ca'
    ? 'hours'
    : '';
};
export const getLeaveType1 = loaiNghiPhep => {
  return loaiNghiPhep === 'single_day'
    ? 'Nghỉ 1 ngày'
    : loaiNghiPhep === 'multi_day'
    ? 'Nghỉ nhiều ngày'
    : loaiNghiPhep === 'first_half'
    ? 'Nghỉ ca sáng'
    : loaiNghiPhep === 'last_half'
    ? 'Nghỉ ca chiều'
    : loaiNghiPhep === 'hours'
    ? 'Nghỉ theo giờ'
    : '';
};
export const colorStatus = val => {
  return val === 'Đã phê duyệt' ? colors.colorGreen : val === 'Đã từ chối' ? 'red' : 'orange';
};
export const dayWeeks = day => {
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
