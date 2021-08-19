// import React from 'react';

// type LoginState = {
//     firstName: String,
//     email: String,
//     password: String,
//     login: boolean,
// }

// export default class Login extends React.Component <any, LoginState> {
//     constructor(props: any) {
//         super(props);

//         this.state = {
//             firstName: "",
//             email: "",
//             password: "",
//             login: true
//         }

//         this.firstName = this.firstName.bind(this);
//         this.email = this.email.bind(this);
//         this.password = this.password.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     signUpFields() {
    
//     }

//     firstName() {
//         this.setState({
//             firstName : new String
//         })
//     }

//     email() {
//         this.setState({
//             email: new String
//         })
//     }

//     password() {
//         this.setState({
//             password: new String
//         })
//     }

//     componentWillMount() {
//         this.firstName
//         this.email
//         this.password
//     };


//    handleSubmit(event: any) {
//         console.log("form submitted");
//         event.preventDefault()
//         let reqBody = login ?
//             {
//                 email:this.email,
//                 password: this.password
//             } : {
//                 firstName: this.firstName,
//                 email: this.email,
//                 password: this.password
//             }

//         let url = login ?
//             "http://localhost:3000/user/login" :
//             "http://localhost:3000/user/register"

//         fetch(url, {
//             method: "POST",
//             body: JSON.stringify(reqBody),
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         })
//         .then(response => response.json())
//         .then(json => {
//             alert(json.message)
//             this.props.updateLocalStorage(json.token)
//         })
//         .catch(err => console.log(err))

//     }
//     handleChange(event: any) {
//         this.setState({
//            [event.target.name] : event.target.value
//         })
//     }

//     render() {
//         return (<div>
//             <form onSubmit={this.handleSubmit}>
//             <input type = "name" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required />
//                 <input type = "email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
//                 <input type = "password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
//                 <button type = "submit">Register</button>
//             </form>
//              </div>)
//     }
// }

import React, {useState} from 'react';


const Login = (props: any) => {
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(true)
    const [login, setLogin] = useState(true)
    
    const title = () => {
        return !login ? "Sign Up" : "Welcome Back!"
    }

    const loginToggle = (e: any) => {
        e.preventDefault()

        setLogin(!login)

        setFirstName("")
        setEmail("")
        setPassword("")

    }
// Sign Up
    const signupFields = () => !login ?
    (
        <div>
            <br />
            <input placeholder="first name" type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <br />
        </div>
    ) : null

    const handleSubmit = (event: any) => {
        event.preventDefault()

        let reqBody = login ?
            {
                email:email,
                password: password
            } : {
                firstName: firstName,
                email: email,
                password: password
            }

        let url = login ?
            "http://localhost:3000/user/login" :
            "http://localhost:3000/user/register"

        fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(json => {
            alert(json.message)
            props.updateLocalStorage(json.token)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <br />
            <form className="login-container">
                <h1>{title()}</h1>
                {signupFields()}
                <br />
                <input placeholder="email" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <br />
                <input placeholder="password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                <button className="button login-button" type="submit" onClick={handleSubmit}><b>Submit</b></button>
                <br />
                <br />
                <button className="button login-button" onClick={loginToggle}><b>Login | Sign Up</b></button>
            </form>
        </div>
    )
}

export default Login

