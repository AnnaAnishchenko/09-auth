
"use client"
import {fetchNoteById} from "@/lib/api";
import css from '../filter/[...slug]/Notes.module.css';

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";





function NoteDetailsClient () {
const { id } = useParams<{ id: string }>();

const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
 refetchOnMount: false,

  });



 if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
export default NoteDetailsClient;