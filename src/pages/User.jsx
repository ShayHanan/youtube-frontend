import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { axiosInstance } from "../config";

const Container = styled.div`
margin-left: 216px;
@media (max-width: 768px) {
  margin-left: 90px;
}
display: flex;
flex-direction: row;
flex-wrap: wrap;
`;
const Header = styled.h1`
margin-left: 216px;
@media (max-width: 768px) {
  margin-left: 90px;
}
color: ${({ theme }) => theme.text};
margin-bottom: 10px;

`;

const User = () => {
  const location = useLocation();
  //get id from state
  const id = location.state?.id;
  const name = location.state?.name;
  const [err, setErr] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.post(`/videos/user`, { userId: id });
        setVideos(res.data);
      } catch (err) {
        setErr(true);
      }
    };

    fetchVideos();
  }, [id]);
  return (
    <>
      <Header>Videos by: {name}</Header>
      <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </Container>
    </>
  );
};

export default User;