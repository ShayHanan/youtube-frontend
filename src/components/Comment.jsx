import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
display: flex;
gap: 10px;
margin: 30px 0px;
`

const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
color: ${({ theme }) => theme.text};
`

const Username = styled.span`
font-size: 13px;
font-weight: 500;
display: flex;
flex-direction: row;
align-items: center;
`

const Date = styled.span`
font-size: 12px;
font-weight: 400;
color: ${({ theme }) => theme.textSoft};
margin-left: 5px; 

`

const Text = styled.span`
font-size: 14px;

`

const Creator = styled.div`
margin-left: 5px;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 5px;
padding: 5px;
`


const Comment = ({comment}) => {
  const [user, setUser] = useState({});
  const { currentVideo } = useSelector((state)=>state.video);

  useEffect(()=> {
    // get the user that commented
    const fetchUsers = async ()=>{ 
      const res = await axios.get(`/users/find/${comment.userId}`);
      setUser(res.data);
    };
    fetchUsers();
  }, [comment.userId])

  return (
    <Container>
        <Avatar src={user.img}/>
        <Details>
            <Username>{user.name}<Date>{format(comment.createdAt)}</Date>{user._id === currentVideo.userId && <Creator>Creator</Creator>}</Username>
            <Text>
              {comment.desc}
            </Text>
        </Details>
    </Container>
  )
}

export default Comment