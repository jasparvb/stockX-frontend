import React from "react";
import { render } from "@testing-library/react";
import NewsCard from "./NewsCard";

it("renders without crashing", function() {
  render(<NewsCard />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<NewsCard />);
  expect(asFragment()).toMatchSnapshot();
});
