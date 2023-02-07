import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: center;
justify-content: center;

`;
const Wrapper = styled.div`
z-index: 1;
width: 600px;
height: 600px;
color: ${({ theme }) => theme.text};
background-color: ${({ theme }) => theme.bgLighter};
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
`;
const Close = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
`;

const Title = styled.h1`
text-align: center;  
`;

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`;
const Desc = styled.textarea`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`;

const Type = styled.label`
font-size: 14px;
font-weight: 500;
`;

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
color: ${({ theme }) => theme.textSoft};
background-color: ${({ theme }) => theme.soft};
`;

const Error = styled.div`
  color: red;
  font-size: 20px;
  text-align: center;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);


  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      }, (error) => { },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs(prev => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/videos", { ...inputs, tags });
      setOpen(false);
      navigate(`/video/${res.data._id}`);
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new video</Title>
        <Type>Video</Type>
        {videoPerc > 0 ? ("Uploading: " + videoPerc + "%") : (<Input required type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />)}
        <Input type="text" placeholder="Title" name="title" onChange={handleChange} />
        <Desc placeholder="Description" rows={8} name="desc" onChange={handleChange} />
        <Type>Tags</Type>
        <Input type="text" placeholder="Seperate the tags with commas." onChange={e => setTags(e.target.value.split(",").toLowerCase())} />
        <Type>Thumbnail</Type>
        {imgPerc > 0 ? ("Uploading: " + imgPerc + "%") : (<Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />)}
        {imgPerc === 100 && videoPerc === 100 ? <Button onClick={handleUpload}>Upload</Button> : ""}
        {err ? <Error>Please fill all inputs!</Error> : ""}
      </Wrapper>
    </Container>
  );
};

export default Upload;