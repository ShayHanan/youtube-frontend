import { AddTaskOutlined, ReplyOutlined, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import React from 'react'
import styled from "styled-components";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { subscription } from "../redux/userSlice";
import Rec from "../components/Rec";

const Container = styled.div`
  display: flex;
  gap: 24px;
`

const Content = styled.div`
flex:5;
`

const VideoWrapper = styled.div`

`

const Title = styled.h1`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};

`

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
color: ${({ theme }) => theme.text};
background-color: ${({ theme }) => theme.soft};
border-radius: 12px;
padding: 10px;
margin-bottom: 20px;
`

const Info = styled.span`
color: ${({ theme }) => theme.textSoft};

`

const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
margin-left: auto;
`

const Button = styled.div`
display: flex;
gap: 5px;
cursor: pointer;
`

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({ theme }) => theme.soft};
`

const Channel = styled.div`
display: flex;
gap: 20px;
`

const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`

const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`

const ChannelDetails = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`

const ChannelName= styled.span`
font-weight: 500;
`

const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({ theme }) => theme.textSoft};
font-size: 12px;

`

const Description = styled.p`
font-size: 14px;
`

const VideoFrame = styled.video`
max-height: 720px;
width: 100%;
object-fit: cover;
`

const DeleteButton = styled.button`
height: 50px;
  margin-right: 10px;
background-color: #de1313;
color: white;
display: flex;
align-items: center;
border: none;
padding: 5px 10px;
cursor: pointer;
border-radius: 5px;
font-weight: 500;

`


const Video = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const { currentVideo } = useSelector((state)=>state.video);
  const dispatch = useDispatch();

  // take video id from url
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get current video
        const videoRes = await axios.get(`/videos/find/${path}`);
        // get user that uploaded video
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data))
       
      } catch (err) {
      
      }
    }


    fetchData();
  },[path, dispatch, likes, dislikes]);

  const handleLike = async () => {
    if (currentUser)
    {
      setLikes( await axios.put(`/users/like/${currentVideo._id}`));
      dispatch(like(currentUser._id));
    }
  }

  const handleDislike = async () => {
    if (currentUser) 
    {
      setDislikes(await axios.put(`/users/dislike/${currentVideo._id}`));
      dispatch(dislike(currentUser._id));
    }
  }

  const handleSub = async () => {
    // if user already subbed then unsub him, else sub
    currentUser.subscribedUsers.includes(channel._id) ?
    await axios.put(`/users/unsub/${channel._id}`) :  await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));

  }

  const handleDelete = async () => {
    try{
      await axios.delete(`/videos/${path}`);
      window.location.replace("/");
    } catch(err) {

    }

  }
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Channel>
          <ChannelInfo>
            <Image src={channel.img}/>
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
            </ChannelDetails>
            {(currentUser && channel._id === currentUser._id) && <DeleteButton onClick={handleDelete}>Delete Video</DeleteButton>}
          </ChannelInfo>
          {(currentUser && channel._id !== currentUser._id) && <Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>}
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? <ThumbUpIcon /> : <ThumbUpOutlined />} {currentVideo.likes?.length}
              </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes.includes(currentUser?._id) ?  <ThumbDownIcon /> : <ThumbDownOutlined />} Dislike
            </Button>
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Channel>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <Description>
                {currentVideo.desc}
            </Description>
        </Details>
        <Comments videoId = {currentVideo._id}/>
      </Content>
       <Rec tags={currentVideo.tags} />
    </Container>
  )
}

export default Video