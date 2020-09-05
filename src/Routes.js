import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Lists from "./Lists";
import StockDetails from "./StockDetails";
import SearchResults from "./SearchResults";

function Routes(setToken) {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route exact path="/login">
                <Login setToken={setToken} />
            </Route>
            <Route path="/lists" exact>
                <Lists />
            </Route>
            <Route path="/search" exact>
                <SearchResults />
            </Route>
            <Route path="/:stockId" exact>
                <StockDetails />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;
