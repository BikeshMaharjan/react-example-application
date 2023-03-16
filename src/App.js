import "./App.css";
import { useEffect, useState } from "react";
import Search from "./Search";
import Table from "./Table";

const DEFAULT_QUERY = "redux";
const DEFAULT_PAGE = 0;
const DEFULT_HPP = 100;
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

function App() {
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState((results && results.page) || 0);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchData(DEFAULT_PAGE);
  }, []);

  const setSearchTopStories = (apiResult) => {
    const { hits, page } = apiResult;
    const oldHits = page !== 0 ? results.hits : [];
    const updatedHits = [...oldHits, ...hits];
    setResults({ hits: updatedHits });
    setPage(page);
  };
  const fetchData = async (page) => {
    setSearchKey(searchTerm);
    return await fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFULT_HPP}`
    )
      .then((response) => response.json())
      .then((result) => setSearchTopStories(result));
  };

  const onDismiss = (id) => {
    const isNotId = (item) => item.objectID !== id;
    const updatedList = results.hits.filter(isNotId);
    setResults({ ...results, hits: updatedList });
  };
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const onSearchSubmit = (event) => {
    fetchData(DEFAULT_PAGE);
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
      {results && (
        <>
          <Table list={results.hits} onDismiss={onDismiss} />
          <div className="interactions">
            <button onClick={() => fetchData(page + 1)}>More</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
