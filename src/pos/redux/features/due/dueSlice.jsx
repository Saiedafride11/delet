import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dueSingleInvoice: {},
  dueWithoutInvoice: {},
};

export const dueSlice = createSlice({
  name: "dueList",
  initialState,
  reducers: {
    setDueSingleInvoice: (state, action) => {
      state.dueSingleInvoice = action.payload;
    },
    setDueWithoutInvoice: (state, action) => {
      state.dueWithoutInvoice = action.payload;
    },
  },
});

export const { setDueSingleInvoice, setDueWithoutInvoice } = dueSlice.actions;
export default dueSlice.reducer;
