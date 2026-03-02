import { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";
import axios from "axios";


axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

//функцій, які викликаються у клієнтських компонентах

export const fetchNotes = async (
  searchText: string,
  page: number,
    tag?: NoteTag
 
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 10,
      ...(searchText && { search: searchText }),
       ...(tag && { tag }),
         },
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const fetchNoteById =async (id: Note["id"]): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};


// реєстрація нового користувача
export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (payload: RegisterRequest) : Promise<User> => {
  const { data } = await axios.post<User>('/auth/register', payload, {
    withCredentials: true,
    headers: {
       
      "Content-Type": "application/json",
    },
  })
  return data;
};


// login

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await axios.post<User>('/auth/login', payload , {
    withCredentials: true,
    headers: {
             "Content-Type": "application/json",
    },
  })  
  return data;
};

// logout    для правильного виходу користувача
export const logout = async (): Promise<void> => {
  await axios.post('/auth/logout');
};

// checkSession  Перевірка авторизації
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const { data }  = await axios.get<CheckSessionRequest>('/auth/session');
  return data.success;
};




// getMe
export const getMe = async () => {
  const { data } = await axios.get<User>('/auth/me');
  return data;
};


// updateMe


