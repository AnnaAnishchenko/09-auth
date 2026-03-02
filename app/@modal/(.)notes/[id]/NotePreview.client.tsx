"use client";

import css from "./NotePreview.module.css";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from "@/components/Modal/Modal";


interface NotePreviewClientProps {
  id: string;
}
export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

 const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <button onClick={handleClose} className={css.backBtn}>
          Close
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <p className={css.tag}>{note.tag}</p>
        </div>
      </div>
    </Modal>
  );
}
