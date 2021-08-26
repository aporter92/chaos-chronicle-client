import React from 'react';
import {Button} from '@material-ui/core'
import NoteCreate from './NoteCreate';
import NoteUpdate from './NoteUpdate';
type acceptedInputs = {
    sessionToken: any
    date: string,
    instructor: string,
    technique: string,
    notes: string,
    allNotes?: any
}
export default class NoteDisplay extends React.Component <{},acceptedInputs>{
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            date: "",
            instructor: "",
            technique: "",
            notes: "",
            allNotes: []
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

    render() {
        const allNotes = this.state.allNotes;
        return(
            <div>
                <NoteCreate />
                <br />
                <NoteUpdate />
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
                        <p><Button style={{backgroundColor: "#66FCF1"}}>Delete</Button></p>
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











