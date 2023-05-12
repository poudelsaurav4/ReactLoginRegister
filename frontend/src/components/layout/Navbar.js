import React, { useState } from "react";
import store from "../../store/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedout, showSideNav } from "../../store/Slices/NavSlice";
import { logOut } from "../../store/Slices/AuthSlice";
const Navbar = () => {
  const show = useSelector((state) => state.nav.show);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <nav className="h-14 w-full flex justify-between items-center bg-white px-8 py-2 shadow-xl opacity-90">
        {!show && (
          <div
            className="flex justify-between items-center  space-x-4 cursor-pointer "
            onClick={() => navigate("/developer")}
          >
            <FontAwesomeIcon icon={faCircleNodes} size="2xl" />
            <h1 className="  text-2xl font-semibold leading-6 text-gray-800 hover:text-indigo-500">
              Dev Connect
            </h1>
          </div>
        )}
        <div className="hidden md:block">
          <div className="flex justify-between items-center space-x-4">
            <a
              href="/developer"
              className="text-lg font-semibold hover:text-indigo-500"
            >
              Developers
            </a>
            {!isAuth ?<>
              <button
                onClick={() => navigate("/register")}
                className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-indigo-700 bg-white border border-indigo-700  hover:bg-gray-200   active:bg-white  justify-center items-center"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-indigo-700  hover:bg-indigo-600 active:bg-indigo-900 justify-center items-center"
              >
                Sign In
              </button>
            </>:
            <button
              onClick={() => {
                store.dispatch(logOut());
                store.dispatch(isLoggedout());
                window.location.href = "/login"
              }}
              className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-red-700  hover:bg-red-600 active:bg-red-900 justify-center items-center"
            >
              Sign Out
            </button>}
          </div>
        </div>
        {/* Burger Icon */}
        {!show && (
          <FontAwesomeIcon
            onClick={() => {
              dispatch(showSideNav());
            }}
            icon={faBars}
            size="xl"
            className=" hover:bg-slate-300 active:bg-slate-600 bg-slate-400 p-2 rounded-md md:hidden "
          />
        )}{" "}
      </nav>
      <SideNav />;
    </>
  );
};
export default Navbar;
