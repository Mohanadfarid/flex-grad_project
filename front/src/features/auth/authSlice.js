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

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const userData = await Apis.postData(`register`, data);

      if (userData.hasOwnProperty("errors")) {
        return rejectWithValue(userData.errors);
      }
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToFavourit = createAsyncThunk(
  "auth/addToFavourit",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { _id } = getState().auth.userData;
    try {
      const userData = await Apis.putData(`${_id}/pickfood`, data);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFavourit = createAsyncThunk(
  "auth/removeFromFavourit",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { _id } = getState().auth.userData;
    try {
      const userData = await Apis.putData(`${_id}/removefood`, data);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const calculateCalories = createAsyncThunk(
  "auth/calculateCalories",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { _id } = getState().auth.userData;
    try {
      const userData = await Apis.putData(`${_id}/getstarted`, data);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generateDietPlan = createAsyncThunk(
  "auth/generateDietPlan",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { _id } = getState().auth.userData;
    try {
      const userData = await Apis.getData(`${_id}/dietplan`);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData: (state) => {
      Object.assign(state, initialState);
    },
    clearErrors: (state) => {
      state.error = {};
    }
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.isUserLoggedIn = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //add to favourit
    builder.addCase(addToFavourit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToFavourit.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(addToFavourit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //reomve from favourit
    builder.addCase(removeFromFavourit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFromFavourit.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(removeFromFavourit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //calculate calories
    builder.addCase(calculateCalories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(calculateCalories.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(calculateCalories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //generate diet plan
    builder.addCase(generateDietPlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateDietPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(generateDietPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearUserData, clearErrors } = authSlice.actions;
export default authSlice.reducer;
