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

const Tags = () => {
    const tag = useLocation().search;
    const [videos, setVideos] = useState([]);
    const name = tag.split("=")[1];
    const capitalName = name.charAt(0).toUpperCase() + name.substring(1);
    useEffect(()=> {
        const fetchVideos = async () => {
            try{
                const res = await axios.get(`videos/tags${tag}`);
                setVideos(res.data)
            } catch(err){

            }
        }
        fetchVideos();
    },[tag])
  return (
    <>
    <Header>{capitalName} Videos</Header>
    <Container>
        {videos.map((video) => (
            <Card key={video._id} video={video}/>
            ))}
    </Container>
    </>
  )
}

export default Tags