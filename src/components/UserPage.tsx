import React from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';

export default class UserPage extends React.Component{
    render() {
        return(
            <div>
            <Link to = "/user">
            </Link>
            <Navbar />
            </div>
        )
    }
}