interface User {
  id: number;
  first_name: string;
  last_name: string;
  work: number;
  isChecked: boolean;
  in_time_late: number;
  out_time_early: number;
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
  profile_picture: {
    id: number;
    path: string;
    type: string;
    created_at: string;
    updated_at: string;
    full_url: string;
  };
  email: string;
  created_by: number;
  status_id: number;
  created_at: string;
  full_name: string;
  roles: [
    {
      id: number;
      name: string;
      is_admin: false;
      is_default: true;
      type_id: number;
      pivot: {
        user_id: number;
        role_id: number;
      };
    },
  ];
  status: {
    id: number;
    name: string;
    class: string;
    type: string;
    created_at: string;
    updated_at: string;
    translated_name: string;
  };
}
