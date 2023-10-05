import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
