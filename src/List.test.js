import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import List from './List';

const stocks = [
  {
    id: 1,
    ticker:"AAPL",
    name:"Apple Inc",
    list_id:1,
    quote: {
      open: 114.68,
      close: 112,
      change: -1.49,
      changePercent: -0.01313
    }
  }
];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

it("renders without crashing", function() {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <List stocks={stocks} />
      </BrowserRouter>
    </Provider>);
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <List stocks={stocks} />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
