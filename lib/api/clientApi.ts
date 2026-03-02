import { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";
import { api } from "./api";

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
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
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

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

// реєстрація нового користувача
export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", payload, {
       headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

// login

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", payload, {
        headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

// logout    для правильного виходу користувача
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// checkSession  Перевірка авторизації
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const { data } = await api.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

export type UpdateMeRequest = {
  username: string;
};

export const updateMe = async (
  payload: UpdateMeRequest,
): Promise<User> => {
  const { data } = await api.patch<User>("/auth/me", payload);
  return data;
};