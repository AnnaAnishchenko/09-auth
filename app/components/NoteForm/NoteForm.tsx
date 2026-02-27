"use client";

import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useState } from "react";
import type { NoteTag } from "@/types/note";

import { useNoteStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft(); // Очищення чернетки
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      router.push("/notes/filter/all");
    },
    onError: () => {
      setError("Failed to create note");
    },
  });

  // Функція для обробки відправки форми
  async function formAction(formData: FormData) {
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const tag = (formData.get("tag") as NoteTag) ?? "Todo";

    if (title.length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    setError(null);

    mutate({ title, content, tag });
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    // setDraft({ [event.target.name]: event.target.value });
    // або
    const { name, value } = event.target;
    if (name === "title") setDraft({ title: value });
    if (name === "content") setDraft({ content: value });
    if (name === "tag") setDraft({ tag: value as NoteTag });
  };

  return (
    <form action={formAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={3}
          className={css.input}
          onChange={handleChange}
          // defaultValue={draft.title}
          value={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          className={css.textarea}
          onChange={handleChange}
          // defaultValue={draft.content}
          value={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          // defaultValue= "Todo"
          onChange={handleChange}
          value={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {error && <span className={css.error}>{error}</span>}

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.push("/notes/filter/all")}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button type="submit" disabled={isPending} className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
