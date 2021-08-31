import React from 'react';
import { Route, Link } from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom';
import {AppBar, Typography, Button} from "@material-ui/core";
import NoteDisplay from './Notes/NoteDisplay';
import CompPlanDisplay from './Comp Plans/DisplayCompPlan';
import TrainPlanDisplay from './Training Plans/DisplayTPlans';
import VideoDisplay from './Videos/GetVideos'
import HomePage from './HomePage';
import BJJ from '../assets/BJJ.png';

export default class NavBar extends React.Component {
    render() {
    return (
      <AppBar position="static" className = "navbarguy" style= {{background: "#0B0C10"}}>
        <Link className= "img" to="/">
              <img alt="logo" src={BJJ} height="100px" />
            </Link>
            <Router>
              <div className="navbaritems">
            <Typography variant="h6" >
            
              <Button >
              <Link to ="/home" id ="navlink" style={{float: "right",color: "#66FCF1"}}>Home</Link>
              </Button>
              <Button>
              <Link to ="/notedisplay" id="navlink" style={{color: "#66FCF1"}}>Class Notes</Link>
            </Button>
            <Button>
            <Link to ="/trainingplan" id="navlink" style={{color: "#66FCF1"}}>Training Plan</Link>
            </Button>
            <Button>
            <Link to ="/comp" id="navlink" style={{color: "#66FCF1"}}>Competition Plan</Link>
            </Button>
            <Button>
            <Link to ="/videos" id="navlink" style={{color: "#66FCF1"}}>Videos</Link>
            </Button>
            <Button id="logoutbutton" onClick={()=> localStorage.clear()}>LOGOUT </Button>
            </Typography>
            </div>
            <br />
            <br />
            <br />
            <Route exact path ={'/home'} component={HomePage} />
            <Route exact path ={'/notedisplay'} component={NoteDisplay} />
            <Route exact path = {'/comp'} component = {CompPlanDisplay} />
            <Route exact path ={'/trainingplan'} component={TrainPlanDisplay} />
            <Route exact path ={'/videos'} component={VideoDisplay} />
            
            </Router>
         
      </AppBar>
    );
  }
}