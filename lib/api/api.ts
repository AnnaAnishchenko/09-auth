import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// axios.defaults.headers.common.Authorization = `Bearer ${
//   process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
// }`;
