interface SliceContent {
  file_id: string;
  file_name: string;
  link: string;
  type: string;
  path: string;
  size: number;
}
interface RoomMeeting {
  id: number;
  level: string;
  title: string;
  classify: string;
  day: string;
  time_start: string;
  time_end: string;
  content: string;
  host: null;
  room: {
    id: number;
    name: string;
    location: string;
    status: boolean;
  };
  members: string[];
  department: null;
  status: string;
  slice_content: SliceContent[];
  online: boolean;
  link: string;
  created_at: string;
  updated_at: string;
}
