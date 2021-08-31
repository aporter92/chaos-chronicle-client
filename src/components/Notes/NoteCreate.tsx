import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';
type acceptedInputs = {
    sessionToken: any, // come back to this - any needs to be more specific
    date: string,
    instructor: string,
    technique: string,
    notes: string,
}
export default class NoteCreate extends React.Component <{},acceptedInputs>{
    constructor(props: any) {
        super(props)
        this.state = {
           sessionToken: localStorage.getItem('token'),
            date: "",
            instructor: "",
            technique: "",
            notes: "", 
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInstructorChange = this.handleInstructorChange.bind(this);
        this.handleTechniqueChange = this.handleTechniqueChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
    }

    handleDateChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            date: e.target.value
        })
        console.log(this.state.date)
    }
    handleInstructorChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            instructor: e.target.value
        })
        console.log(this.state.instructor)
    }
    handleTechniqueChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            technique: e.target.value
        })
        console.log(this.state.technique)
    }
    handleNotesChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            notes: e.target.value
        })
        console.log(this.state.notes)
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
            <div className = "newDiv">
            <form onSubmit={this.NoteHandler}>
            <div className = "notesform" text-align="center">
            <Typography variant="h6" style= {{color: "black"}}gutterBottom>
        Class Notes
        </Typography>
        <Grid className="grid"container spacing={3}>
        <Grid item xs={6} sm={3}>
        <TextField
            onChange={this.handleDateChange}
            value={this.state.date}
            type="text"
            id="Date"
            name="Date"
            label="Date"
            fullWidth
            autoComplete="todays-date"
        />
        </Grid>
        <Grid item xs={6} sm={3}>
        <TextField
       onChange={this.handleInstructorChange}
            value={this.state.instructor}
            type= "text"
            id="Instructor"
            name="Instructor"
            label="Instructor"
            fullWidth
            autoComplete="Instructor"
        />
        </Grid>
        <Grid item xs={6} sm={3}>
        <TextField
          onChange={this.handleTechniqueChange}
            value={this.state.technique}
            type= "text"
            id="Technique"
            name="Technique"
            label="Technique"
            fullWidth
            autoComplete="Technique"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
         onChange={this.handleNotesChange}
            value={this.state.notes}
            type= "text"
            id="Notes"
            name="Notes"
            label="Notes"
            fullWidth
            autoComplete="Notes"
        />
        </Grid>
        <Grid>
        <Button type="submit" id = "savenotesbutton" style={{backgroundColor: "#C5C6C7"}}>Save</Button>
        </Grid>
    </Grid>
    </div>
    </form>
    </div>
        )
    }
}










