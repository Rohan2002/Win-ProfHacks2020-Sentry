import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Home from './Component/Home/Home';
const Routers = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />{" "}
      {/* <Route exact path="/signup" component={SignUp}></Route> */}
      <Route component={()=>{return(<h1>404</h1>)}} />
    </Switch>
  </Router>
);

ReactDOM.render(Routers, document.querySelector("#root"));