import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Users from './db/Users.json';
import './App.css';


export default class App extends Component{
  state = {
    isLoggedIn:false,
    user:null
  }
  verifyUser = (user) =>{
    let index = -1;
    // Check if user is present and if present then at which index
    Users.forEach((usr,i) =>{
      if(usr.username === user.username){
        index = i;
      }
    })
    // If user is present in the DB
    if(index !== -1){
      if(user.password === Users[index].password && user.username === Users[index].username) return true;
      else return false;
    }
    //If User not present in the DB (That Means Not Signed UP)
    else return false;
  }
  setUser = (user) =>{
    //Set User credentials in the state here otherwise it's in cookies
    this.setState({
      isLoggedIn:true,
      user
    })
  }
  signOut = () =>{
    //Removing user from the state here otherwise cookie is removed from the browser
    this.setState({
      isLoggedIn:false,
      user:null
    })
  }
  signUp = (user) =>{
    //Adding new user to the DB
    Users.push(user);
    this.setState({
      isLoggedIn:true,
      user
    });
  }
  render(){
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {/* If User is Logged in then show welcome page otherwise redirect to login page */}           
              {this.state.isLoggedIn ? <Welcome signOut={this.signOut} user={this.state.user} /> : <Redirect to='/login' />}
            </Route>
            <Route exact path="/login">
              {/* If User is already Logged in then show welcome page otherwise render login page */}           
              {this.state.isLoggedIn ? <Redirect to='/' /> : <Login verifyUser={(user) => this.verifyUser(user)} setUser={(user) => this.setUser(user)} />}
            </Route>
            <Route path="/signup" exact>
            {/* If User is already Logged in then show welcome page otherwise render signUp page */}
            {this.state.isLoggedIn ? <Redirect to='/' /> : <SignUp signUp={(user) => this.signUp(user)} />}
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}