import {useState,useEffect} from 'react';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
// import jack from '../../assets/jack.png';
import user_profile from '../../assets/me.png'; 
import user_profile1 from '../../assets/user_profile.jpg'
import './PlayVideo.css';
import { API_KEY, value_converter } from '../../data';
// import moment from 'moment';
const PlayVideo = ({videoId}) => {
  const[apiData,setApiData]=useState(null);
  const[channelData,setChannelData]=useState(null);
  const fetchVideoData=async()=>{
    //fetching videos data 
    const videDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
  }
    useEffect(()=>{
      fetchVideoData();
    },[])
  const fetchOtherData=async()=>{
    //fetching channel data
    const channelURL=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelURL).then(res=>res.json()).then(data=>setChannelData(data.items[0]))
  }
  useEffect(()=>{
    fetchOtherData();
  },[apiData])

  
  return (
    <>
    <div className="play-video">
    {/* <video src={video1} controls autoPlay muted></video>
     */}
     <iframe width="770"  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
    <div className="play-video-info">
      <p>{apiData?value_converter(apiData.statistics.viewCount):"12K"} </p>
      <div>
        <span>
          <img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):"1K"} 
        </span>
        <span>
          <img src={share} alt="" />23
        </span>
        <span>
          <img src={save} alt="" />13
        </span>
      </div>
    </div>
    <hr/>
    <div className="publisher">
      <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="not found" />
      <div>
      <p>{apiData?apiData.snippet.channelTitle:"type here"}</p>
      <span>
        {channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscribers
      </span>
      </div>
      <button>Subscribe</button>
    </div>
    <div className="vid-description">
      <p>
        {apiData?apiData.snippet.description.slice(0,250):"Description Here"};
      </p>
      <p>Subscribe greatStack to watch more tutorials on web development. </p>
      <hr/>
      <h4>{apiData?value_converter(apiData.statistics.commentCount):"2K"}  comments</h4>
      <div className="comment">
        <img src={user_profile} alt="" />
        <div className="div">
          <h3>pawan sangare<span>1 day ago</span></h3>
          <p>good channel for learning developments projects</p>
          <div className="comment-action">
            <img src={like} alt="" /><span>234</span>
            <img src={dislike} alt="" /><span>33</span>
          </div>
        </div>
      </div>
      <div className="comment">
        <img src={user_profile1} alt="" />
        <div className="div">
          <h3>pawan sangare<span>1 day ago</span></h3>
          <p>good channel for learning developments projects</p>
          <div className="comment-action">
            <img src={like} alt="" /><span>234</span>
            <img src={dislike} alt="" /><span>33</span>
          </div>
        </div>
      </div><div className="comment">
        <img src={user_profile} alt="" />
        <div className="div">
          <h3>pawan sangare<span>1 day ago</span></h3>
          <p>good channel for learning developments projects</p>
          <div className="comment-action">
            <img src={like} alt="" /><span>234</span>
            <img src={dislike} alt="" /><span>33</span>
          </div>
        </div>
      </div><div className="comment">
        <img src={user_profile1} alt="" />
        <div className="div">
          <h3>pawan sangare<span>1 day ago</span></h3>
          <p>good channel for learning developments projects</p>
          <div className="comment-action">
            <img src={like} alt="" /><span>234</span>
            <img src={dislike} alt="" /><span>33</span>
          </div>
        </div>
      </div><div className="comment">
        <img src={user_profile1} alt="" />
        <div className="div">
          <h3>pawan sangare<span>1 day ago</span></h3>
          <p>good channel for learning developments projects</p>
          <div className="comment-action">
            <img src={like} alt="" /><span>234</span>
            <img src={dislike} alt="" /><span>33</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default PlayVideo;