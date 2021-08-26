import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import UserPage from './components/UserPage';
import {Button} from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends React.Component <{}, any>  {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: undefined
    }
  }


  render() {
  return (
    <div className="App">
      <div>  
      <Router>
      <ul className="menu">
            <Link to="/"style={{color: "white"}}>Login</Link>
            <br />
            <Link to="/user"style={{color: "white"}}>User Page</Link>
        </ul>
          <Route exact path ={'/user'} component={UserPage} />
          <Route exact path ={'/'} component={Login} />
          <Route exact path={'/'} component ={Footer} />
          
      </Router>
      
      {/* <Router>
        <UserPage />
      </Router>
      {this.state.sessionToken === undefined && (
        <Login />
      )}
      <Footer /> */}
      </div>
    </div>
    
    
  );
}
}

export default App;
