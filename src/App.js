import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import './App.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


let Users = [
  {
    username:"Abdus Samad",
    email:"abdus8samad@gmail.com",
    password:"Football123"
  }
];

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
  render(){
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.isLoggedIn ? <Welcome /> : <Redirect to='/login' />}
            </Route>
            <Route exact path="/login">
              {this.state.isLoggedIn ? <Redirect to='/' /> : <Login verifyUser={(user) => this.verifyUser(user)} setUser={(user) => this.setUser(user)} />}
            </Route>
            <Route path="/signup" component={SignUp} exact/>
          </Switch>
        </Router>
      </div>
    )
  }
}