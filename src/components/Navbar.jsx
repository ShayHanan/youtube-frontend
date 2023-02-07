import React, { useState } from 'react'
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";

const Container = styled.div`
position: sticky;
top: 0;
background-color: ${({ theme }) => theme.bgLighter};
height: 56px;
margin-bottom: 20px;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;
`
const Search = styled.div`
width: 40%;
position: absolute;
left: 0px;
right: 0px;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 7px;
border: 0.5px solid ${({theme}) => theme.soft};
border-radius: 50px;
color: ${({theme}) => theme.text};
`
const Input = styled.input`
border: none;
outline: none;
font-size: 16px;
background-color: transparent;
width: 100%;
color: ${({theme}) => theme.text};

`


const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;

&:hover {
  background-color: #3ea6ff;
  color: white;
}
`
const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color: ${({theme}) => theme.text};
`

const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`
const Logout = styled.button`
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {currentUser} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.replace("/");
  }
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input onChange={e => setQuery(e.target.value)} placeholder="Search" />
          <SearchOutlinedIcon style={{cursor:"pointer"}} onClick={()=> navigate(`/search?q=${query}`) }/>
        </Search>
        {currentUser ? 
         (<>
         <Logout onClick={handleLogout}>Log Out</Logout>
         <User>
          <VideoCallOutlinedIcon style={{cursor:"pointer"}} onClick={() => {setOpen(true)}}/>
          <Avatar src={currentUser.img}/>
          {currentUser.name}
         </User>
         </>)
         : <Link to="/signin" style={{textDecoration:"none"}}>
            <Button><AccountCircleOutlinedIcon /> SIGN IN</Button>
          </Link>}
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar