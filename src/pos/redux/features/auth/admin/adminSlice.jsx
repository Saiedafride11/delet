import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminToken: undefined,
  adminProfile: {},
  error: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminInfo: (state, action) => {
      state.adminProfile = action.payload;
    },
    adminLoggedIn: (state, action) => {
      state.adminToken = action.payload;
    },
    adminLoggedOut: (state) => {
      state.adminToken = undefined;
      state.adminProfile = {};
      state.error = "";
    },
  },
});

export const { adminInfo, adminLoggedIn, adminLoggedOut } = adminSlice.actions;
export default adminSlice.reducer;
