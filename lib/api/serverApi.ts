import { User } from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { Note, NoteTag } from "@/types/note";


interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchText: string,
  page: number,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
 
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {

     headers: {
      Cookie: cookieStore.toString(),
    },
    
    params: {
      page,
      perPage: 12,
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
  const cookieStore = await cookies();
  
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};



export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
