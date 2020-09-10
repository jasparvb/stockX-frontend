import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Lists from "./Lists";
import StockDetails from "./StockDetails";

function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route path="/lists" exact>
                <Lists />
            </Route>
            <Route path="/:ticker" exact>
                <StockDetails />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;
