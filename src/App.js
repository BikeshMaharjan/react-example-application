import "./App.css";
import { useState } from "react";
import Search from "./Search";
import Table from "./Table";

const objList = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function App() {
  const [list, setList] = useState(objList);
  const [searchTerm, setSearchTerm] = useState("");
  const onDismiss = (id) => {
    const isNotId = (item) => item.objectID !== id;
    const updatedList = list.filter(isNotId);
    setList(updatedList);
  };
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="App">
      <Search value={searchTerm} onChange={onSearchChange}>
        {" "}
        Search{" "}
      </Search>
      <Table list={list} pattern={searchTerm} onDismiss={onDismiss} />
    </div>
  );
}

export default App;
