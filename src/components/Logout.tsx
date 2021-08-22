import React from 'react';
import {Button, Link} from '@material-ui/core';

export default class Logout extends React.Component { 
    constructor(props:any) {
        super (props)
        this.state = {
            sessionToken: undefined
          }
        }
        // clearSession () {
        //   localStorage.clear();
        //   this.setState({sessionToken: undefined});
        //   this.render();
        // };

//     render() {
//         return(
//             <Button className="button" onclick={()=> localStorage.clear()}></Button>
//         )
// } 
}