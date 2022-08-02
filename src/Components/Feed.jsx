import React, { useEffect, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

import { firebaseApp } from "../firebase-config";
import {SimpleGrid } from "@chakra-ui/react";
import axios from "axios";

import VideoPin from "./VideoPin";
import { useNavigate } from "react-router-dom";
const Feed = () => {
const analytics = getAnalytics(firebaseApp);
const [videos, setVideos]=useState([])
const navigate = useNavigate()

const fetchData = async (token)=>{
  console.log('token', token)
  setLoading(true)
  axios.get('https://videoapp-api.herokuapp.com/api/todos/', {headers:{
  //  axios.get('http://localhost:4000/api/todos/', {headers:{
    Authorization: `Bearer ${token}`
  }}).then((data)=>{
    console.log('data', data.data.data)
  let videoss = data.data.data
    setVideos(videoss)
    setLoading(false)
  }).catch(err=>{
    alert('Login expired')
    if(err.response.data.error === 'auth/id-token-expired'){
      navigate('/login', {replace:true})
      console.log('err', err.response.data.error)
    }
  })
  
}
useEffect(()=>{
  const token = localStorage.getItem('accessToken')
  logEvent(analytics, 'feedpage_visited')
  if(token){
    fetchData(JSON.parse(token))
  }
},[])


  const [loading, setLoading] = useState(false);


  if (loading) return <h1>Loading...</h1>;

  return (
    <SimpleGrid
      minChildWidth="300px"
      spacing="15px"
      width="full"
      autoColumns={"max-content"}
      overflowX={"hidden"}
    >
      {videos &&
        videos.map((data) => (
          <VideoPin key={data.id} maxWidth={420} height="80px" data={data} />
        ))}
    </SimpleGrid>
  );
};

export default Feed;
