import {configureStore} from "@reduxjs/toolkit";
import NavReducer from "./Slices/NavSlice";
import AuthSlice from "./Slices/AuthSlice";
 const store = configureStore({
    reducer:{
      nav:NavReducer,
      auth:AuthSlice
    }
 })


 export default store