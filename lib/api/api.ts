import axios from "axios";
import { AxiosError } from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;
