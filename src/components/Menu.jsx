import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Tube from "../img/youtube.png";
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";


const Container = styled.div`
flex: 1;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
font-size: 14px;
position: fixed;
overflow-x: hidden;
overflow-y: scroll;
height: 100%; 
top: 0; /* Stay at the top */
left: 0;
width: 216px;

&::-webkit-scrollbar {
   width: 7px;
}

&::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
}
`;


const Wrapper = styled.div`
padding: 18px 26px;
`;

const Logo = styled.div`
display: flex;
align-items: center;
gap: 5px;
font-weight: bold;
margin-bottom: 25px;
`;

const Img = styled.img`
height: 25px;
`;

const Item = styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0px;
border-radius: 10px;

&:hover {
  background-color: ${({ theme }) => theme.soft};
}
`

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({theme}) => theme.soft};
`

const Login = styled.div`

`

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;

&:hover {
  background-color: #3ea6ff;
  color: white;
}
`

const Title = styled.h2`
font-size: 14px;
font-weight: 500;
color: #aaaaaa;
margin-bottom: 20px;
`

const Avatar = styled.img`
width: 24px;
height: 24px;
border-radius: 50%;
background-color: #999;
`

const Menu = ({darkMode, setDarkMode}) => {
  
  const {currentUser} = useSelector(state=>state.user);
  const [err, setErr] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async ()=>{
      try{
       
        // Get users' details for pic and name
        const array = await Promise.all(currentUser.subscribedUsers.map( async(user) => {
          const res = await axios.get(`/users/find/${user}`);
          return res.data;
        }));
        setUserDetails(array);
      } catch(err) {
        setErr(true);
      }
    };
    if (currentUser)
    {
      fetchUsers();
    }
  },[currentUser])

  const handleMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  }

  return (
    <Container>
        <Wrapper>
        <Link to="/" style={{textDecoration:"none", color: "inherit"}}>
            <Logo>
                <Img src={Tube}/>
                ShayTube
            </Logo>
            </Link>
            <Link to="/" style={{textDecoration:"none", color: "inherit"}}>
        <Item>
          <HomeIcon />
          Home
        </Item>
        </Link>
        <Link to="/trend" style={{textDecoration:"none", color: "inherit"}}>
        <Item>
          <LocalFireDepartmentOutlinedIcon />
          Hot Videos
        </Item>
        </Link>
        {currentUser && (<Link to="/subscriptions" style={{textDecoration:"none", color: "inherit"}}>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        {userDetails.map((user) => (
          <Link key={user._id} to={"/user"} state={{id: user._id, name:user.name}} style={{textDecoration:"none", color: "inherit"}}>
        <Item > 
            <Avatar  src={user.img}/>
            {user.name}
        </Item>
          </Link>))}
        </Link>)}
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        { !currentUser && 
          <><Login>
            Sign in to like videos, comment, and subscribe
            <Link to="/signin" style={{textDecoration:"none"}}>
            <Button><AccountCircleOutlinedIcon /> SIGN IN</Button>
            </Link>
        </Login>
        <Hr /></>
        }
        <Title>What's New</Title>
        <Item onClick={()=> navigate(`/tags?tags=music`)}>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
         <Item onClick={()=> navigate(`/tags?tags=sports`)}>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
         <Item onClick={()=> navigate(`/tags?tags=gaming`)}>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
         <Item onClick={()=> navigate(`/tags?tags=movies`)}>
          <MovieOutlinedIcon />
          Movies
        </Item>
         <Item onClick={()=> navigate(`/tags?tags=news`)}>
          <ArticleOutlinedIcon />
          News
        </Item>
         <Item onClick={()=> navigate(`/tags?tags=live`)}>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={handleMode} >
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        </Wrapper>
    </Container>
  )
}

export default Menu