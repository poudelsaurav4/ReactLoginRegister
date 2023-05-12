import axios from "axios";
import store from "../store/Store";
import {
  registerSuccess,
  registerFail,
  authError,
  userLoaded,
  loginSuccess,
  loginFail,
} from "../store/Slices/AuthSlice";
import sendAuthToken from "../utils/sendAuthToken";
import { isLoggedin } from "../store/Slices/NavSlice";
import { errorToast, successToast } from "../components/HOC/Toast";
const headers = {
  "Content-Type": "application/json",
};

export const loadUser = async () => {
  try {
    if (localStorage.token) {
      sendAuthToken(localStorage.token);
    }
    const res = await axios.get("/api/auth");
    store.dispatch(userLoaded(res.data));
    store.dispatch(isLoggedin);
    return res.data;
  } catch (error) {
    store.dispatch(authError());

    // console.log(error.response.data.msg);
    return error.response.data;
  }
};

export const register = async (data) => {
  try {
    const res = await axios.post(
      "/api/user",
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        headers: headers,
      }
    );
    store.dispatch(registerSuccess(res.data.token));
    store.dispatch(isLoggedin());
    successToast("Register Successful");
    window.location.href = "/developer";
  } catch (error) {
    store.dispatch(registerFail());
    if (error.response.data.errors) {
      errorToast("Register Failed. ");
      // console.log(error.response.data.errors[0].msg);
    } else {
      errorToast("Register Failed.");
      // console.log(error.response.data.msg);
    }

    return error.response.data;
  }
};
export const login = async (data) => {
  try {
    const res = await axios.post(
      "/api/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: headers,
      }
    );
    store.dispatch(loginSuccess(res.data.token));
    store.dispatch(isLoggedin());
    successToast("Login Successful");
  } catch (error) {
    store.dispatch(loginFail());
    if (error.response.data.errors) {
      errorToast("Login Failed. ");
      // console.log(error.response.data.errors[0].msg);
    } else {
      errorToast("Login Failed");
      console.log(error.response.data);
    }
    // console.log(error.response.data);
    return error.response.data;
  }
};
