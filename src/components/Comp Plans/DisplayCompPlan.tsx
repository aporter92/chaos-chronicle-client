import React from 'react';
import {Button} from '@material-ui/core';
import CPlanCreate from './CPlanCreate';
import Modal from '@material-ui/core/Modal';

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
                <CPlanCreate />
                <br />
                <br />
                <div>
                    {allPlans.map((allPlans: any)=>(
                    <div className="mappedresults">
                        <tr key = {allPlans.id} >
                        <h5>Pan Americans: September 3</h5>
                        <p><b>Date: </b>{allPlans.date}</p>
                        <p><b>Overriding Goal: </b>{allPlans.overridingGoal}</p>
                        <p><b>Stand Up: </b> {allPlans.standUpGoals}</p>
                        <p><b>Where do you land?</b> {allPlans.whereDoYouLand}</p>
                        <p><b>What Next?</b> {allPlans.whatNext}</p>
                        <p><b>What issues are you encountering? </b>{allPlans.issues}</p>
                        <p><Button style={{backgroundColor: "#C5C6C7"}} >Update</Button></p>
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
