import React from 'react';
import NoteCreate from './NoteCreate';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Grid, Input, Button} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  
      return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      };
  }
  
  const useStyles = makeStyles((theme: Theme) =>
      createStyles({
      paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      },
    }),
  );

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
    editNotes: string,
    open: boolean
}
type props = {
    sessionToken?: any, 
    date?: string, 
    instructor?: string, 
    technique?: string, 
    notes?: string, 
    allNotes?: any, 
    editDate?: string,
    editInstructor?: string, 
    editTechnique?: string, 
    editNotes?: string,
    
   }
export default class NoteDisplay extends React.Component <props,acceptedInputs>{
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
            open: false,
        }
        this.handleDateEdit = this.handleDateEdit.bind(this);
        this.handleInstructorEdit = this.handleInstructorEdit.bind(this);
        this.handleTechniqueEdit = this.handleTechniqueEdit.bind(this);
        this.handleNotesEdit = this.handleNotesEdit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen () {
        this.setState({open: true})
      };
    
      handleClose () {
        this.setState({open: false});
      };
    
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
        })
    }
    
    componentDidMount(){
        {this.NoteFetcher(this)}
    }

    NoteUpdate = (noteID: number) => {
        const date = this.state.editDate;
        const instructor= this.state.editInstructor
        const technique =this.state.editTechnique
        const notes= this.state.editNotes
        let url = `http://localhost:3000/notes/update/${noteID}`
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
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
   
    deleteNote = (noteID: number) => {
        const fetch_url = `http://localhost:3000/notes/delete/${noteID}`;
        fetch(fetch_url, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.state.sessionToken,
          }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => {
          console.error(err);
        });
        
    };
    
    render() {
        const allNotes = this.state.allNotes;
        return(
            <div>
                <NoteCreate />
                <br />
                <br />
            <div className="wrapper">
                {allNotes.map((note:any, index: number )=> (
                    <div className="mappedresults">
                    <Grid key = {index} >
                        <h5>Date: {note.date}</h5>
                        <p><b>Instructor: </b>{note.instructor} <b>Technique:</b> {note.technique}</p>
                        <p><h5>Details:</h5>{note.notes}</p>
                        <p><Button type="button" className="notesmodalbutton" style={{backgroundColor: "#C5C6C7"}} onClick={this.handleOpen}>
                        Update
                        </Button>
                        <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <div className="mappedresults">
                        <form  >
                        <h2 id="">Edit Notes</h2>
                        <p id="simple-modal-description">
        
                        <Grid item>
                        <Input
                        onChange={this.handleDateEdit}
                        value={this.state.editDate}
                        type="text"
                        id="Date"
                        name="Date"
                        fullWidth
                        autoComplete="todays-date" />
                        </Grid>
                        <Grid item>
                        <Input
                        onChange={this.handleInstructorEdit}
                        value={this.state.editInstructor}
                        type="text"
                        id="instructor"
                        name="instructor"
                        fullWidth
                        autoComplete="instructor" />
                        </Grid>
                        <Grid item>
                        <Input
                        onChange={this.handleTechniqueEdit}
                        value={this.state.editTechnique}
                        type="text"
                        id="technique"
                        name="technique"
                        fullWidth
                        autoComplete="technique" />
                        </Grid>
                        <Grid item>
                        <Input
                        onChange={this.handleNotesEdit}
                        value={this.state.editNotes}
                        type="text"
                        id="notes"
                        name="notes"
                        fullWidth
                        autoComplete="notes" />
                        </Grid>
                        <Button onClick={()=> this.NoteUpdate(note.id)} style={{backgroundColor: "#66FCF1"}}>Update</Button>
                        </p>
                        </form>
                        </div>
                        </Modal></p>
                        <p><Button onClick={()=> this.deleteNote(note.id)} style={{color: "white", backgroundColor: "#1F2833"}}>Delete</Button></p>
                        <hr />
                    </Grid>
                    </div>
                ))}
                
                {/* <Button type="submit" style={{position: "static", backgroundColor: "#66FCF1"}} onClick={this.NoteFetcher.bind(this)}>Show my Class Notes</Button> */}
            </div>
            
            </div>
        )
    }
}











