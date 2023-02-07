import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
flex:2;
`

const Rec = ({tags}) => {
    const [videos, setVideos] = useState([]);
    const { currentVideo } = useSelector((state)=>state.video);

    useEffect(()=>{
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };

        fetchVideos();
    },[tags])
  return (
    <Container>
        {videos.map((video) => (
            currentVideo._id !== video._id && <Card key={video._id} type="sm" video={video}/>
        ))}
    </Container>
  )
}

export default Rec