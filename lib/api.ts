import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

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

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};


export const fetchNoteById =async (id: Note["id"]): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

