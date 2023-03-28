import "./index.css";

const Search = ({ value, onChange, onSubmit, children }) => (
  <form className="search-bar" onSubmit={onSubmit}>
    {children} <input type="text" onChange={onChange} value={value} />
    <button name="search" type="submit">
      {" "}
      Search{" "}
    </button>
  </form>
);

export default Search;
