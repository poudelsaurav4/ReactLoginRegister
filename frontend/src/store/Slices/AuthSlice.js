import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuth: null,
  loading: true,
  user: null,
  error: false,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuth: true,
        loading: false,
      };
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuth: true,
        loading: false,
        error:false,
      };
    },
    registerFail: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null,
        error: true,
      };
    },
    loginFail: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null,
        error: true,
      };
    },
    userLoaded: (state, action) => {
      return {
        ...state,
        isAuth: true,
        user: action,
        loading: false,
      };
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null,
      };
    },
    authError: (state, action) => {
      localStorage.removeItem("token");
      return {
        isAuth: false,
        loading: false,
        token: null,
        error: true,
      };
    },
  },
});

export const {
  registerSuccess,
  registerFail,
  userLoaded,
  authError,
  logOut,
  loginSuccess,
  loginFail
} = AuthSlice.actions;

export default AuthSlice.reducer;
