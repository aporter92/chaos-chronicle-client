import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import bjj from '../src/assets/bjj.jpeg';
import UserPage from './components/UserPage';
import { BrowserRouter as Router, Route} from "react-router-dom";

type acceptedInputs = {
  sessionToken: any, 
}

class App extends React.Component <any, acceptedInputs>  {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: localStorage.getItem('token')
    }
  }

  render() {
    return ( 
      <div>
        <div style={{ backgroundImage: `url(${bjj})` }}className="App">
        <Router>
      { //Check token
        (this.state.sessionToken === null)
          ? <div> <Login /> <p className="welcomemessage">WELCOME TO <br />THE CHAOS </p><p className="rightwelcomemessage"></p><Footer /></div> 
          : <div> <UserPage /> </div> 
      }
      </Router>
      </div>
    </div>
    ) 
  }
}

export default App;
