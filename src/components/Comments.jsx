import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addComment, fetchSuccess } from "../redux/commentsSlice";
import Comment from "./Comment";

const Container = styled.div``

const NewComment = styled.div`
display: flex;
flex-direction: column;
gap: 10px
`
const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`
const Input = styled.input`
border: none;
border-bottom: 1px solid ${({ theme }) => theme.soft};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
color: ${({ theme }) => theme.text};

&:focus {
border-bottom: 1px solid ${({ theme }) => theme.text};

}
`
const Details = styled.div`
display: flex;
flex-direction: row;
width: 100%;
`


const Comments = ({videoId}) => {
  /* const [comments, setComments] = useState([]); */
  const { currentUser } = useSelector((state)=>state.user);
  const { comments } = useSelector((state)=>state.comments);
  const dispatch = useDispatch();

  const [comment, setComment] = useState([]);


  const handleChange = (e) => {
    let comment = e.target.value;
    if (comment !== "")
    {
      setComment(comment);
      // display button
      document.querySelector("#commentButton").removeAttribute("hidden");
    }
    else 
    {
      // hide button
      document.querySelector("#commentButton").setAttribute("hidden", "hidden");
    }
  }

  const handleComment = async (e) => {
    try {
      // send comment to database
      const newComment = await axios.post("/comments", {desc:comment, videoId});
      // add comment to state
      dispatch(addComment(newComment.data))
      // clear input
      document.getElementById("commentInput").value = "";
      // hide button
      document.querySelector("#commentButton").setAttribute("hidden", "hidden");
    } catch(err) {

    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // get all comments
        const res = await axios.get(`/comments/${videoId}`);
        // updated state
        dispatch(fetchSuccess(res.data));
      } catch (err) {
      
      }
    }
    fetchComments();
  }, [videoId])
  return (
    <Container>
        {currentUser && (
          <NewComment>
        <Details>
          <Avatar src={currentUser.img}/>
          <Input id="commentInput" placeholder="Add a comment..." onChange={handleChange}/>
        </Details>
            <button style={{width:"100px", height:"30px", border:"none", borderRadius:"5px", backgroundColor:"#3ea6ff",color:"white", marginLeft:"auto", cursor:"pointer"}} id="commentButton" hidden="hidden" onClick={handleComment}>Comment</button>
        </NewComment>)}
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment}/>
        ))}
    </Container>
  )
}

export default Comments