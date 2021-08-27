import React from 'react';
import {Modal, Grid, Typography, Button, Input} from '@material-ui/core';
import SimpleModal from './TestModal';


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
        let url = "http://localhost:3000/notes/update/:id"
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
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
    }
    render(){
        return(
            <div className = "notesform" text-align="center">
                {/* <SimpleModal /> */}
            </div>
        )
    }
}

