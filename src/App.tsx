import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {Button} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoteCreate from './components/NoteCreate';
class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: undefined
    }
  }

  render() {
  return (
    <Router>
    <div className="App">
      <div className = "verticalCenter">  
        <Navbar />
        <Login />
        <Footer />
        <NoteCreate />
      
      </div>
    </div>
    </Router>
  );
}
}

export default App;
