const errors = {
  'The employee id field is required.': 'Chưa Chọn nhân viên',
  'The leave type id field is required.': 'Chọn loại nghỉ phép',
  'The note field is required.': 'Không được bỏ trống nội dung',
  'The date field is required.': 'Chưa chọn ngày',
  'The start time field is required.': 'Chưa chọn thời gian bắt đầu',
  'The end time field is required.': 'Chưa chọn thời gian kết thúc',
  'The start date field is required.': 'Chưa chọn ngày nghỉ bắt đầu',
  'The end date field is required.': 'Chưa chọn ngày nghỉ kết thúc',
  'The end date must be a date after start date.': 'Ngày kết thúc phải lớn hơn 1 ngày bắt đầu ',
  'The start date must be a date before end date.':
    'Ngày bắt đầu phải nhỏ hơn ngày kết thúc 1 ngày',
  'The end time must be a date after start time.':
    'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
  'The start time must be a date before end time.':
    'Thời gian kết thúc phải nhỏ hơn thời gian bắt đầu',
};

export function chidinhnghiphep(val) {
  return errors[val] || '';
}
