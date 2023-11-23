const loai = {
  single_day: 'Nghỉ 1 ngày',
  multi_day: 'Nghỉ nhiều ngày',
  hours: 'Nghỉ theo ca',
};

export function loainghiphep(val) {
  return loai[val] || '';
}
