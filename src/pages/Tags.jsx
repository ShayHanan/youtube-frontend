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

const Tags = () => {
    const tag = useLocation().search;
    const [videos, setVideos] = useState([]);
    const name = tag.split("=")[1];
    const capitalName = name.charAt(0).toUpperCase() + name.substring(1);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axiosInstance.get(`videos/tags${tag}`);
                setVideos(res.data);
            } catch (err) {

            }
        };
        fetchVideos();
    }, [tag]);
    return (
        <>
            <Header>{capitalName} Videos</Header>
            <Container>
                {videos.map((video) => (
                    <Card key={video._id} video={video} />
                ))}
            </Container>
        </>
    );
};

export default Tags;