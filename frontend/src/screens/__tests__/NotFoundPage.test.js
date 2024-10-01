// src/pages/__tests__/NotFoundPage.test.js
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

describe("NotFoundPage", () => {
  it("renders the 404 message", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(getByText(/404/i)).toBeInTheDocument();
    expect(getByText(/page not found/i)).toBeInTheDocument();
    expect(getByText(/oops! the page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it("has a button that links to the homepage", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const button = getByRole("button", { name: /go to homepage/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/');
  });
});
