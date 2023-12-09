interface dataEvent {
  status: boolean;
  message: string;
}
interface PostEvents {
  start_date: string;
  end_date: string;
  name: string;
  departments: number[];
  description: string;
}
interface GetEvents {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  tenant_id: number;
  created_at: string;
  updated_at: string;
  departments: Departments[];
}
interface Departments {
  id: number;
  name: string;
  pivot: {
    event_id: number;
    department_id: number;
  };
  isChecked: boolean;
}
