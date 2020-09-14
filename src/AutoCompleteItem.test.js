import React from "react";
import { render } from "@testing-library/react";
import AutoCompleteItem from "./AutoCompleteItem";

it("renders without crashing", function() {
  render(<AutoCompleteItem />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<AutoCompleteItem />);
  expect(asFragment()).toMatchSnapshot();
});
