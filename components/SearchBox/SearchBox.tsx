import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (newQuery: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      onChange={(event) => onSearch(event.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}