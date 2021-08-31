import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Grid, Input,Button} from '@material-ui/core';
import TPlanCreate from './TPlanCreate';

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
    date: string, 
    standUpGoals: string,
    top: string,
    bottom: string,
    issues: string,
    allTrainPlans: any,
    editDate: string,
    editStandUpGoals: string,
    editTop: string,
    editBottom: string,
    editIssues: string,
    open: boolean
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
            allTrainPlans:[],
            editDate: "",
            editStandUpGoals: "",
            editTop: "",
            editBottom: "",
            editIssues: "", 
            open: false 
        }
        this.handleDateEdit = this.handleDateEdit.bind(this);
        this.handleStandUpEdit = this.handleStandUpEdit.bind(this);
        this.handleTopEdit = this.handleTopEdit.bind(this);
        this.handleBottomEdit = this.handleBottomEdit.bind(this);
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
    handleStandUpEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editStandUpGoals: e.target.value
        })
    }
    handleTopEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editTop: e.target.value
        })
    }
    handleBottomEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editBottom: e.target.value
        })
    }
    handleIssuesEdit(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            editIssues: e.target.value
        })
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
    TrainingPlanUpdate = (noteID: number) => {
        const date = this.state.editDate;
        const standUpGoals = this.state.editStandUpGoals
        const top = this.state.editTop
        const bottom = this.state.editBottom
        const issues = this.state.editIssues
        let url = `http://localhost:3000/tplan/update/${noteID}`
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                tplan: {
                    date: date,
                    standUpGoals: standUpGoals,
                    top: top,
                    bottom: bottom,
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

    componentDidMount(){
        {this.TrainingPlanFetcher(this)}
    }
    deleteTrainingPlan = (noteID: number) => {
        const fetch_url = `http://localhost:3000/tplan/delete/${noteID}`;
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

    render(){
        const allPlans = this.state.allTrainPlans;
        return(
            <div>
                <TPlanCreate />
                <br />
                <br />
                <div>
                    {allPlans.map((plan:any, index: number )=>(
                    <div className="mappedresults">
                        <tr key = {index} >
                        <h4>September </h4>
                        <p><b>Date: </b>{plan.date}</p>
                        <p><b>Stand Up: </b>{plan.standUpGoals}</p>
                        <p><b>Goal on top:</b> {plan.top}</p>
                        <p><b>Goal on Bottom:</b> {plan.bottom}</p>
                        <p><h4>What Issues are you encountering? </h4>{plan.issues}</p>
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
                        <form >
                        <h2 id="">Edit Plan</h2>
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
                        onChange={this.handleStandUpEdit}
                        value={this.state.editStandUpGoals}
                        type="text"
                        id="standUp"
                        name="standUp"
                        fullWidth
                        autoComplete="standUp" />
                        </Grid>
                        <Grid item>
                        <Input
                        onChange={this.handleTopEdit}
                        value={this.state.editTop}
                        type="text"
                        id="top"
                        name="top"
                        fullWidth
                        autoComplete="top" />
                        </Grid>
                        <Grid item>
                        <Input
                        onChange={this.handleBottomEdit}
                        value={this.state.editBottom}
                        type="text"
                        id="bottom"
                        name="bottom"
                        fullWidth
                        autoComplete="bottom" />
                        </Grid>
                        <Grid item>
                        <Input
                        onChange={this.handleIssuesEdit}
                        value={this.state.editIssues}
                        type="text"
                        id="issues"
                        name="issues"
                        fullWidth
                        autoComplete="issues" />
                        </Grid>
                        <Button type= "submit" onClick={()=> this.TrainingPlanUpdate(plan.id)} style={{backgroundColor: "#66FCF1"}}>Update</Button>
        
        {/* <Button onClick={()=> this.TrainingPlanUpdate(plan.id)}>Update</Button> */}
        
                        </p>
                        </form>
                        </div>
                        </Modal></p>
                        <p><Button onClick={()=> this.deleteTrainingPlan(plan.id)} style={{color: "white", backgroundColor: "#1F2833"}}>Delete</Button></p>
                        < hr />
                        </tr>
                    </div> 
                    ))}
                </div>
            </div>
        )
    }
}
