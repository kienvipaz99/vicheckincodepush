interface verifytoken {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  last_login_at: null;
  created_by: number;
  status_id: number;
  invitation_token: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  is_in_employee: number;
  personID: null;
  fcm_token: string;
  full_name: string;
  roles: [
    {
      id: number;
      name: string;
      is_admin: false;
      is_default: true;
      type_id: number;
      alias: string;
      created_by: null;
      tenant_id: number;
      created_at: string;
      updated_at: string;
      pivot: {
        user_id: number;
        role_id: number;
      };
    },
  ];
}
