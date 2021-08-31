import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';
import APIURL from '../../helpers/environment';

type acceptedInputs = {
    sessionToken: any, 
    date: string, 
    overridingGoal: string,
    standUpGoals: string,
    whereDoYouLand:string,
    whatNext: string,
    issues: string,
    allCompPlans: any,
}

export default class CPlanCreate extends React.Component <{},acceptedInputs>{
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            date: "", 
            overridingGoal:"",
            standUpGoals:"",
            whereDoYouLand:"",
            whatNext:"",
            issues:"",
            allCompPlans:[],
        }

        this.handleDate = this.handleDate.bind(this);
        this.handleOverridingGoal = this.handleOverridingGoal.bind(this);
        this.handleStandUp = this.handleStandUp.bind(this);
        this.handleWhereDoYouLand = this.handleWhereDoYouLand.bind(this);
        this.handleWhatNext = this.handleWhatNext.bind(this);
        this.handleIssues = this.handleIssues.bind(this);
    }
    handleDate(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            date: e.target.value
        })
        console.log(this.state.date)
    }
    handleOverridingGoal(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            overridingGoal: e.target.value
        })
        console.log(this.state.overridingGoal)
    }
    handleStandUp(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            standUpGoals: e.target.value
        })
        console.log(this.state.standUpGoals)
    }
    handleWhereDoYouLand(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            whereDoYouLand: e.target.value
        })
        console.log(this.state.whereDoYouLand)
    }
    handleWhatNext(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            whatNext: e.target.value
        })
        console.log(this.state.whatNext)
    }
    handleIssues(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            issues: e.target.value
        })
        console.log(this.state.issues)
    }

    PlanHandler = (e: any) => {
        e.preventDefault();
        const date = this.state.date;
        const overridingGoal = this.state.overridingGoal
        const standUpGoals = this.state.standUpGoals
        const whereDoYouLand = this.state.whereDoYouLand
        const whatNext = this.state.whatNext
        const issues = this.state.issues
        let url = `${APIURL}/cplan/create` 
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                cplan: {
                    date: date,
                    overridingGoal: overridingGoal,
                    standUpGoals: standUpGoals,
                    whereDoYouLand: whereDoYouLand,
                    whatNext: whatNext,
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
        Make a New Competition Plan
        </Typography>
        <Grid className="grid"container spacing={3}>
        <Grid item xs={6} sm={3}>
        <TextField
            onChange={this.handleDate}
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
       onChange={this.handleOverridingGoal}
            value={this.state.overridingGoal}
            type= "text"
            id="overriding goal"
            name="overriding goal"
            label="overriding goal"
            fullWidth
            autoComplete="overriding goal"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
       onChange={this.handleStandUp}
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
          onChange={this.handleWhereDoYouLand}
            value={this.state.whereDoYouLand}
            type= "text"
            id="whereDoYouLand"
            name="whereDoYouLand"
            label="whereDoYouLand"
            fullWidth
            autoComplete="whereDoYouLand"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
         onChange={this.handleWhatNext}
            value={this.state.whatNext}
            type= "text"
            id="whatNext"
            name="whatNext"
            label="whatNext"
            fullWidth
            autoComplete="whatNext"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
         onChange={this.handleIssues}
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
        <Button type="submit" id = "saveplanbutton" style={{backgroundColor: "#C5C6C7"}}>Save</Button>
        </Grid>
    </Grid>
    </div>
    </form>
    </div>
        )
    }

}