import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import AddStockForm from './AddStockForm';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

const lists = [
  {
    id: 1,
    name: "Tech Stocks"
  }
]

it("renders without crashing", function() {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AddStockForm lists={lists} />
      </BrowserRouter>
    </Provider>);
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <AddStockForm lists={lists} />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});