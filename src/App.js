import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Users from './db/Users.json';
import jsonfile from 'jsonfile';
import './App.css';


export default class App extends Component{
  state = {
    isLoggedIn:false,
    user:null
  }
  verifyUser = (user) =>{
    let index = -1;
    Users.forEach((usr,i) =>{
      if(usr.username === user.username){
        index = i;
      }
    })
    if(index !== -1){
      if(user.password === Users[index].password && user.username === Users[index].username) return true;
      else return false;
    }
    else return false;
  }
  setUser = (user) =>{
    this.setState({
      isLoggedIn:true,
      user
    })
  }
  signOut = () =>{
    this.setState({
      isLoggedIn:false,
      user:null
    })
  }
  signUp = (user) =>{
    Users.push(user);
    let json = JSON.stringify(Users);
    jsonfile.writeFile('./db/Users.json',json,() =>{
      this.setState({
        isLoggedIn:true,
        user
      });
    })
  }
  render(){
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.isLoggedIn ? <Welcome signOut={this.signOut}/> : <Redirect to='/login' />}
            </Route>
            <Route exact path="/login">
              {this.state.isLoggedIn ? <Redirect to='/' /> : <Login verifyUser={(user) => this.verifyUser(user)} setUser={(user) => this.setUser(user)} />}
            </Route>
            <Route path="/signup" exact>
            {this.state.isLoggedIn ? <Redirect to='/' /> : <SignUp signUp={(user) => this.signUp(user)} />}
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}