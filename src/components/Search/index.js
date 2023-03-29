import PropType from "prop-types";
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

Search.propTypes = {
  value: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
  onSubmit: PropType.func.isRequired,
  children: PropType.node,
};

export default Search;
