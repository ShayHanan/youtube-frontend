import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    comments: null,
    isFetching: false,
    err: false,
}

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.isFetching = true;
        },
        fetchSuccess: (state, action) => {
            state.isFetching = false;
            state.comments = action.payload;
        },
        fetchFailure: (state) => {
            state.isFetching = false;
            state.err = true;        
        },
        addComment: (state, action) => { 
            state.comments.push(action.payload);
        }
}
});

export const {fetchStart, fetchSuccess, fetchFailure, addComment} = commentsSlice.actions;

export default commentsSlice.reducer;

