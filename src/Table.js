const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <>
      {list.filter(isSearched(pattern)).map((item) => (
        <div key={item.objectID}>
          {" "}
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <button onClick={() => onDismiss(item.objectID)} type="button">
              {" "}
              Dismiss
            </button>
          </span>
        </div>
      ))}
    </>
  );
};

export default Table;
