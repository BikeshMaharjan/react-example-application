import "./index.css";
import React, { useEffect, useState } from "react";
import { sortBy } from "lodash";
import Search from "../Search";
import Table from "../Table";
import Button from "../Button";
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
import withLoading from "../HOC";

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENTS: (list) => sortBy(list, "num_comments").reverse(),
  POINTS: (list) => sortBy(list, "points").reverse(),
};

function App() {
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(
    (results && results[searchTerm] && results[searchTerm].page) || 0
  );
  const [isLoading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState("NONE");
  const [isSortReverse, setSortReverse] = useState(false);

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
    setLoading(false);
  };
  const fetchData = async (page) => {
    setLoading(true);
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

  const onSort = (key) => {
    const isSortReversed = sortKey === key && !isSortReverse;
    setSortKey(key);
    setSortReverse(isSortReversed);
  };

  const ButtonWithLoading = withLoading(Button);

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
          <Table
            list={list}
            sortKey={sortKey}
            onSort={onSort}
            isSortReverse={isSortReverse}
            onDismiss={onDismiss}
          />
          <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => fetchData(page + 1)}
            >
              More
            </ButtonWithLoading>
          </div>
        </>
      )}
    </div>
  );
}

export { Search, Table, Button, SORTS };

export default App;
