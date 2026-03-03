import axios, { AxiosError } from 'axios';


export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>


