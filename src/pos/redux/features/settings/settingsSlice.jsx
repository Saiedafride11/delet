import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalSettings: {},
  globalCurrencies: {},
  prevSideBarMenu: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setGlobalSettings: (state, action) => {
      state.globalSettings = action.payload;
    },
    setGlobalCurrencies: (state, action) => {
      state.globalCurrencies = action.payload;
    },
    setPrevSideBarMenu: (state, action) => {
      state.prevSideBarMenu = action.payload;
    },
  },
});

export const { setGlobalSettings, setGlobalCurrencies, setPrevSideBarMenu } =
  settingsSlice.actions;
export default settingsSlice.reducer;
