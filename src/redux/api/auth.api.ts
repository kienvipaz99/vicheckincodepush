import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './axiosClient';
import {ListApiResponse} from '../types/ListApiRespone';
const tagTypes = 'Auth' as const;
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: [tagTypes],
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    login: build.mutation<
      LoginToken,
      {
        email: string;
        password: string;
      }
    >({
      query(data) {
        return {
          url: '/api/v1/login',
          method: 'POST',
          data,
        };
      },
    }),
    logout: build.mutation({
      query() {
        return {
          url: '/api/v1/logout',
          method: 'POST',
        };
      },
    }),
    verifytoken: build.mutation<verifytoken, {token: string}>({
      query(data) {
        return {
          url: '/api/v1/verify-token',
          method: 'POST',
          data,
        };
      },
    }),
    register: build.mutation<{}, {}>({
      query({data}: {data: any}) {
        return {
          url: '/api/v1/register',
          method: 'POST',
          data,
        };
      },
    }),
    changePassWord: build.mutation<
      changePassWord,
      {
        data: {
          old_password: string | undefined;
          password: string | undefined;
          password_confirmation: string | undefined;
        };
        id: number;
      }
    >({
      query({data, id}) {
        return {
          url: `/api/v1/auth/${id}/password/change`,
          method: 'POST',
          data,
        };
      },
    }),
    fcmtoken: build.mutation<{}, {}>({
      query({id, data}: {id: number; data: {fcm_token: string}}) {
        return {
          url: `/api/v1/users/${id}`,
          method: 'PATCH',
          data,
        };
      },
    }),
    getemployee_attendance: build.query<employee_attendance, string>({
      query: () => ({
        url: '/api/v1/dashboard/employee/attendance',
        method: 'GET',
      }),
      providesTags: result => {
        if (result?.data) {
          const couseList = result.data;
          return [
            ...couseList.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getWorkingShifts: build.query<WorkingShift, string>({
      query: id => ({
        url: `/api/v1/working-shifts/${id}`,
        method: 'GET',
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getAllWorkingShifts: build.query<ListApiResponse<WorkingShift>, string>({
      query: id => ({
        url: `/api/v1/working-shifts`,
        method: 'GET',
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    deleteWorkingShifts: build.mutation<{}, {}>({
      query(id) {
        return {
          method: 'DELETE',
          url: `/api/v1/working-shifts/${id}`,
        };
      },
    }),
    WorkingShifts: build.mutation<{}, WorkingShiftPost>({
      query({data, type, url}) {
        return {
          method: type,
          url: url,
          data,
        };
      },
    }),
    getdashBoardonWorking: build.query<dashboardOnworking, string>({
      query: () => ({
        url: '/api/v1/dashboard/on-working',
        method: 'GET',
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getAttendanceSumaryDaily: build.query<ListApiResponse<getAttendanceSumary>, {day: string}>({
      query: ({day}) => ({
        url: `/api/v1/attendanceDaily?date=${day}&per_page=300`,
        method: 'GET',
      }),
      providesTags: result => {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getEmployeeReport: build.query<ListApiResponse<User>, string>({
      query: () => ({
        url: `/api/v1/dashboard/report-employee?within=thisMonth&per_page=1000`,
        method: 'GET',
      }),
      providesTags: result => {
        if (result?.data) {
          const employee = result.data;
          return [
            ...employee.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getAttendanceSumary: build.query<
      ListApiResponse<getAttendanceSumary>,
      {id: number; page: number; month_number: number; year: number}
    >({
      query: ({id, page, month_number, year}) => ({
        url: `/api/v1/attendances/${id}/summaries-data-table?month_number=${month_number}&year=${year}&per_page=${page}`,
        method: 'GET',
      }),
      providesTags: result => {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    employee: build.query<Employee, string>({
      query: id => ({
        url: `/api/v1/employees/${id}`,
        method: 'GET',
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    leavesAllowances: build.query<ListApiResponse<Leaves>, string>({
      query: id => ({
        method: 'GET',
        url: `/api/v1/leaves/${id}/allowances`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getuser: build.query<ListApiResponse<User>, string>({
      query: data => ({
        method: 'GET',
        url: `/api/v1/users${data}`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),

    getdesignations: build.query<ListApiResponse<Designations>, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/designations`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getdepartments: build.query<ListApiResponse<Departments>, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/departments?per_page=100`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    addDepartsment: build.mutation<{}, {}>({
      query({data, id}: {data: any; id: number}) {
        return {
          method: 'POST',
          url: `/api/v1/departments/${id}`,
          data,
        };
      },
    }),
    getemploymentstatuses: build.query<ListApiResponse<EmploymentStatus>, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/employment-statuses`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getRoles: build.query<ListApiResponse<Roles>, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/roles`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    deleteuser: build.mutation<{}, {}>({
      query(id) {
        return {
          url: `/api/v1/users/${id}`,
          method: 'DELETE',
        };
      },
    }),
    deletedesignations: build.mutation<{}, {}>({
      query(id) {
        return {
          method: 'DELETE',
          url: `/api/v1/designations/${id}`,
        };
      },
    }),
    postdesignations: build.mutation<{}, {}>({
      query({id, data}: {id: number; data: any}) {
        return {
          url: `/api/v1/designations/${id}`,
          method: 'POST',
          data,
        };
      },
    }),
    getEmployeeID: build.query<profileEmploye, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/employees/profile/employee-id`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getAsignedTask: build.query<ListApiResponse<getAssignedTask>, {user_id?: number}>({
      query: ({user_id}) => ({
        method: 'GET',
        url: `/api/v1/assigned-task?user_id=${user_id}`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    postasignedTask: build.mutation<AssignedTaskPost, AssignedTaskData>({
      query(data) {
        return {
          url: `/api/v1/assigned-task`,
          method: 'POST',
          data,
        };
      },
    }),
    changUserSetting: build.mutation<AssignedTaskPost, changUserSetting>({
      query(data) {
        return {
          url: '/api/v1/users/change-settings',
          method: 'POST',
          data,
        };
      },
    }),
    PutEmployee: build.mutation<{}, {id: number | undefined; uuid: string}>({
      query({id, uuid}) {
        return {
          url: `/api/v1/employees/${id}/uuid?uuid=${uuid}`,
          method: 'PUT',
          uuid,
        };
      },
    }),

    getNotification: build.query<ListApiResponse<Notifications>, {per_page: number}>({
      query: ({per_page}) => ({
        method: 'GET',
        url: `/api/v1/notifications?per_page=${per_page}`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    creatEvent: build.mutation<dataEvent, PostEvents>({
      query(data) {
        return {
          url: '/api/v1/events',
          method: 'POST',
          data,
        };
      },
    }),
    getEvents: build.query<ListApiResponse<GetEvents>, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/events`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    uploadImage: build.mutation<{}, {}>({
      query(data) {
        return {
          url: '/api/v1/auth/users/profile-picture',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data,
        };
      },
    }),
    createonleave: build.mutation<success, OnLeave>({
      query(data) {
        return {
          url: '/api/v1/leaves/assign',
          method: 'POST',
          data,
        };
      },
    }),
    getYeucau: build.query<ListApiResponse<LeaveReQuest>, {per_page: number}>({
      query: ({per_page}) => ({
        method: 'GET',
        url: `/api/v1/leaves/request?per_page=${per_page}`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    commentRequest: build.mutation<{}, {id: number; data: {description: string}}>({
      query({id, data}) {
        return {
          url: `/api/v1/leaves/request/comments/${id}`,
          method: 'PATCH',
          data,
        };
      },
    }),
    getLoaiphep: build.query<ListApiResponse<leavetype>, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/leave-types`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getAttendanceDetail: build.query<attendance_details, {id: number}>({
      query: ({id}) => ({
        method: 'GET',
        url: `/api/v1/attendances/${id}/log`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    FeedbackRequest: build.mutation<success, {id: number; data: approvedRequest; status: string}>({
      query({id, data, status}) {
        return {
          url: `/api/v1/leaves/request/${id}/${status}`,
          method: 'PATCH',
          data,
        };
      },
    }),
    RejectRequest: build.query<ListApiResponse<LeaveReQuest>, string>({
      query: () => ({
        method: 'GET',
        url: `/api/v1/leaves/request?rejected=true&per_page=100&search=&orderBy=desc`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    RequestStatus: build.query<ListApiResponse<LeaveReQuest>, {id: number; params: string}>({
      query: ({id, params}) => ({
        method: 'GET',
        url: `/api/v1/leaves/${id}/summaries-data-table?${params}`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    LogRequest: build.query<LogRequest, {id: number}>({
      query: ({id}) => ({
        method: 'GET',
        url: `/api/v1/leaves/${id}/log`,
      }),
      providesTags: () => {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    creataddAtendee: build.mutation<success, AddAtendee>({
      query(data) {
        return {
          url: `/api/v1/employees/add-attendance`,
          method: 'POST',
          data,
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useVerifytokenMutation,
  useFcmtokenMutation,
  useLogoutMutation,
  useGetemployee_attendanceQuery,
  useGetWorkingShiftsQuery,
  useWorkingShiftsMutation,
  useGetEmployeeReportQuery,
  useGetAttendanceSumaryQuery,
  useGetdashBoardonWorkingQuery,
  useGetAttendanceSumaryDailyQuery,
  useEmployeeQuery,
  useLeavesAllowancesQuery,
  useGetuserQuery,
  useDeleteuserMutation,
  useGetdesignationsQuery,
  useGetdepartmentsQuery,
  useGetemploymentstatusesQuery,
  useGetRolesQuery,
  useGetAllWorkingShiftsQuery,
  useDeletedesignationsMutation,
  usePostdesignationsMutation,
  useGetEmployeeIDQuery,
  useRegisterMutation,
  useDeleteWorkingShiftsMutation,
  useAddDepartsmentMutation,
  useChangePassWordMutation,
  usePostasignedTaskMutation,
  useChangUserSettingMutation,
  usePutEmployeeMutation,
  useGetAsignedTaskQuery,
  useGetNotificationQuery,
  useCreatEventMutation,
  useUploadImageMutation,
  useCreateonleaveMutation,
  useGetYeucauQuery,
  useGetLoaiphepQuery,
  useGetAttendanceDetailQuery,
  useCommentRequestMutation,
  useFeedbackRequestMutation,
  useRejectRequestQuery,
  useRequestStatusQuery,
  useLogRequestQuery,
  useCreataddAtendeeMutation,
} = authApi;
