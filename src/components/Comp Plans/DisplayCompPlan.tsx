import React from 'react';
import {Button, Grid, Input} from '@material-ui/core';
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
    allPlans: any,
    open: boolean,
    editDate: string,
    editOverridingGoal:string,
    editStandUpGoals: string,
    editWhereDoYouLand: string,
    editWhatNext: string,
    editIssues: string,
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
            allPlans:[],
            editDate: "",
            editOverridingGoal: "",
            editStandUpGoals: "",
            editWhereDoYouLand: "",
            editWhatNext: "",
            editIssues: "",
            open: false  
        }
        this.handleDateEdit = this.handleDateEdit.bind(this);
        this.handleOverridingGoalEdit = this.handleOverridingGoalEdit.bind(this);
        this.handleStandUpEdit = this.handleStandUpEdit.bind(this);
        this.handleWhereDoYouLandEdit = this.handleWhereDoYouLandEdit.bind(this);
        this.handleWhatNextEdit = this.handleWhatNextEdit.bind(this);
        this.handleIssuesEdit = this.handleIssuesEdit.bind(this);
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
    handleOverridingGoalEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editOverridingGoal: e.target.value
        })
    }
    handleStandUpEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editStandUpGoals: e.target.value
        })
    }
    handleWhereDoYouLandEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editWhereDoYouLand: e.target.value
        })
    }
    handleWhatNextEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editWhatNext: e.target.value
        })
    }
    handleIssuesEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editIssues: e.target.value
        })
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
    CompPlanUpdate = (planId: number) => {
        const date = this.state.editDate;
        const overridingGoal = this.state.editOverridingGoal
        const standUpGoals = this.state.editStandUpGoals
        const whereDoYouLand = this.state.editWhereDoYouLand
        const whatNext = this.state.editWhatNext
        const issues = this.state.editIssues
        let url = `http://localhost:3000/cplan/update/${planId}`
        fetch(url, {
            method: "PUT",
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
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.state.sessionToken
            }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    deleteCompPlan = (planId: number) => {
        const fetch_url = `http://localhost:3000/cplan/delete/${planId}`;
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
                    {allPlans.map((plan:any, index: number)=>(
                    <div className="mappedresults">
                        <tr key = {index} >
                        <h5>Pan Americans: September 3</h5>
                        <p><b>Date: </b>{plan.date}</p>
                        <p><b>Overriding Goal: </b>{plan.overridingGoal}</p>
                        <p><b>Stand Up: </b> {plan.standUpGoals}</p>
                        <p><b>Where do you land?</b> {plan.whereDoYouLand}</p>
                        <p><b>What Next?</b> {plan.whatNext}</p>
                        <p><b>What issues are you encountering? </b>{plan.issues}</p>
                        <p><Button type="button" className="notesmodalbutton" style={{backgroundColor: "#C5C6C7"}} onClick={this.handleOpen}>
                            Update
                        </Button>
                        <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <div className="modal">
                        <form >
                        <h2 id="">Edit Plan</h2>
                        <p id="simple-modal-description">
        
                        <Grid item>
                            <h5>date:</h5>
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
                        <h5>Overriding Goal:</h5>
                        <Input
                        onChange={this.handleOverridingGoalEdit}
                        value={this.state.editOverridingGoal}
                        type="text"
                        id="overridingGoal"
                        name="overridingGoal"
                        fullWidth
                        autoComplete="overridingGoal" />
                        </Grid>
                        <Grid item>
                        <h5>Stand Up Goal:</h5>
                        <Input
                        onChange={this.handleStandUpEdit}
                        value={this.state.editStandUpGoals}
                        type="text"
                        id="standUp"
                        name="standUp"
                        fullWidth
                        autoComplete="standUp" />
                        </Grid>
                        <Grid item>
                        <h5>Where Do You Land?</h5>
                        <Input
                        onChange={this.handleWhereDoYouLandEdit}
                        value={this.state.editWhereDoYouLand}
                        type="text"
                        id="whereDoYouLand"
                        name="whereDoYouLand"
                        fullWidth
                        autoComplete="whereDoYouLand" />
                        </Grid>
                        <Grid item>
                        <h5>What Next?</h5>
                        <Input
                        onChange={this.handleWhatNextEdit}
                        value={this.state.editWhatNext}
                        type="text"
                        id="whatNext"
                        name="whatNext"
                        fullWidth
                        autoComplete="whatNext" />
                        </Grid>
                        <Grid item>
                        <h5>Issues:</h5>
                        <Input
                        onChange={this.handleIssuesEdit}
                        value={this.state.editIssues}
                        type="text"
                        id="issues"
                        name="issues"
                        fullWidth
                        autoComplete="issues" />
                        </Grid>
                        <Button type= "submit" onClick={()=> this.CompPlanUpdate(plan.id)} style={{backgroundColor: "#66FCF1"}}>Update</Button>
                        </p>
                        </form>
                        </div>
                        </Modal></p>
                        <p><Button onClick={()=> this.deleteCompPlan(plan.id)} style={{color: "white", backgroundColor: "#1F2833"}}>Delete</Button></p>
                        {/* <p><Button style={{backgroundColor: "#C5C6C7"}} >Update</Button></p>
                        <p><Button style={{color: "white", backgroundColor: "#1F2833"}}>Delete</Button></p> */}
                        < hr />
                        </tr>
                    </div> 
                    ))}
                </div>
            </div>
        )
    }
}
