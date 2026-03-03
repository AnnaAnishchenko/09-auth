import { User } from "@/types/user";
import { api } from "./api";
import { cookies } from "next/headers";
import { Note, NoteTag } from "@/types/note";
import { AxiosResponse } from "axios";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchText: string,
  page: number,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const cookieStore = cookies();

  const response = await api.get<FetchNotesResponse>("/notes", {

     headers: {
      Cookie: cookieStore.toString(),
    },
    
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
  const cookieStore = cookies();
  
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = cookies();

  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

interface CheckSessionResponse {
  success: boolean;
}

export const checkSession = async (): Promise<
  AxiosResponse<CheckSessionResponse>
> => {
  const cookieStore = cookies();

  return await api.get<CheckSessionResponse>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};
