import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  isloggedin:false
};

const NavSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    showSideNav: (state) => {state.show = true},
    hideSideNav: (state) => {state.show = false},
    isLoggedin: (state) => {state.isloggedin = true},
    isLoggedout: (state) => {state.isloggedin = false},
  },
});


export const { showSideNav, hideSideNav, isLoggedin, isLoggedout } = NavSlice.actions;
export default NavSlice.reducer