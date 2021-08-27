import React from 'react';
import {TextField, Grid, Typography, Button} from '@material-ui/core';

type acceptedInputs = {
    sessionToken: any, // come back to this - any needs to be more specific
    date: string, 
    standUpGoals: string,
    top: string,
    bottom: string,
    issues: string,
    allTrainPlans: any
}

export default class TrainPlanDisplay extends React.Component <any,acceptedInputs> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            date: "", 
            standUpGoals: "",
            top: "",
            bottom:"",
            issues: "",
            allTrainPlans:[] 
        }
    }

    TrainingPlanFetcher = (e: any) => {
        let url = "http://localhost:3000/tplan/"
        fetch(url, {
            method: "GET",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.state.sessionToken
            })
        })
        .then(res => res.json())
        .then((data)=>{
            (this.setState({allTrainPlans: data}))
            console.log(this.state.allTrainPlans)
        })
    }

    componentDidMount(){
        {this.TrainingPlanFetcher(this)}
    }

    render(){
        const allPlans = this.state.allTrainPlans;
        return(
            <div>
                <div>
                    {allPlans.map((allPlans: any)=>(
                    <div className="mappedresults">
                        <tr key = {allPlans.id} >
                        <h4>October </h4>
                        <p><b>Date: </b>{allPlans.date}</p>
                        <p><b>Overriding Goal: </b>{allPlans.standUpGoals}</p>
                        <p><b>Goal on top:</b> {allPlans.top}</p>
                        <p><b>Goal on Bottom:</b> {allPlans.bottom}</p>
                        <p><h4>What Issues are you encountering? </h4>{allPlans.issues}</p>
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
