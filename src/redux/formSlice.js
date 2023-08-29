import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputFields: {},
  disablesubmitButton: false
};

const formSlice = createSlice({
  name: "formSubmissions",
  initialState,
  reducers: {
    setFields: (state, action) => {
      const { values } = action.payload;
      state.inputFields = { ...state.inputFields, ...values};
    },
    resetFields: (state) => {
      state.inputFields = {};
    },
    setSubmitButton: (state, action) => {
      state.disablesubmitButton = action.payload;
    }
  },
});

export const {
  setFields, resetFields, setSubmitButton
} = formSlice.actions;

export default formSlice.reducer;


