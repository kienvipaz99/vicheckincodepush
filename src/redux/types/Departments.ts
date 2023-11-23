interface Departments {
  id: number;
  name: string;
  description: null;
  location: null;
  tenant_id: number;
  manager_id: number;
  status_id: number;
  department_id: number;
  created_at: string;
  updated_at: string;
  status: {
    id: number;
    name: string;
    class: string;
    translated_name: string;
  };
  manager: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
  };
  parent_department: {
    id: number;
    name: string;
  };
  working_shifts: [
    {
      id: number;
      name: string;
      start_date: string;
      end_date: string;
      type: string;
      description: string;
      tenant_id: number;
      is_default: number;
      deleted_at: null;
      created_at: string;
      updated_at: string;
      pivot: {
        department_id: number;
        working_shift_id: number;
        start_date: string;
        end_date: string;
      };
    },
  ];
}
