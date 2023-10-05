import { createSlice } from "@reduxjs/toolkit";
import { getUserProjects } from "api/api.js";

const initialState = {
  items: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addItemsProjects: (state, action) => {
      return { ...state, items: action.payload };
    }, 
    
    // editItemsProjects: (state, action) => {
    //   return { ...state, items: action.payload };
    // },
  },
});

export const { addItemsProjects,editItemsProjects } = projectSlice.actions;
export default projectSlice.reducer;
