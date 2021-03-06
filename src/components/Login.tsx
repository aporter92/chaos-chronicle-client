import React from 'react';
import {Button} from '@material-ui/core';
import APIURL from '../helpers/environment';

export default class Login extends React.Component <any, any> {
    constructor (props: any) {
        super (props);
        this.state = {
            signingUp: false,
            sessionToken: localStorage.getItem('token')
        }
    }

    async loginHandler(e: any) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        let reqBody = 
        {
            email:email,
            password: password
        } 
        let url = 
            `${APIURL}/user/login` 
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(json => {
          localStorage.setItem('token', json.token);
            alert(json.message)
            // localStorage.setItem("token", json.token)
            // this.props.updateLocalStorage(json.token)
            
        })
        .catch(err => console.log(err))
    }

    startSignUp() {
        this.setState({ signingUp: true });
        this.render();
      }
    loginToggle() {
        this.setState({ signingUp: false})
        this.setState({ firstName: ""})
        this.setState({ email: ""})
        this.setState({ password: ""})
        this.render()
    }
    
      async signupHandler(e:any) {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const admin = false;
        
        let reqBody = 
        {
            firstName: firstName,
            email:email,
            password: password,
            admin: admin
        } 
        let url = 
            `${APIURL}/user/register` 
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(json => {
            alert(json.message)
            localStorage.setItem('token', json.token);
        })
        .catch(err => console.log(err))
    }

    render() {
        return(
            <div className = "registerlogin">
                {this.state.signingUp ? (
          <div>
            <form className= "logincontainer"
              action="#"
              onSubmit={this.signupHandler.bind(this)}
              style={{ fontWeight: 600 }}
            >
              <label htmlFor="firstName">First Name</label>
              <br />
              <input type="text" name="firstName" />
              <br />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" name="email" />
              <br />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" name="password" />
              <br />
              <br />
              <Button id ="signupbutton" type = "submit">Submit</Button>
              < br />
              <br />
              <Button size= "small" id ="signupbutton" onClick={this.loginToggle.bind(this)}>Log In</Button>
            </form>
            
          </div>
        ) : (
          <div>
            <form className= "logincontainer"
              action="#"
              onSubmit={this.loginHandler.bind(this)}
              style={{ fontWeight: 600 }}
            >
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" name="email" />
              <br />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" name="password" />
              <br />
              <br />
              <Button id="loginbutton" type = "submit">Log in</Button>
              <p></p>
              {/* <p className= "signupinfo">Don't have an account?</p> */}
            <Button id ="signupbutton" onClick={this.startSignUp.bind(this)}>Sign up</Button>
            </form>
            
          </div>
        )}
            </div>
        )
    }
}