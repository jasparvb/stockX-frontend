import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import Lists from './Lists';

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
        <Lists />
      </BrowserRouter>
    </Provider>);
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Lists />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
