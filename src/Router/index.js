import Home from '../Pages/Home'
import menu1 from '../Pages/menu1'
import menu2 from '../Pages/menu2'
import app from '../App'
import Imglist from '../Pages/Imglist'
import { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

export default class RouteConfig extends Component{
    render(){
      return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/menu1/:tagid" component={menu1} />
            <Route path="/menu2" component={menu2} />
            <Route path="/app" component={app} />
            <Route path="/Imglist" component={Imglist} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      )
    }
  }