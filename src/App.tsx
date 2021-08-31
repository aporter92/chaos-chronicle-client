import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import bjj from '../src/assets/bjj.jpeg';
import UserPage from './components/UserPage';
import NoteDisplay from './components/Notes/NoteDisplay'
import CompPlanDisplay from './components/Comp Plans/DisplayCompPlan'
import TrainPlanDisplay from './components/Training Plans/DisplayTPlans'
import VideoDisplay from './components/Videos/GetVideos'
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
      
      {/* <Route exact path ={'/home'} component={HomePage} />
            <Route exact path ={'/notedisplay'} component={NoteDisplay} />
            <Route exact path = {'/comp'} component = {CompPlanDisplay} />
            <Route exact path ={'/trainingplan'} component={TrainPlanDisplay} />
            <Route exact path ={'/videos'} component={VideoDisplay} /> */}
      </Router>
      </div>
    </div>
    ) 
  }
}

export default App;
