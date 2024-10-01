import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Paginate from "../Paginate";

test("renders pagination items correctly", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Paginate pages={3} page={1} />
    </MemoryRouter>
  );

  expect(getByText("1")).toBeInTheDocument();
  expect(getByText("2")).toBeInTheDocument();
  expect(getByText("3")).toBeInTheDocument();
});

test("highlights the active page", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Paginate pages={3} page={2} />
    </MemoryRouter>
  );

  expect(getByText("2").parentElement).toHaveClass("active");
});
