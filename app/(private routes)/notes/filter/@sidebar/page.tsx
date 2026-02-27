import css from "./SidebarNotes.module.css";
import Link from "next/link";
import type { NoteTag } from "@/types/note";



const TAGS: NoteTag[] = ["Todo", "Personal", "Work", "Shopping", "Meeting"];

function SidebarNotes() {
  
  return (
    <>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SidebarNotes;



