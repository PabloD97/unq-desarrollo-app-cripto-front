
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "../components/Home"
import Cryptoassets from "../components/Cryptoassets"
import Activity from "../components/Activity"

import Register from "../components/Register"
import Login from "../components/Login";
import UserList from "../components/UserList";


const Routes = () => {

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/userslist" component= {UserList}/>

                    <Route path="/login" component= {Login}/>
                    <Route path="/register" component = {Register}/>
                    <Route path="/home" component= {Home}/>
                    <Route path="/cryptoassets" component= {Cryptoassets}/>
                    <Route path="/activities" component= {Activity}/>

                    <Route path="/" component= {Login}/>

                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Routes;