import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addItemsTask: (state, action) => {
      return { ...state, items: action.payload };
    },
  },
});

export const { addItemsTask } = taskSlice.actions;
export default taskSlice.reducer;
