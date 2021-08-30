import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';

type acceptedInputs = {
    sessionToken: any, // come back to this - any needs to be more specific
    title: string,
    link: string,
}
export default class VideoUpload extends React.Component <{},acceptedInputs>{
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            title: "",
            link: ""
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handleLink = this.handleLink.bind(this);
    }

    handleTitle(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            title: e.target.value
        })
        console.log(this.state.title)
    }
    handleLink(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            link: e.target.value
        })
        console.log(this.state.link)
    }

VideoHandler = (e:any) => {
    e.preventDefault();
    const title = this.state.title;
    const link= this.state.link
    let url = "http://localhost:3000/video/upload" 
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            video: {
                title: title,
                link: link
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
            <form >
            <div className = "notesform" text-align="center">
            <Typography variant="h6" style= {{color: "black"}}gutterBottom>
        Videos:
        </Typography>
        <Grid className="grid"container spacing={3}>
        <Grid item xs={6} sm={3}>
        <TextField
            onChange={this.handleTitle}
            value={this.state.title}
            type="text"
            id="title"
            name="title"
            label="title"
            fullWidth
            autoComplete="title"
        />
        </Grid>
        <Grid item xs={6} sm={3}>
        <TextField
       onChange={this.handleLink}
            value={this.state.link}
            type= "text"
            id="link"
            name="link"
            label="link"
            fullWidth
            autoComplete="link"
        />
        </Grid>
        
        <Grid item xs={9} sm={3}>
        <br />
        <Button id = "uploadbutton" onClick={this.VideoHandler} style={{backgroundColor: "#66FCF1"}}>Upload</Button>
        </Grid>
    </Grid>
            </div>
            </form>
        </div>
    )
}
}