import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "../About";

const renderAbout = () => {
  return render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
};

describe("About Component", () => {
  test("renders About Us heading", () => {
    const { getByText } = renderAbout();
    expect(getByText(/About Us/i)).toBeInTheDocument();
  });

  test("renders mission statement", () => {
    const { getByText } = renderAbout();
    expect(
      getByText(/Our mission is to provide the best e-commerce experience/i)
    ).toBeInTheDocument();
  });

  test("renders story statement", () => {
    const { getByText } = renderAbout();
    expect(
      getByText(/Founded in 2024, as a group of 4 entrepreneur/i)
    ).toBeInTheDocument();
  });

  test("renders Meet Our Team heading", () => {
    const { getByText } = renderAbout();
    expect(getByText(/Meet Our Team/i)).toBeInTheDocument();
  });

  test("renders team member names", () => {
    const { getByText } = renderAbout();
    expect(getByText(/Darshil Maheshbhai Prajapati/i)).toBeInTheDocument();
    expect(getByText(/Dulguun Myagmarsuren/i)).toBeInTheDocument();
    expect(getByText(/Navpreet Singh SANDHU/i)).toBeInTheDocument();
    expect(getByText(/Milan Korangi/i)).toBeInTheDocument();
  });
});
