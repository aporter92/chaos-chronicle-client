import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';

type acceptedInputs = {
    sessionToken: any, // come back to this - any needs to be more specific
    date: string, 
    overridingGoal: string,
    standUpGoals: string,
    whereDoYouLand:string,
    whatNext:string,
    issues:string,
    allPlans: any
}

export default class CompPlanDisplay extends React.Component <any,acceptedInputs> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            date: "", 
            overridingGoal: "",
            standUpGoals: "",
            whereDoYouLand: "",
            whatNext:"",
            issues: "",
            allPlans:[] 
        }
    }

    CompPlanFetcher = (e: any) => {
        let url = "http://localhost:3000/cplan/"
        fetch(url, {
            method: "GET",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.state.sessionToken
            })
        })
        .then(res => res.json())
        .then((data)=>{
            (this.setState({allPlans: data}))
            console.log(this.state.allPlans)
        })
    }

    componentDidMount(){
        {this.CompPlanFetcher(this)}
    }

    render(){
        const allPlans = this.state.allPlans;
        return(
            <div>
                <div>
                    {allPlans.map((allPlans: any)=>(
                    <div className="mappedresults">
                        <tr key = {allPlans.id} >
                        <h5>Pan Americans: September 3</h5>
                        <p>Date: {allPlans.date}</p>
                        <p>Overriding Goal: {allPlans.overridingGoal}</p>
                        <p>Stand Up: {allPlans.standUpGoals}</p>
                        <p>Where do you land? {allPlans.whereDoYouLand}</p>
                        <p>What Next? {allPlans.whatNext}</p>
                        <p>What issues are you encountering? {allPlans.issues}</p>
                        <p><Button style={{backgroundColor: "#45A29E"}} >Update</Button></p>
                        <p><Button style={{color: "white", backgroundColor: "#1F2833"}}>Delete</Button></p>
                        < hr />
                        </tr>
                    </div> 
                    ))}
                </div>
            </div>
        )
    }
}
