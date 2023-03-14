import "./App.css";
import { useEffect, useState } from "react";
import Search from "./Search";
import Table from "./Table";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

function App() {
  const [list, setList] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);

  const fetchData = async () =>
    await fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => setList(result));

  useEffect(() => {
    fetchData();
  }, []);

  const onDismiss = (id) => {
    const isNotId = (item) => item.objectID !== id;
    const updatedList = list.hits.filter(isNotId);
    setList({ ...list, hits: updatedList });
  };
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const onSearchSubmit = (event) => {
    fetchData();
    event.preventDefault();
  };
  return (
    <div className="page">
      <div className="interactions">
        <Search
          value={searchTerm}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
      </div>
      {list && <Table list={list.hits} onDismiss={onDismiss} />}
    </div>
  );
}

export default App;
