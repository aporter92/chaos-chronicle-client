import React from 'react';
import { Route, Link } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Container, Button} from "@material-ui/core";

export default function NavBar() {
    return (
      <AppBar position="static" color="primary">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" color="inherit">
            <Link to="/notes">
                <Button className="button" type="button">
                 Class Notes
                </Button>
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }