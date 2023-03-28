import "./index.css";
import React, { useEffect, useState } from "react";
import Search from "../Search";
import Table from "../Table";
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from "../../constants";

function App() {
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(
    (results && results[searchTerm] && results[searchTerm].page) || 0
  );

  useEffect(() => {
    fetchData(DEFAULT_PAGE);
  }, []);

  const list =
    (results && results[searchTerm] && results[searchTerm].hits) || [];

  const setSearchTopStories = (apiResult) => {
    const { hits, page } = apiResult;
    const oldHits =
      results && results[searchTerm] ? results[searchTerm].hits : [];
    const updatedHits = [...oldHits, ...hits];
    setResults({ ...results, [searchTerm]: { hits: updatedHits, page } });
    setPage(page);
  };
  const fetchData = async (page) => {
    return await fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFULT_HPP}`
    )
      .then((response) => response.json())
      .then((result) => setSearchTopStories(result));
  };

  const onDismiss = (id) => {
    const isNotId = (item) => item.objectID !== id;
    const updatedList = results[searchTerm].hits.filter(isNotId);
    setResults({ ...results, [searchTerm]: { hits: updatedList, page } });
  };
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const needsToSearchTopStories = () => !results[searchTerm];

  const onSearchSubmit = (event) => {
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
