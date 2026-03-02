"use client";

import css from "./Notes.module.css";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from '@/lib/api/clientApi';
import type { NoteTag } from "@/types/note";

import Link from "next/link";

import SearchBox from "@/app/components/SearchBox/SearchBox";
import Pagination from "@/app/components/Pagination/Pagination";
import NoteList from "@/app/components/NoteList/NoteList";

interface NotesClientProps {
  tag?: NoteTag;
}

function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearchQuery] = useDebounce(searchQuery, 500);

  const { data } = useQuery({
    queryKey: ["notes", debounceSearchQuery, currentPage, tag],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const handleChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default NotesClient;
