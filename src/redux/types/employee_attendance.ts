interface employee_attendance {
  data: [];
  id: number;
  in_date: string;
  user_id: number;
  status_id: number;
  working_shift_id: number;
  behavior: string;
  tenant_id: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    status_id: number;
    full_name: string;
  };
  working_shift: {
    id: number;
    name: string;
    details: [
      {
        id: number;
        weekday: string;
        working_shift_id: number;
        is_weekend: number;
        start_at: string;
        end_at: string;
        created_at: string;
        updated_at: string;
      },
    ];
  };
  details: [
    {
      id: number;
      in_time: string;
      out_time: string;
      attendance_id: number;
      status_id: number;
      in_time_late: number;
      out_time_early: number;
      works: string;
    },
  ];
}
