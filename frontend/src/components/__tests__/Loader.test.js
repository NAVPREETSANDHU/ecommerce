import React from "react";
import { render } from "@testing-library/react";
import Loader from "../Loader";

test("renders the Loader component", () => {
  const { getByRole } = render(<Loader />);

  const spinner = getByRole("status");

  expect(spinner).toBeInTheDocument();
  expect(spinner).toHaveClass("spinner-border"); 
});
