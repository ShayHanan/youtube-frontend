import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { axiosInstance } from "../config";

const Container = styled.div`
width: ${(props) => props.type !== "sm" && "296px"};
height: ${(props) => props.type !== "sm" && "287px"};
margin: ${(props) => props.type === "sm" ? "10px" : ("0px 15px 35px 0px")};
display: ${(props) => props.type === "sm" && "flex"};
gap: ${(props) => props.type === "sm" && "10px"};

@media (max-width: 768px) {
  width: ${(props) => props.type !== "sm" && "100%"};
  margin: ${(props) => props.type === "sm" ? "10px" : "0px"};

}
`;
const Img = styled.img`
width: ${(props) => props.type === "sm" ? "168px" : "100%"};
height: ${(props) => props.type === "sm" ? "100px" : "167px"};
background-color: #999;
gap: 10px;
border-radius: 10px;
flex: 1;
cursor: pointer;   

@media (max-width: 768px) {
  border-radius: 0px;  
}
`;

const Details = styled.div`
display: flex;
margin-top: ${(props) => props.type !== "sm" ? "16px" : "0px"};
gap: 12px;
flex: 1;
`;

const ChannelImg = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
background-color: #999;
object-fit: cover;
display: ${(props) => props.type === "sm" && "none"}; 
cursor: pointer;
`;

const Texts = styled.div`
margin-top: 5px;
`;

const Title = styled.h1`
font-size: 14px;
font-weight: 600;
color: ${({ theme }) => theme.text};
margin-bottom: 7px;
`;
const ChannelName = styled.div`
font-size: 12px;
color: ${({ theme }) => theme.textSoft};
font-weight: 500;
margin-bottom: 3px;
cursor: pointer;
`;

const Info = styled.div`
font-size: 12px;
color: ${({ theme }) => theme.textSoft};
font-weight: 600;


`;


const Card = ({ type, video }) => {

  const [channel, setChannel] = useState({});
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axiosInstance.get(`/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (err) {
        setErr(true);
      }
    };

    fetchChannel();
  }, [video.userId]);

  const increaseView = async () => {
    try {
      await axiosInstance.put(`/videos/view/${video._id}`);
    } catch (err) {

    }
  };

  return (
    <Container type={type}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }} onClick={increaseView}>
        <Img type={type} src={video.imgUrl} />
      </Link>
      <Details type={type}>
        <ChannelImg type={type} src={channel.img} />
        <Texts>
          <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <Title>{video.title}</Title>
          </Link>
          <ChannelName>{channel.name}</ChannelName>
          <Info>{video.views} views • {format(video.createdAt)}</Info>
        </Texts>
      </Details>
    </Container>
  );
};

export default Card;