import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import './App.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


export default class App extends Component{
  state = {
    isLoggedIn:false
  }
  render(){
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.isLoggedIn ? <Welcome /> : <Redirect to='/login' />}
            </Route>
            <Route exact path="/login">
              {this.state.isLoggedIn ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path="/signup" component={SignUp} exact/>
          </Switch>
        </Router>
      </div>
    )
  }
}