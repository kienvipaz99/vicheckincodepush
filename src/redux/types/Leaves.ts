interface leavetype {
  id: number;
  name: string;
  alias: string;
  type: string;
  amount: number;
  special_percentage: number;
  is_enabled: number;
  is_earning_enabled: number;
  tenant_id: number;
  created_at: null;
  updated_at: null;
}
interface Leaves {
  id: number;
  user_id: number;
  leave_type_id: number;
  amount: number;
  is_updated: 0;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  taken: number;
  leave_type: leavetype;
}
interface OnLeave {
  employee_id: number;
  leave_duration?: string;
  leave_type_id: number;
  note: string;
  day_type: string;
  date: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  start_time: string;
  end_time: string;
}
interface LeaveReQuest {
  id: number;
  user_id: number;
  leave_type_id: number;
  status_id: number;
  working_shift_details_id: number;
  date: string;
  start_at: string;
  end_at: string;
  duration_type: string;
  assigned_by: string;
  tenant_id: number;
  created_at: string;
  updated_at: string;
  location: string;
  latitude: string;
  longitude: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    status_id: number;
    full_name: string;
    department: {
      id: number;
      name: string;
      pivot: {
        user_id: number;
        department_id: number;
        start_date: string;
        end_date: string;
      };
    };
    profile_picture: null;
    status: {
      id: number;
      name: string;
      class: string;
      translated_name: string;
    };
  };
  last_review: [];
  status: {
    id: number;
    name: string;
    class: string;
    translated_name: string;
  };
  type: {
    id: number;
    name: string;
  };
  attachments: [];
  comments: Comment[];
}

interface Comment {
  id: number;
  user_id: number;
  type: string;
  comment: string;
  parent_id: number;
}
interface LeaveTypeCustom {
  id: number;
  title: string;
  name: string;
  time: string;
  day: string;
  noidung: string;
  chucvu: string;
  phongban: string;
  ngaygui: string;
  starttime: string;
  endtime: string;
  numberphone: string;
  nameclient: string;
  diachi: string;
  long: string;
  lat: string;
  img: string;
  lido: string;
  type: string;
  typeLeave: string;
}
