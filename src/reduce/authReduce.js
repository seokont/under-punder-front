import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {
    
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      return { ...state, token: action.payload.token,user: action.payload, isAuthenticated: true };
    },
    addTokenMe: (state, action) => {
      return { ...state, token: action.payload };
    },
    reAuth: (state) => {
      return { ...state, isAuthenticated: true };
    },
    logOut: (state) => {
      return { ...state, isAuthenticated: false };
    },

    loginMe: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { addToken, reAuth, logOut, loginMe,addTokenMe } = authSlice.actions;
export default authSlice.reducer;
