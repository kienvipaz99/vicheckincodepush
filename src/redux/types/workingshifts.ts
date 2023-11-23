interface DetailWorking {
  id: number;
  weekday: string;
  working_shift_id: number;
  is_weekend: number;
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
}
interface WorkingShift {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  start_at: string;
  end_at: string;
  type: string;
  description: string;
  tenant_id: number;
  is_default: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  attendances_count: number;
  details: DetailWorking[];
  departments: [
    {
      id: number;
      name: string;
      pivot: {
        working_shift_id: number;
        department_id: number;
        start_date: string;
        end_date: string;
      };
    },
  ];
  users: [];
  upcoming_departments: [];
  upcoming_users: [];
}
interface Details {
  weekday: string;
  start_at: string;
  end_at: string;
  is_weekend: number;
}
interface WorkingShiftPost {
  id?: string;
  url: string;
  type: string;
  data: {
    name: string;
    type: string;
    departments?: number[];
    weekdays: [];
    users?: number[];
    start_date: string;
    end_date: string;
    start_at: string;
    end_at: string;
    description: string;
    details: Details[];
  };
}
