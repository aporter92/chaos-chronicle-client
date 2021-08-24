import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';
type acceptedInputs = {
    sessionToken?: string
}

export default class NoteCreate extends React.Component <acceptedInputs, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            date: "",
            instructor: "",
            technique: "",
            notes: ""
        }
    }

    handleDateChange(e: any) {
        this.setState({date: e.target.value})
    }
    handleInstructorChange(e: any) {
        this.setState({instructor: e.target.value})
    }
    handleTechniqueChange(e: any) {
        this.setState({technique: e.target.value})
    }
    handleNotesChange(e: any) {
        this.setState({notes: e.target.value})
    }

    async NoteHandler(e: any) {
        e.preventDefault();
        const date = e.target.value;
        const instructor= e.target.value;
        const technique = e.target.value;
        const notes= e.target.value;
        let reqBody = 
        {
           date: date,
           instructor: instructor,
           technique: technique,
           notes: notes
        } 
        
        let url = 
            "http://localhost:3000/notes/create" 
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.state.sessionToken,
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
            <form onSubmit={this.NoteHandler}>
            <div className = "notesform" text-align="center">
            <Typography variant="h6" style= {{color: "black"}}gutterBottom>
        Class Notes
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
        <TextField
            
            value={this.state.date}
            onChange={this.handleDateChange.bind(this)}
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
            required
            value={this.state.instructor}
            onChange={this.handleInstructorChange.bind(this)}
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
            required
            value={this.state.technique}
            onChange={this.handleTechniqueChange.bind(this)}
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
            required
            value={this.state.notes}
            onChange={this.handleNotesChange.bind(this)}
            type= "text"
            id="Notes"
            name="Notes"
            label="Notes"
            fullWidth
            autoComplete="Notes"
        />
        </Grid>
    </Grid>
    <div id = "buttonparent">
    <Button type="submit" id = "savenotesbutton" style={{backgroundColor: "#66FCF1"}}>Save</Button>
    </div>
    </div>
    </form>
        )
    }
}