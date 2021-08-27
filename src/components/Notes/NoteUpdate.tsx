import React from 'react';
import {TextField, Grid, Typography, Button, Input, FormLabel} from '@material-ui/core';

type acceptedInputs = {
    sessionToken: any, // come back to this - any needs to be more specific
    editDate: string,
    editInstructor: string,
    editTechnique: string,
    editNotes: string,
}

export default class NoteUpdate extends React.Component <{},acceptedInputs> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            editDate: "",
            editInstructor: "",
            editTechnique: "",
            editNotes: "", 
        }
        this.handleDateEdit = this.handleDateEdit.bind(this);
        this.handleInstructorEdit = this.handleInstructorEdit.bind(this);
        this.handleTechniqueEdit = this.handleTechniqueEdit.bind(this);
        this.handleNotesEdit = this.handleNotesEdit.bind(this);
    }
    
    handleDateEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editDate: e.target.value
        })
    }
    handleInstructorEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editInstructor: e.target.value
        })
    }
    handleTechniqueEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editTechnique: e.target.value
        })
    }
    handleNotesEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editNotes: e.target.value
        })
    }
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
        .then((res) => res.json())
        .then((json) => console.log(json.message))
        .catch((err) => console.log(err));
    }
    render(){
        return(
            <div>
                <form onSubmit={this.NoteUpdate}>
            <div className = "notesform" text-align="center">
            <Typography variant="h6" style= {{color: "black"}}gutterBottom>
        Edit Notes:
        </Typography>
        <Grid className="grid"container spacing={3}>
        <Grid item xs={6} sm={3}>
        <Input
            onChange={this.handleDateEdit}
            value={this.state.editDate}
            type="text"
            id="Date"
            name="Date"
            fullWidth
            autoComplete="todays-date"
        />
        </Grid>
        <Grid item xs={6} sm={3}>
        <TextField
       onChange={this.handleInstructorEdit}
            value={this.state.editInstructor}
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
          onChange={this.handleTechniqueEdit}
            value={this.state.editTechnique}
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
         onChange={this.handleNotesEdit}
            value={this.state.editNotes}
            type= "text"
            id="Notes"
            name="Notes"
            label="Notes"
            fullWidth
            autoComplete="Notes"
        />
        </Grid>
        <Grid>
        <Button type="submit" style={{backgroundColor: "#66FCF1"}}>Update</Button>
        </Grid>
    </Grid>
    </div>
    </form>
            </div>
        )
    }
}

// export default class NoteUpdate extends React.Component <{},any> {
//         constructor(props: any) {
//             super(props)
//             this.state = {
//             sessionToken: localStorage.getItem('token'),
//             editDate: "",
//             editInstructor: "",
//             editTechnique: "",
//             editNotes: "", 
//         }
// }
//     NoteUpdate = () => {
//         const date = this.state.editDate;
//         const instructor= this.state.editInstructor
//         const technique =this.state.editTechnique
//         const notes= this.state.editNotes
//         let url = "http://localhost:3000/notes//update/:id"
//         fetch(url, {
//             method: "PUT",
//             body: JSON.stringify({
//                 notes: {
//                     date: date,
//                     instructor: instructor,
//                     technique: technique,
//                     notes: notes
//                 }
//             }),
//             headers: new Headers ({
//                 "Content-Type": "application/json",
//                 "Authorization": this.state.sessionToken
//             }),
//         })
//         // .then((res) => this.props.NoteFetcher())
        
//     }
