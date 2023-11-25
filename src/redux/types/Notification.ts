interface Notifications {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message: string;
    name: string;
    url: string;
    notifier_id: number;
  };
  read_at: null;
  created_at: string;
  updated_at: string;
  notifier: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    profile_picture: null;
  };
}
