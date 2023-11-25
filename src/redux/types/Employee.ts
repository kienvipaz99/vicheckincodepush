interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  last_login_at: string;
  created_by: number;
  status_id: number;
  invitation_token: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  is_in_employee: number;
  personID: null;
  uuid: string;
  fcm_token: string;
  full_name: string;
  department: {
    id: number;
    name: string;
    pivot: {
      user_id: number;
      department_id: number;
      start_date: string;
      end_date: null;
    };
  };
  designation: {
    id: number;
    name: string;
    pivot: {
      user_id: number;
      designation_id: number;
      start_date: string;
      end_date: null;
    };
  };
  profile: {
    id: number;
    user_id: number;
    joining_date: string;
    employee_id: string;
    gender: string;
    date_of_birth: string;
    about_me: string;
    phone_number: string;
    marital_status: null;
    fathers_name: null;
    mothers_name: null;
    social_security_number: null;
    address: string;
    contact: string;
    created_at: string;
    updated_at: string;
  };
  profile_picture: {
    id: number;
    path: string;
    type: string;
    created_at: string;
    updated_at: string;
    full_url: string;
  };
  working_shift: {
    id: number;
    name: string;
    pivot: {
      user_id: number;
      working_shift_id: number;
      start_date: string;
      end_date: string;
    };
  };
  employment_status: {
    id: number;
    name: string;
    class: string;
    alias: string;
    pivot: {
      user_id: number;
      employment_status_id: number;
      start_date: string;
      end_date: null;
      description: null;
    };
  };
  roles: [
    {
      id: number;
      name: string;
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
    created_at: null;
    updated_at: null;
    translated_name: string;
  };
  updated_salary: {
    id: number;
    user_id: number;
    amount: number;
    added_by: number;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
  };
  salary: {
    id: number;
    user_id: number;
    amount: number;
    added_by: number;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
  };
}
interface profileEmploye {
  status: boolean;
  'employee-id': string;
}
