import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {Button} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: undefined
    }
  }

  
  //   clearSession () {
  //   localStorage.clear();
  //   this.setState({sessionToken: undefined});
  // };

  render() {
  return (
    <Router>
    <div className="App">
      <div className = "verticalCenter">  
        <Navbar />
        <Login />
        <Footer />
      
      </div>
    </div>
    </Router>
  );
}
}

export default App;
