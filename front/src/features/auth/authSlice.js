import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  userData: {
    _id: "",
    name: "",
    email: "",
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    activity_level: "",
    goal: 0,
    calories: 0,

    favbreakfast: [],
    favlunch: [],
    favdinner: [],

    breakfast: [],
    lunch: [],
    dinner: [],
    dietPlan: [],

    date: "",
    password: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
