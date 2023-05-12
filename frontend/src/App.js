import React, { useEffect } from "react";
import store from "./store/Store";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Developer from "./components/Developer";
import Error12 from "./components/ErrorPage";
import MainLayout from "./components/HOC/MainLayout";
import { loadUser } from "./API/Auth";
import sendAuthToken from "./utils/sendAuthToken";
import { useSelector } from "react-redux";
const App = () => {
  loadUser();
  if (localStorage.token) {
    sendAuthToken(localStorage.token);
  }

  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <MainLayout>
          <div className="p-4">
            <Routes>
              <Route path="/404error" element={<Error12 />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/developer" element={<Developer />} />
            </Routes>
          </div>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
