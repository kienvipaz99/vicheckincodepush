interface AssignedTaskPost {
  status: boolean;
  message: string;
}
interface AssignedTaskData {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status_id: number;
  user_id: number;
  job_assignor_id: number;
}
interface getAssignedTask {
  id: number;
  name: string;
  description: string;
  start_date: string;

  end_date: string;
  status_id: number;
  user_id: number;
  job_assignor_id: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    last_login_at: string;
    created_by: string;
    status_id: number;
    invitation_token: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    is_in_employee: number;
    personID: number;
    fcm_token: string;
    uuid: string;
    full_name: string;
  };
  assign_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    last_login_at: string;
    created_by: string;
    status_id: number;
    invitation_token: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    is_in_employee: number;
    personID: number;
    fcm_token: string;
    uuid: string;
    full_name: string;
  };
  status: {
    id: number;
    name: string;
    class: string;
    type: string;
    created_at: string;
    updated_at: string;
    translated_name: string;
  };
  color: string;
}
