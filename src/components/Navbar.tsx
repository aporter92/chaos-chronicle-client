import React from 'react';
import { Route, Link } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Container, Button} from "@material-ui/core";

export default class NavBar extends React.Component {
    render() {
    return (
      <AppBar className = "navbarguy" position="static" style= {{background: "#0B0C10"}}>
        <Container >
          <Toolbar>
            <Typography variant="h6">
              <Button>
            <a href="#classnotes" id="navlink" style={{color: "#66FCF1"}}>Class Notes</a>
            </Button>
            <Button>
            <a href="#classnotes" style={{color: "#66FCF1"}}>Training Plan</a>
            </Button>
            <Button>
            <a href="#classnotes" style={{color: "#66FCF1"}}>Competition Plan</a>
            </Button>
            <Button>
            <a href="#classnotes" style={{color: "#66FCF1"}}>Videos</a>
            </Button>
            <Button id="logoutbutton" onClick={()=> localStorage.clear()}>LOGOUT </Button>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}