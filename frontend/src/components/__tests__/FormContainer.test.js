import React from "react";
import { render } from "@testing-library/react";
import FormContainer from "../FormContainer";

test("renders children correctly", () => {
  const { getByText } = render(
    <FormContainer>
      <h1>children test</h1>
    </FormContainer>
  );

  expect(getByText("children test")).toBeInTheDocument();
});
