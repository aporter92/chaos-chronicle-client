import React from 'react';
import {Button} from '@material-ui/core'
import NoteCreate from './NoteCreate';
import {TextField, Grid, Typography, Input} from '@material-ui/core';
type acceptedInputs = {
    sessionToken: any
    date: string,
    instructor: string,
    technique: string,
    notes: string,
    allNotes?: any,
    editDate: string,
    editInstructor: string,
    editTechnique: string,
    editNotes: string
}
export default class NoteDisplay extends React.Component <any,acceptedInputs>{
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            date: "",
            instructor: "",
            technique: "",
            notes: "",
            allNotes: [],
            editDate: "",
            editInstructor: "",
            editTechnique: "",
            editNotes: "", 
        }
    }
    

    NoteFetcher = (e: any) => {
        let url = "http://localhost:3000/notes/"
        fetch(url, {
            method: "GET",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.state.sessionToken
            })
        })
        .then(res => res.json())
        .then((data)=>{
            (this.setState({allNotes: data}))
            // console.log(this.state.allNotes)
        })
    }
    
    componentDidMount(){
        {this.NoteFetcher(this)}
    }
    // New attempt at PUT
    NoteUpdate = () => {
        const date = this.state.editDate;
        const instructor= this.state.editInstructor
        const technique =this.state.editTechnique
        const notes= this.state.editNotes
        let url = "http://localhost:3000/notes//update/:id"
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                notes: {
                    date: date,
                    instructor: instructor,
                    technique: technique,
                    notes: notes
                }
            }),
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.state.sessionToken
            }),
        })
        .then((res) => this.NoteFetcher(this));
        
    }
    //
    render() {
        const allNotes = this.state.allNotes;
        return(
            <div>
                <NoteCreate />
                <br />
            <div className="wrapper">
                {allNotes.map((allNotes:any )=> (
                    <div className="mappedresults">
                    <tr key = {allNotes.id} >
                        <h5>Date: {allNotes.date}</h5>
                        {/* <p>Date: {allNotes.date}</p> */}
                        <p>Instructor: {allNotes.instructor}</p>
                        <p>Technique: {allNotes.technique}</p>
                        <p><h5>Details:</h5>{allNotes.notes}</p>
                        <p><Button style={{backgroundColor: "#45A29E"}} >Update</Button></p>
                        <p><Button style={{color: "white", backgroundColor: "#1F2833"}}>Delete</Button></p>
                        <hr />
                    </tr>
                    </div>
                ))}
                
                {/* <Button type="submit" style={{position: "static", backgroundColor: "#66FCF1"}} onClick={this.NoteFetcher.bind(this)}>Show my Class Notes</Button> */}
            </div>
            
            </div>
        )
    }
}











