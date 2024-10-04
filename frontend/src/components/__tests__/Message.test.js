import React from "react";
import { render, screen } from "@testing-library/react";
import Message from "../Message";

describe("Message Component", () => {
  test("renders children text", () => {
    render(<Message variant="success">Success Message</Message>);
    expect(screen.getByText(/Success Message/i)).toBeInTheDocument();
  });

  test("applies default variant when none is provided", () => {
    const { container } = render(<Message>Default Message</Message>);
    expect(container.querySelector(".alert-info")).toBeInTheDocument();
  });

  test("applies correct variant class", () => {
    const { container } = render(
      <Message variant="danger">Error Message</Message>
    );
    expect(container.querySelector(".alert-danger")).toBeInTheDocument();
  });
  
});
