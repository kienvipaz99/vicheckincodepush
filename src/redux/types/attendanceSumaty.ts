interface getAttendanceSumary {
  id: number;
  in_date: string;
  user_id: number;
  behavior: string;
  details: [
    {
      id: number;
      in_time: string;
      out_time: string;
      attendance_id: number;
      status_id: number;
      review_by: number;
      added_by: null;
      attendance_details_id: null;
      in_ip_data: null;
      out_ip_data: null;
      comments: [];
    },
  ];
}
interface PramsgetAttendanceSumary {
  id: number;
  page: number;
}
interface attendance_details {
  id: number;
  in_time: string;
  out_time: string;
  attendance_id: number;
  in_ip_data: null;
  out_ip_data: null;
  status_id: number;
  review_by: number;
  added_by: null;
  attendance_details_id: null;
  created_at: string;
  updated_at: string;
  in_time_late: number;
  out_time_early: number;
  works: string;
  comments: [];
}
interface AddAtendee {
  employee_id: number;
  in_date: string;
  in_time: string;
  out_time: string;
}
