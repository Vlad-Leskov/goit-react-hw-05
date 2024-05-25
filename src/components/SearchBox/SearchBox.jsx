import css from "./SearchBox.module.css";
const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="search">Find contact by name:</label>
      <input
        className={css.inputSearch}
        type="text"
        id="search"
        placeholder="Search contacts..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
