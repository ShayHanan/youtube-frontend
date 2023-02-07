import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`
const Header = styled.h1`
color: ${({ theme }) => theme.text};
margin-bottom: 10px;

`

const User = () => {
    const location = useLocation();
    //get id from state
    const id = location.state?.id;
    const name = location.state?.name;
    const [err, setErr] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async ()=>{
          try{
            const res = await axios.post(`/videos/user`, {userId: id});  
            setVideos(res.data);
          } catch(err) {
            setErr(true);
          }
        };
    
        fetchVideos();
      },[id])
  return (
    <>
    <Header>Videos by: {name}</Header>
    <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video}/>
          ))}
    </Container>
    </>
  )
}

export default User