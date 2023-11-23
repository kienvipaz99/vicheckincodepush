import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import type {AxiosRequestConfig, AxiosError} from 'axios';
import URI from '../../URI';
let axiosAuthInterceptor: any;
let axiosResponseInterceptor: any;
export const axiosAuth = (auths: string) => {
  axiosAuthInterceptor = axios.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      config.headers.Accept = 'application/json';
      config.headers.Authorization = `Bearer ${auths}`;
      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    },
  );
};

axiosResponseInterceptor = axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 401) {
    }
    // Do something with response error
    return Promise.reject(error);
  },
);
export const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: URI},
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      timeout?: AxiosRequestConfig['timeout'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params, timeout, headers}) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        timeout,
        headers,
      });

      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export const resetAxiosInterceptors = () => {
  axios.interceptors.request.eject(axiosAuthInterceptor);
  axios.interceptors.response.eject(axiosResponseInterceptor);
};
