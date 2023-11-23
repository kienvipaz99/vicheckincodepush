interface Review {
  id: number;
  leave_id: number;
  reviewed_by: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
  };
  status_id: number;
  created_at: string;
  department_id: number;
  department: string;
  status: {
    id: number;
    name: string;
    translated_name: string;
  };
  comments: Comment[];
}
interface LogRequest {
  comments: Comment[];
  reviews: Review[];
  status: {
    id: number;
    name: string;
    translated_name: string;
  };
  user: User;
}
