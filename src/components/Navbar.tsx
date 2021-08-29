import React from 'react';
import { Route, Link } from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom';
import {AppBar, Typography, Button} from "@material-ui/core";
import NoteDisplay from './Notes/NoteDisplay';
import CompPlanDisplay from './Comp Plans/DisplayCompPlan';
import TrainPlanDisplay from './Training Plans/DisplayTPlans';
import VideoDisplay from './Videos/GetVideos'

export default class NavBar extends React.Component {
    render() {
    return (
      <AppBar className = "navbarguy" position="static" style= {{background: "#0B0C10"}}>
        
            <Router>
            <Typography variant="h6">
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
            <Route exact path ={'/notedisplay'} component={NoteDisplay} />
            <Route exact path = {'/comp'} component = {CompPlanDisplay} />
            <Route exact path ={'/trainingplan'} component={TrainPlanDisplay} />
            <Route exact path ={'/videos'} component={VideoDisplay} />
            </Router>
         
      </AppBar>
    );
  }
}