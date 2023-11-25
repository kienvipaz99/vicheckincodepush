interface notAttended {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  departments: [
    {
      id: number;
      name: string;
      description: string;
      location: string;
      tenant_id: number;
      manager_id: number;
      status_id: number;
      department_id: null;
      created_at: string;
      updated_at: string;
      pivot: {
        user_id: number;
        department_id: number;
        start_date: string;
        end_date: string;
      };
    },
  ];
}
interface dashboardOnworking {
  notAttended: notAttended[];
  leave: notAttended[];
  outEarly: notAttended[];
}
