import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Grid, Button, Input} from '@material-ui/core';
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
    sessionToken: any, // come back to this - any needs to be more specific
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
     index?:any 
    }

// const classes = useStyles();
// getModalStyle is not a pure function, we roll the style only on the first render
// const [modalStyle] = React.useState(getModalStyle);
// const [open, setOpen] = React.useState(false);

export default class SimpleModal extends React.Component <props, acceptedInputs> {
    constructor(props: any) {
        super(props)
        // const arrayObj = this.props.allNotes[0]
        this.state = {
            sessionToken: localStorage.getItem('token'),
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
        // this.NoteUpdate = this.NoteUpdate.bind(this);
        this.Fuck = this.Fuck.bind(this);
    }
 
    Fuck () {
        const allNotes = this.props.allNotes
        const ID = allNotes[0].id
        console.log(this.props.index, "index")
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

NoteUpdate = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allNotes = this.props.allNotes
    const ID = allNotes[0].id
    const date = this.state.editDate;
    const instructor= this.state.editInstructor
    const technique =this.state.editTechnique
    const notes= this.state.editNotes
    let url = `http://localhost:3000/notes/update/${ID}`
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


render() {
  return (
    <div >
      <button type="button" onClick={this.handleOpen}>
        Update
      </button>
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="mappedresults">
        <form onSubmit={this.NoteUpdate}  >
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
        <Button type= "submit" style={{backgroundColor: "#66FCF1"}}>Update</Button>
        {/* <Button onClick={this.Fuck}>Update</Button> */}
        
      </p>
      </form>
    </div>
      </Modal>
    </div>
  );
}
}


