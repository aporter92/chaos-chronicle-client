import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';

export default class NoteCreate extends React.Component <{},any>{
    constructor(props: any) {
        super(props)
        this.state = {
           sessionToken: localStorage.getItem('token'),
            date: "",
            instructor: "",
            technique: "",
            notes: "", 
        }

        // this.handleDateChange = this.handleDateChange.bind(this);
        // this.handleInstructorChange = this.handleInstructorChange.bind(this);
        // this.handleTechniqueChange = this.handleTechniqueChange.bind(this);
        // this.handleNotesChange = this.handleNotesChange.bind(this);
    }

NoteHandler = (e: any) => {
    e.preventDefault();
    const date = this.state.date;
    const instructor= this.state.instructor
    const technique =this.state.technique
    const notes= this.state.notes
    let url = "http://localhost:3000/notes/create" 
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            notes: {
                date: date,
                instructor:instructor,
                technique: technique,
                notes: notes
            }
        }),
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.state.sessionToken
            
        })
    })
    .then((res) => res.json())
    .then((json) => 
    console.log(json)
    )
    .catch((err) => console.log(err));
}

render() {
    return(
        <div>

        </div>
    )
}
}