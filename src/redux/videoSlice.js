import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentVideo: null,
    isFetching: false,
    err: false,
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.isFetching = true;
        },
        fetchSuccess: (state, action) => {
            state.isFetching = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state) => {
            state.isFetching = false;
            state.err = true;        
        },
        like: (state, action) => {
            // if user hasnt liked already, put him in likes array and remove from dislikes array
            // else jusr remove from likes array
            if (!state.currentVideo.likes.includes(action.payload))
            {
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.dislikes.splice(action.payload.indexOf(action.payload),1);
            }
            else 
            {
                state.currentVideo.likes.splice(state.currentVideo.likes.indexOf(action.payload), 1);
            }  
    },
    dislike: (state, action) => {
        // if user hasnt disliked already, put him in dislikes array and remove from likes array
        // else jusr remove from dislikes array
        if (!state.currentVideo.dislikes.includes(action.payload))
        {
            state.currentVideo.dislikes.push(action.payload);
            state.currentVideo.likes.splice(action.payload.indexOf(action.payload),1);
        }
        else 
        {
            state.currentVideo.dislikes.splice(state.currentVideo.likes.indexOf(action.payload), 1);
        }  
    },

}
});

export const {fetchStart, fetchSuccess, fetchFailure, like, dislike} = videoSlice.actions;

export default videoSlice.reducer;

