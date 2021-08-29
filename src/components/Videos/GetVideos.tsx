import React from 'react';
import {Grid, Input, Button} from '@material-ui/core';
import YouTubeEmbed from './YouTubeEmbed';

type acceptedInputs = {
    sessionToken: any, // come back to this - any needs to be more specific
    title: string,
    link: string,
    allVideos: any
}
type props = {
    sessionToken?: any, 
    date?: string, 
    allPlans?: any, 
   }
export default class VideoDisplay extends React.Component <props,acceptedInputs> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            title: "",
            link: "",
            allVideos:[] 
        }
    }
    VideoFetcher = (e: any) => {
        let url = "http://localhost:3000/video/"
        fetch(url, {
            method: "GET",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.state.sessionToken
            })
        })
        .then(res => res.json())
        .then((data)=>{
            (this.setState({allVideos: data}))
        })
    }

    componentDidMount(){
        {this.VideoFetcher(this)}
    }

    deleteVideo = (vidID: number) => {
        const fetch_url = `http://localhost:3000/video/delete/${vidID}`;
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

render() {
    const allVideos = this.state.allVideos;
    return (
        <div>   
            <div>
                {allVideos.map((video:any, index: number )=> (
                    <div className="mappedresults">
                        <tr key = {index} >
                        <h5>Title: {video.title}</h5>
                        <YouTubeEmbed embedId= {video.link}/>
                        <p><Button onClick={()=> this.deleteVideo(video.id)} style={{color: "white", backgroundColor: "#1F2833"}}>Delete</Button></p>
                        </tr>
                    </div>
                ))}
            </div>
        </div>
    )
}
}