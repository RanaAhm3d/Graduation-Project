import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loadAuthData } from "../../utilis/loadAuthData";
import api from "../../api/baseUrl";

const initialState = {
  admin: null,
  user: null,
  loading: false,
  error: null,
  token: null,
};


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({loginData , apiUrl}, { rejectWithValue }) => {
    try {
      const response = await api.post(apiUrl, loginData );
      // console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Initialize authentication state
    initialAuth: (state) => {
      const { token, user, admin } = loadAuthData();

      if (token) state.token = token;
      if (user) state.user = user;
      if (admin) state.admin = admin;
    },
    // Logout functionality
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.admin = null;
      Cookies.remove("token");
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.admin = action.payload?.admin;
        state.token = action.payload?.token; 

        // Store user and admin in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("admin", JSON.stringify(state.admin));

        // Store token securely in cookies
        if (action.payload?.token) {
          Cookies.set("token", action.payload.token, { expires: 7 });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { initialAuth, logout } = authSlice.actions;
export default authSlice.reducer;
