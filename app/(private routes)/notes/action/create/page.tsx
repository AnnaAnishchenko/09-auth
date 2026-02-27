import NoteForm from "@/app/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note page",
  openGraph: {
    title: "Create note",
    description: "Create a new note page",
    url: "https://08-zustand-phi-one.vercel.app/notes/action/create",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }
    ]
  }
}


 function CreateNote() {
 
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
