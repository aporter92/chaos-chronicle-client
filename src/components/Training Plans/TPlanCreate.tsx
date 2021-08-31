import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';
import APIURL from '../../helpers/environment';
type acceptedInputs = {
    sessionToken: any, 
    date: string, 
    standUpGoals: string,
    top: string,
    bottom: string,
    issues: string,
    allTrainPlans: any,
}
export default class TPlanCreate extends React.Component <{},acceptedInputs>{
    constructor(props: any) {
        super(props)
        this.state = {
           sessionToken: localStorage.getItem('token'),
            date: "",
            standUpGoals: "",
            top: "",
            bottom:"",
            issues: "",
            allTrainPlans:[],
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStandUpChange = this.handleStandUpChange.bind(this);
        this.handleTopChange = this.handleTopChange.bind(this);
        this.handleBottomChange = this.handleBottomChange.bind(this);
        this.handleIssuesChange = this.handleIssuesChange.bind(this);
    }

    handleDateChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            date: e.target.value
        })
        console.log(this.state.date)
    }
    handleStandUpChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            standUpGoals: e.target.value
        })
        console.log(this.state.standUpGoals)
    }
    handleTopChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            top: e.target.value
        })
        console.log(this.state.top)
    }
    handleBottomChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            bottom: e.target.value
        })
        console.log(this.state.bottom)
    }
    handleIssuesChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            issues: e.target.value
        })
        console.log(this.state.issues)
    }

    PlanHandler = (e: any) => {
        e.preventDefault();
        const date = this.state.date;
        const standUpGoals = this.state.standUpGoals
        const top = this.state.top
        const bottom = this.state.bottom
        const issues = this.state.issues
        let url = `${APIURL}/tplan/create` 
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                tplan: {
                    date: date,
                    standUpGoals: standUpGoals,
                    top: top,
                    bottom: bottom,
                    issues: issues
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
            <form onSubmit={this.PlanHandler}>
            <div className = "notesform" text-align="center">
            <Typography variant="h6" style= {{color: "black"}}gutterBottom>
        Make a New Training Plan
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
        <Grid item xs={12}>
        <TextField
       onChange={this.handleStandUpChange}
            value={this.state.standUpGoals}
            type= "text"
            id="standUpGoals"
            name="standUpGoals"
            label="standUpGoals"
            fullWidth
            autoComplete="standUpGoals"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          onChange={this.handleTopChange}
            value={this.state.top}
            type= "text"
            id="top"
            name="top"
            label="top"
            fullWidth
            autoComplete="top"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
         onChange={this.handleBottomChange}
            value={this.state.bottom}
            type= "text"
            id="bottom"
            name="bottom"
            label="bottom"
            fullWidth
            autoComplete="bottom"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
         onChange={this.handleIssuesChange}
            value={this.state.issues}
            type= "text"
            id="issues"
            name="issues"
            label="issues"
            fullWidth
            autoComplete="issues"
        />
        </Grid>
        <Grid>
        <Button type="submit" id = "savetplanbutton" style={{backgroundColor: "#C5C6C7"}}>Save</Button>
        </Grid>
    </Grid>
    </div>
    </form>
    </div>
        )
    }
}










