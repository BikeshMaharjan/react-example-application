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
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(
    (results && results[searchKey] && results[searchKey].page) || 0
  );

  const list = (results && results[searchKey] && results[searchKey].hits) || [];

  useEffect(() => {
    fetchData(DEFAULT_PAGE);
  }, []);

  const setSearchTopStories = (apiResult) => {
    const { hits, page } = apiResult;
    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    console.log(updatedHits);
    console.log(searchKey);
    setResults({ ...results, [searchKey]: { hits: updatedHits, page } });
    console.log(results);
    setPage(page);
  };
  const fetchData = async (page) => {
    setSearchKey(searchTerm);
    console.log(searchKey);
    return await fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchKey}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFULT_HPP}`
    )
      .then((response) => response.json())
      .then((result) => setSearchTopStories(result));
  };

  const onDismiss = (id) => {
    const isNotId = (item) => item.objectID !== id;
    const updatedList = results[searchKey].hits.filter(isNotId);
    setResults({ ...results, [searchKey]: { hits: updatedList, page } });
  };
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const needsToSearchTopStories = () => !results[searchTerm];

  const onSearchSubmit = (event) => {
    console.log(searchTerm);
    setSearchKey(searchTerm);
    console.log(searchKey);
    if (needsToSearchTopStories()) {
      fetchData(DEFAULT_PAGE);
    }

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
          <Table list={list} onDismiss={onDismiss} />
          <div className="interactions">
            <button onClick={() => fetchData(page + 1)}>More</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
