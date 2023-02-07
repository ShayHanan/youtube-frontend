import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`

const Header = styled.h1`
color: ${({ theme }) => theme.text};
margin-bottom: 10px;

`

const Home = ({type}) => {
  const [err, setErr] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async ()=>{
      try{
        const res = await axios.get(`/videos/${type}`);
        setVideos(res.data);
      } catch(err) {
        setErr(true);
      }
    };

    fetchVideos();
  },[type])
  
  return (
    <>
    {type === "trend" && <Header>Hot Vidoes:</Header>}
    <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video}/>
          ))}
    </Container>
    </>
  )
}

export default Home