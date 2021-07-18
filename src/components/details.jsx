import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import youtube from '../apis/youtube';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import YouTube from 'react-youtube';

class Details extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            content:{},
            playIndex:0,
            videos:[],
            pause:true
        }
        this.myRef = React.createRef();
       
    }

    componentDidMount = () => {

        youtube.get('/search' , {
            params: {
                q: 'lofi'
            }
        }).then(res => {
            console.log(res.data.items)
            this.setState({
                videos: res.data.items
            } , () => {
                this.props.updateBackground(this.state.videos[0].snippet.thumbnails.high.url);
            })
        })
 
    }
   

    onPlayPause = () => {
        console.log('teagrer' , this.state.target)
       this.setState({
           pause: !this.state.pause
       } , () => {
           this.state.pause ? this.state.target.pauseVideo() : this.state.target.playVideo();
       })
     
    }

    _onReady = (event) => {
    
        this.setState({
            target:event.target
        });
        event.target.stopVideo();
      }

    onNext = () => {
        let {playIndex , target } = this.state;
        target.stopVideo();
        playIndex++;
        this.setState({
            playIndex,
            pause:false,
        } , ()=> {
            target.playVideo();
            this.props.changeRandomBg()
            this.props.updateBackground(this.state.videos[this.state.playIndex].snippet.thumbnails.high.url)
        })
    }  

    onBack = () => {
        let {playIndex , target } = this.state;
        playIndex = playIndex>0 ? playIndex-1 : playIndex;
        target.stopVideo();
        this.setState({
            playIndex,
            pause:false,
        } , ()=> {
            target.playVideo();
            this.props.changeRandomBg();
            this.props.updateBackground(this.state.videos[this.state.playIndex].snippet.thumbnails.high.url)
        })
    }

    render(){

        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1,
            },
          };
          const currentVideo = this.state.videos.length ? this.state.videos[this.state.playIndex]: null;

        return (
            <div className = "c-player-details">
                 
                 <div style = {{display:'none'}}>
                    <YouTube   id="ytPlayer"   ref = {this.myRef}  videoId={currentVideo ? currentVideo.id.videoId : ""} opts={opts} onReady={this._onReady} />

                 </div>
                <div className="details-img">
                    <img src = {currentVideo ? currentVideo.snippet.thumbnails.high.url : ""}></img>
                </div>
                <div className="details-wrapper">
                    <p className="details-title">{currentVideo ? currentVideo.snippet.title : ""}</p>
                    <p className="details-artist">{currentVideo ? currentVideo.snippet.channelTitle : ""}</p>
                </div>
    
                <div className="c-player-controls">
                    <button className="skip-btn" onClick = {() => this.onBack()} >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className="play-btn" onClick = {() => this.onPlayPause()} >
                        <FontAwesomeIcon icon={!this.state.pause ? faPause : faPlay} />
                    </button>
                    <button className="skip-btn" onClick = {() => this.onNext()}>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
                
            </div>
        )

    }
    
}

export default Details
