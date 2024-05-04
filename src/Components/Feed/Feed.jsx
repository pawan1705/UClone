import thumbnail1 from '../../assets/thumbnail1.png';
import {useState,useEffect} from 'react';
import { API_KEY, value_converter } from '../../data';
import {Link} from 'react-router-dom';
import moment from 'moment';
import './Feed.css'
const Feed = ({category}) => {
  const[data,setData]=useState([]);
  const fetchData=async()=>{
    const videoList_url=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items));
  }
  useEffect(()=>{
    fetchData();
  },[category])
  return (
    <div className="feed">
      {data.map((item,index)=>{
        return(
          <>
        <Link to={`video/${item.snippet.categoryId}/${item.id} `}  className="card">
          {/* console.log("KKKKKKKKKKKKK"+items); */}
        <img src={`${item.snippet.thumbnails.medium.url}`} alt="" />
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p> {value_converter(item.statistics.viewCount)} Views &bull;{moment(item.snippet.publishedAt).fromNow()}</p>
      </Link>
      </>
        )
      })}
    </div>
  )
}

export default Feed;