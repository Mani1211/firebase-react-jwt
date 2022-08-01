import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactPlayer from "react-player";
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();
logEvent(analytics, 'notification_received');

const Home = ({user}) => {
console.log('user', user)
const [videos, setVideos]=useState([])
  const fetchData = async (token)=>{
    const res = await axios.get('http://localhost:4000/api/todos/', {headers:{
      Authorization: `Bearer ${token}`
    }})

    const data = res.data

    if(res.status == 200){
      setVideos(data.data)
      console.log('res', data.data)
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('accessToken')
    const auth = localStorage.getItem('auth')
    console.log('JS', JSON.stringify(auth))
    const analytics = getAnalytics()
logEvent(analytics, 'homeroute_vsisted')
    if(token){
      fetchData(JSON.parse(token))
    }
  },[])
  return (
    <div>
      {videos.length > 0 && videos.map((vid)=>(<div key={vid.id}>
        <h1>{vid.title}</h1>
        <h1>{vid.location}</h1>
        <h1>{vid.category}</h1>
        <video
          src={vid.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
        {/* <ReactPlayer
              url={vid?.videoUrl}
              width="50%"
              height={"50%"}
              playing={true}
              
            /> */}

        </div>))}
    </div>
  )
}

export default Home