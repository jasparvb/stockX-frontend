import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import ListItem from "./ListItem";

const store = createStore(rootReducer);

const quote = {
  open: 114.68,
  close: 112,
  change: -1.49,
  changePercent: -0.01313
}

it("renders without crashing", function() {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ListItem quote={quote} />
      </BrowserRouter>
    </Provider>);
});


it("matches snapshot", function() {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <ListItem quote={quote} />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
