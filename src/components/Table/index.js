import PropTypes from "prop-types";
import Button from "../Button";
import { SORTS } from "../App";

// const isSearched = (searchTerm) => (item) =>
//   !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = { width: "40%" };
const midColumn = { width: "30%" };
const smallColumn = { width: "10%" };

const Sort = ({ sortKey, onSort, children }) => (
  <Button onClick={() => onSort(sortKey)} className="button-inline">
    {children}
  </Button>
);

const Table = ({ list, onDismiss, sortKey, onSort, isSortReverse }) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
  return (
    <div className="table">
      <div className="table-header">
        <span style={{ width: "40%" }}>
          <Sort sortKey="TITLE" onSort={onSort}>
            Title
          </Sort>
        </span>
        <span style={{ width: "30%" }}>
          <Sort sortKey="AUTHOR" onSort={onSort}>
            Author
          </Sort>
        </span>
        <span style={{ width: "10%" }}>
          <Sort sortKey={"COMMENTS"} onSort={onSort}>
            Comments
          </Sort>
        </span>
        <span style={{ width: "10%" }}>
          <Sort sortKey={"POINTS"} onSort={onSort}>
            Points
          </Sort>
        </span>
        <span style={{ width: "10%" }}>Archive</span>
      </div>
      {reverseSortedList.map((item) => (
        <div key={item.objectID} className="table-row">
          {" "}
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              {" "}
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Table;
