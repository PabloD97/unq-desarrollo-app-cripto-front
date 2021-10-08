
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "../components/Home"
import Cryptoassets from "../components/Cryptoassets"
import Register from "../components/Register"
import Login from "../components/Login";


const Routes = () => {

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component= {Login}/>
                    <Route path="/register" component = {Register}/>
                    <Route path="/home" component= {Home}/>
                    <Route path="/cryptoassets" component= {Cryptoassets}/>
                    <Route path="/" component= {Login}/>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Routes;