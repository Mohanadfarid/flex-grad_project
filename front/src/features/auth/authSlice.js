import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Apis from "../../api_handller";
const initialState = {
  isUserLoggedIn: false,
  loading: false,
  error: {},
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

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const userData = await Apis.postData(`login`, data);

    if (userData.hasOwnProperty("errors")) {
      return rejectWithValue(userData.errors);
    }
    return userData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.isUserLoggedIn=true
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    });
  },
});

export const { clearUserData } = authSlice.actions;
export default authSlice.reducer;
