import axios from "axios";

axios.defaults.baseURL = "https://localhost:3000/api";
axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;


// axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// axios.defaults.headers.common.Authorization = `Bearer ${
//   process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
// }`;

// для створення одного спільного екземпляра axios, 
// з налаштуванням withCredentials: true для підтримки cookies
// withCredentials: true,
