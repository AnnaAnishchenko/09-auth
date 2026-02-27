import css from "./LayoutNotes.module.css"


interface NotesLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

function NotesLayout({ sidebar, children }: NotesLayoutProps) {
  return (
    <section className = {css.container}>
      <aside className = {css.sidebar}>{sidebar}</aside>
      <main className = {css.notesWrapper}> {children}</main>
    </section>
  );
}

export default NotesLayout;
