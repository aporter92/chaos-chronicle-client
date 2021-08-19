import React from 'react';
import {Button} from '@material-ui/core'

export default class Login extends React.Component <any, any> {
    constructor (props: any) {
        super (props);
        this.state = {
            login: true
        }
    }

    async submitHandler(e: any) {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        let reqBody = 
        {
            email:email,
            password: password
        } 
        let url = 
            "http://localhost:3000/user/login" 
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(json => {
            alert(json.message)
            this.props.updateLocalStorage(json.token)
        })
        .catch(err => console.log(err))
    }

    startSignUp() {
        this.setState({ signingUp: true });
        this.render();
      }
    
      async signupHandler(e:any) {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        let reqBody = 
        {
            firstName: firstName,
            email:email,
            password: password
        } 
        let url = 
            "http://localhost:3000/user/create" 
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(json => {
            alert(json.message)
            this.props.updateLocalStorage(json.token)
        })
        .catch(err => console.log(err))
    }

    render() {
        return(
            <div>
                 {this.state.login ? (
          <div>
            <form
              action="#"
              onSubmit={this.signupHandler.bind(this)}
              style={{ fontWeight: 600 }}
            >
              <label htmlFor="firstName">First Name</label>
              <br />
              <input type="text" name="firstName" />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" name="email" />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" name="password" />
              <br />
              <Button>Sign Up</Button>
            </form>
          </div>
        ) : (
          <div>
            <form
              action="#"
              onSubmit={this.submitHandler.bind(this)}
              style={{ fontWeight: 600 }}
            >
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" name="email" />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" name="password" />
              <br />
              <Button>Log in</Button>
            </form>
            <p>Don't have an account?</p>
            <Button onClick={this.startSignUp.bind(this)}>Sign up</Button>
          </div>
        )}
            </div>
        )
    }
}