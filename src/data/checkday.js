export function day() {
  let a = new Date();
  let d = a.getDate();
  let mm = String(a.getMonth() + 1); //January is 0!
  let yyyy = a.getFullYear();
  let day = d + '/' + mm + '/' + yyyy;
  return day;
}
export function fullday(val) {
  let a = new Date(val);
  let d = a.getDate();
  let mm = String(a.getMonth() + 1); //January is 0!
  let yyyy = a.getFullYear();
  let day = d + '/' + mm + '/' + yyyy;
  return day;
}
export function fullday1(val) {
  let a = new Date(val);
  let d = a.getDate();
  let mm = String(a.getMonth() + 1); //January is 0!
  let yyyy = a.getFullYear();
  let day = yyyy + '-' + mm + '-' + d;
  return day;
}
export function checkTime(val) {
  let a = new Date(val).getHours();
  let b = new Date(val).getMinutes();
  return a + ':' + b;
}
export function thu(val) {
  let thu = new Date(val).getDay();
  let c =
    thu == 0
      ? 'CN'
      : thu == 1
      ? 'T2'
      : thu == 2
      ? 'T3'
      : thu == 3
      ? 'T4'
      : thu == 4
      ? 'T5'
      : thu == 5
      ? 'T6'
      : thu == 6
      ? 'T7'
      : null;

  return c;
}
export function thu11() {
  let thu = new Date().getDay();
  let c =
    thu == 0
      ? 'Chủ nhật'
      : thu == 1
      ? 'Thứ 2'
      : thu == 2
      ? 'Thứ 3'
      : thu == 3
      ? 'Thứ 4'
      : thu == 4
      ? 'Thứ 5'
      : thu == 5
      ? 'Thứ 6'
      : thu == 6
      ? 'Thứ 7'
      : null;

  return c;
}
export function checknumberday() {
  let curr = new Date();
  let thang = curr.getMonth() + 1;
  let nam = curr.getFullYear();
  let ngay = curr.getDate();
  let fullday = nam + '-' + thang + '-' + ngay;
  return fullday;
}
export function checknumberdayval(val) {
  let curr = new Date(val);
  let thang = curr.getMonth() + 1;
  let nam = curr.getFullYear();
  let ngay = curr.getDate();
  let thangs = thang < 10 ? '0' + thang : thang;
  let ngays = ngay < 10 ? '0' + ngay : ngay;
  let fullday = nam + '-' + thangs + '-' + ngays;
  return fullday;
}
export function checknumberdayval2() {
  let curr = new Date();
  let thang = curr.getMonth() + 1;
  let nam = curr.getFullYear();
  let ngay = curr.getDate();
  let thangs = thang < 10 ? '0' + thang : thang;
  let ngays = ngay < 10 ? '0' + ngay : ngay;
  let fullday = nam + '-' + thangs + '-' + ngays;
  return fullday;
}
export function gettime(val) {
  let a = new Date(val).getHours();
  let b = new Date(val).getMinutes();
  let hour = a < 10 ? '0' + a : a;
  let minute = b < 10 ? '0' + b : b;
  return hour + ':' + minute;
}
export function gettimesss(val) {
  let a = new Date(val).getUTCHours();
  let b = new Date(val).getUTCMinutes();
  let hour = a < 10 ? '0' + a : a;
  let minute = b < 10 ? '0' + b : b;
  return hour + ':' + minute;
}

export function gettimesss1(val) {
  let a = new Date(val).getUTCHours();
  let b = new Date(val).getUTCMinutes();
  let hour = a < 10 ? '0' + a : a;
  let minute = b < 10 ? '0' + b : b;
  let day = checknumberdayval(val);
  return day + ' ' + hour + ':' + minute + ':' + '00';
}
export function gettimesss2(val) {
  let a = new Date(val).getUTCHours();
  let b = new Date(val).getUTCMinutes();
  let hour = a < 10 ? '0' + a : a;
  let minute = b < 10 ? '0' + b : b;
  let day = checknumberdayval(val);
  return day + hour + ':' + minute + ':' + '00';
}
export function gettimes() {
  let a = new Date().getHours();
  let b = new Date().getMinutes();
  let hour = a < 10 ? '0' + a : a;
  let minute = b < 10 ? '0' + b : b;
  return hour + ':' + minute;
}
export function thangnam(val) {
  let a = new Date(val);

  let mm = String(a.getMonth() + 1); //January is 0!
  let yyyy = a.getFullYear();
  let day = mm + '/' + yyyy;
  return day;
}
export function thangnamhientai() {
  let a = new Date();
  let mm = String(a.getMonth() + 1); //January is 0!
  let yyyy = a.getFullYear();
  let day = mm + '/' + yyyy;
  return day;
}
export function songaycuathang() {
  let a = new Date();
  let mm = String(a.getMonth() + 1); //January is 0!
  let yyyy = a.getFullYear();
  return new Date(yyyy, mm, 0).getDate();
}
export function time_convert(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  let hour = hours < 10 ? '0' + hours : hours;
  let minute = minutes < 10 ? '0' + minutes : minutes;
  return hour + ':' + minute;
}
export function time_convert1(val) {
  let aa = new Date(val);
  let phut = aa.getMinutes();
  let gio = aa.getHours();
  return gio * 60 + phut;
}
export function consvertTime(val) {
  if (!val) {
    return '--:--';
  }
  const date = new Date(`2023-01-01T${val}Z`);
  const gio = date.getHours();
  let phut = date.getMinutes();
  let gios = gio < 10 ? '0' + gio : gio;
  let phuts = phut < 10 ? '0' + phut : phut;
  return gios + ':' + phuts;
}
export function consvertTime1(val) {
  if (!val) {
    return '--:--';
  }
  const gio1 = val.split(' ')[1];
  const date = new Date(`2023-01-01T${gio1}Z`);
  const gio = date.getHours();
  let phut = date.getMinutes();
  let gios = gio < 10 ? '0' + gio : gio;
  let phuts = phut < 10 ? '0' + phut : phut;
  return gios + ':' + phuts;
}
export function consvertTimeToday(val) {
  var dateString = val;
  var dateObj = new Date(dateString);
  var hours = dateObj.getHours();
  var minutes = dateObj.getMinutes();
  const date = new Date(`2023-01-01T${hours + ':' + minutes}Z`);
  const gio = date.getHours();
  let phut = date.getMinutes();
  let gios = gio < 10 ? '0' + gio : gio;
  let phuts = phut < 10 ? '0' + phut : phut;
  return gios + ':' + phuts;
}
export function dateTime(val) {
  if (val) {
    return new Date(val).toLocaleString('vi-VN');
  } else {
    return 'Không xác định';
  }
}
export function convertTimeToMinutes(timeString) {
  const timeArray = timeString.split(':').map(Number);
  const timeInMinutes = timeArray[0] * 60 + timeArray[1];
  return timeInMinutes;
}
export function chuyenDoiThoiGian(duLieuNhapVao) {
  const thoiGianUTC = new Date(duLieuNhapVao.replace(' ', 'T') + 'Z');
  thoiGianUTC.setHours(thoiGianUTC.getHours());

  const gio = thoiGianUTC.getHours().toString().padStart(2, '0');
  const phut = thoiGianUTC.getMinutes().toString().padStart(2, '0');

  return `${gio}:${phut}`;
}
