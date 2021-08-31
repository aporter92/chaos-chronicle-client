import React from 'react';
import {AppBar, Toolbar, Typography, Container} from "@material-ui/core";

export default class Footer extends React.Component {
    render() { 
        return(
        <AppBar id = "footer" position="static" style ={{background: 'inherit'}}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                &copy; 2019 Anne Porter
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        )
    }
}

