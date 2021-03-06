import React from 'react';
import {Button} from '@material-ui/core';
import YouTubeEmbed from './YouTubeEmbed';
import VideoUpload from './PostVideos';
import APIURL from '../../helpers/environment';

type acceptedInputs = {
    sessionToken: any, // come back to this - any needs to be more specific
    title: string,
    link: string,
    allVideos: any,
    interval?:any
}
type props = {
    sessionToken?: any, 
    date?: string, 
    allPlans?: any,
    interval?: any 
   }
export default class VideoDisplay extends React.Component <props,acceptedInputs> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem('token'),
            title: "",
            link: "",
            allVideos:[],
            interval: 0 
        }
    }
    VideoFetcher = (e: any) => {
        let url = `${APIURL}/video/`
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
        this.setState({interval: setInterval(this.VideoFetcher, 8000)})
    }
    
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    deleteVideo = (vidID: number) => {
        const fetch_url = `${APIURL}/video/delete/${vidID}`;
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
            <VideoUpload />
            <br />
            <br />   
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