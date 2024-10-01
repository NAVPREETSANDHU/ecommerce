import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import SearchBox from "../SearchBox"; // Adjust the import based on your file structure

// Mocking the useNavigate hook
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

describe("SearchBox Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockNavigate.mockClear();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => mockNavigate);
  });

  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/search/:keyword" element={<SearchBox />} />
          <Route path="/" element={<SearchBox />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders search box with initial value from URL", () => {
    renderWithRouter(["/search/test"]);

    const input = screen.getByPlaceholderText(/search products.../i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("test"); // Check if input value matches URL keyword
  });

  test("renders empty search box when no keyword in URL", () => {
    renderWithRouter(["/"]);

    const input = screen.getByPlaceholderText(/search products.../i);
    expect(input.value).toBe(""); // Should be empty
  });

  test("updates input value on change", () => {
    renderWithRouter(["/"]);

    const input = screen.getByPlaceholderText(/search products.../i);
    fireEvent.change(input, { target: { value: "new search" } });
    expect(input.value).toBe("new search"); // Check if input value is updated
  });

  test("submits the form and navigates on valid input", () => {
    renderWithRouter(["/"]);

    const input = screen.getByPlaceholderText(/search products.../i);
    fireEvent.change(input, { target: { value: "product" } });

    fireEvent.submit(input.closest("form")); // Submit the form

    expect(mockNavigate).toHaveBeenCalledWith("/search/product"); // Check if it navigates correctly
  });

  test("submits the form and navigates to home on empty input", () => {
    renderWithRouter(["/"]);

    const input = screen.getByPlaceholderText(/search products.../i);
    fireEvent.change(input, { target: { value: "" } });

    fireEvent.submit(input.closest("form")); // Submit the form

    expect(mockNavigate).toHaveBeenCalledWith("/"); // Check if it navigates to home
  });
});
