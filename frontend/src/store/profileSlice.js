import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: [],
        profilePhoto: '',
    },

    reducers: {
        login(state, action) {
            localStorage.setItem('login', action.payload.userLogin)
            state.profile.push({
                profileLogin: action.payload.userLogin,
            });
        },
        photo(state, action) {
            state.profilePhoto += action.payload;
        },
    },
});

export const { login, photo } = profileSlice.actions;

export default profileSlice.reducer;
