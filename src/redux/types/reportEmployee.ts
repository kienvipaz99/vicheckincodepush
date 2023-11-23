interface ReportEmployee {
  id: number;
  first_name: string;
  last_name: string;
  work: number;
  in_time_late: number;
  out_time_early: number;
  full_name: string;
  department: {
    id: number;
    name: string;
    description: string;
    location: string;
    tenant_id: number;
    manager_id: number;
    status_id: number;
    department_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
      user_id: number;
      department_id: number;
      start_date: string;
      end_date: string;
    };
  };
}
