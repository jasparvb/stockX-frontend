import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer);

it("renders without crashing", function() {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>);
});
