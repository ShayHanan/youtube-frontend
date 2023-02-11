import React, { useState } from 'react';
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
import Tube from "../img/youtube.png";


const Container = styled.div`
@media (max-width: 768px) {
  margin-left: 90px;
}
position: sticky;
top: 0;
background-color: ${({ theme }) => theme.bgLighter};
height: 56px;
margin-bottom: 20px;
`;
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
@media (max-width: 768px) {
  gap: 10px;
}
`;
const Search = styled.div`
width: 40%;
position: absolute;
@media (max-width: 768px) {
  position: relative;
  left: 10px;
}
left: 0px;
right: 0px;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 7px;
border: 0.5px solid ${({ theme }) => theme.soft};
border-radius: 50px;
color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
border: none;
outline: none;
font-size: 16px;
background-color: transparent;
width: 100%;
color: ${({ theme }) => theme.text};

`;


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

@media (max-width: 768px) {
  display: none;
}
`;
const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color: ${({ theme }) => theme.text};
@media (max-width: 768px) {
  gap: 5px;
}
`;

const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
@media (max-width: 768px) {
  width: 20px;
  height: 20px;
}
`;
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
@media (max-width: 768px) {
  padding: 2px 5px;
  font-size: 10px;
}
`;

const Img = styled.img`
height: 25px;
@media (max-width: 768px) {
  height: 15px;
}
`;

const Logo = styled.div`
position: fixed;
display: flex;
align-items: center;
gap: 5px;
font-weight: bold;
left: 220px;
top: 20px;
z-index: 999;
color: ${({ theme }) => theme.text};

@media (max-width: 768px) {
  flex-direction: column;
  font-size: 10px;
  left: 8px;
  top: 5px;
}
`;

const Name = styled.span`
  @media (max-width: 768px) {
  display: none;
}
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    window.location.replace("/");
  };
  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo style={{ "left": useLocation().pathname.split("/")[1] === "video" && "8px" }}>
          <Img src={Tube} />
          ShayTube
        </Logo>
      </Link>
      <Container style={{ "margin-left": useLocation().pathname.split("/")[1] === "video" && "0px" }}>
        <Wrapper>
          <Search>
            <Input onChange={e => setQuery(e.target.value)} placeholder="Search" />
            <SearchOutlinedIcon style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => navigate(`/search?q=${query}`)} />
          </Search>
          {currentUser ?
            (<>
              <Logout onClick={handleLogout}>Log Out</Logout>
              <User>
                <VideoCallOutlinedIcon style={{ cursor: "pointer" }} onClick={() => { setOpen(true); }} />
                <Avatar src={currentUser.img} />
                <Name>{currentUser.name}</Name>
              </User>
            </>)
            : <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button><AccountCircleOutlinedIcon /> SIGN IN</Button>
            </Link>}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;