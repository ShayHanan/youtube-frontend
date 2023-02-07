import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    isFetching: false,
    err: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.err = true;        
        },

        logout: (state) => {
             // return initial state
            state.currentUser = null;
            state.isFetching = false;
            state.err = false;
        },
        subscription:(state, action) => {
            // user already subscribed, take id out of subscribed array
            if (state.currentUser.subscribedUsers.includes(action.payload))
            {
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.indexOf(action.payload), 1);
            }
            else 
            {
                state.currentUser.subscribedUsers.push(action.payload);
            }

        }
    },
});

export const {loginStart, loginSuccess, loginFailure, logout, subscription} = userSlice.actions;

export default userSlice.reducer;

