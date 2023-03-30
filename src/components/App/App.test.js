import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App, { Search, Button, Table } from "./index";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<App />, div);
  });

  test("snapshots", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders", () => {
    const div = document.createElement("div");
    render(<Search>Search</Search>, div);
  });
  test("snapshots", () => {
    const component = renderer.create(<Search>Search</Search>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders", () => {
    const div = document.createElement("div");
    render(<Button>Give Me More</Button>, div);
  });

  test("snapshots", () => {
    const component = renderer.create(<Button>Give Me More</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Table", () => {
  const props = {
    list: [
      { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
      { title: "2", author: "2", num_comments: 1, points: 2, objectID: "z" },
    ],
  };
  it("renders", () => {
    const div = document.createElement("div");
    render(<Table {...props} />, div);
  });
  test("snapshots", () => {
    const component = renderer.create(<Table {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
