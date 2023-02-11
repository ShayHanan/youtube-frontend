import React from 'react';
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { axiosInstance } from "../config";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
margin-left: 216px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({ theme }) => theme.soft};
padding: 20px 50px;
gap: 10px;
`;
const Title = styled.h1`
font-size: 24px;
`;

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`;

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};

`;

const More = styled.div`
display: flex;
margin-top: 10px;
font-size: 12px;
color: ${({ theme }) => theme.soft};
font-weight: 500;
`;

const Links = styled.div`
margin-left: 50px;
`;

const Link = styled.span`
margin-left: 30px;
cursor: pointer;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosInstance.post("/auth/signin", { name, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));
      navigate("/");

    } catch (err) {
      dispatch(loginFailure());
    }
  };
  const signInWithGoogle = async (e) => {
    dispatch(loginStart());
    signInWithPopup(auth, provider).then((result) => {
      axiosInstance.post("/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      }).then((res) => {
        dispatch(loginSuccess(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    }).catch((error) => {
      dispatch(loginFailure());
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("auth/signup", { name, email, password });
      setIsRegistered(true);
    } catch (error) {

    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>To continue to ShayTube</SubTitle>
        <Input placeholder="username" autoFocus onChange={e => setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        <Title>or</Title>
        <Input placeholder="username" onChange={e => setName(e.target.value)} />
        <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleRegister}>Sign Up</Button>
        {isRegistered && <span style={{ "color": "green" }}>User Has been created!</span>}
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
