import Home from '../Pages/Home'
import menu1 from '../Pages/menu1'
import menu2 from '../Pages/menu2'
import { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

export default class RouteConfig extends Component{
    render(){
      return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/menu1" component={menu1} />
            <Route path="/menu2" component={menu2} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      )
    }
  }