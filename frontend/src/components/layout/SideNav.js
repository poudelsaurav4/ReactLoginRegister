import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideSideNav } from "../../store/Slices/NavSlice";
import store from "../../store/Store";
import { isLoggedout } from "../../store/Slices/NavSlice";
import { logOut } from "../../store/Slices/AuthSlice";
const SideNav = () => {
  const [width, setWidth] = useState();
  const navigate = useNavigate();
  const show = useSelector((state) => state.nav.show);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();
    if (width < 765 && show) {
      function call() {
        dispatch(hideSideNav());
        console.log("Here");
      }
      call();
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth, width]);

  return (
    <>
      {show && (
        <div className="md:hidden absolute top-0 right-0 w-56 h-screen shadow bg-gray-100  px-2 py-4  z-10">
          <div className="flex justify-between items-center">
            <div
              className="flex justify-start items-center  space-x-2 cursor-pointer  hover:text-indigo-500 "
              onClick={() => navigate("/developer")}
            >
              <FontAwesomeIcon icon={faCircleNodes} size="xl" />
              <h1 className="  text-xl font-semibold leading-6 text-gray-800">
                Dev Connect
              </h1>
            </div>

            <FontAwesomeIcon
              onClick={() => {
                dispatch(hideSideNav());
              }}
              icon={faXmark}
              size="lg"
              className=" hover:bg-slate-300 active:bg-slate-600 bg-slate-400 p-2 rounded-md "
            />
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-col space-y-4">
            <a
              href="/developer"
              className="text-lg font-semibold hover:text-indigo-500"
            >
              Developers
            </a>
            {!isAuth ? (
              <>
                {" "}
                <button
                  onClick={() => navigate("/register")}
                  className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-indigo-700 bg-white border border-indigo-700  hover:bg-gray-200  justify-center items-center"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-indigo-700  hover:bg-indigo-600 active:bg-indigo-900 justify-center items-center"
                >
                  Sign In
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  store.dispatch(logOut());
                  store.dispatch(isLoggedout());
                  window.location.href = "/login";
                }}
                className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-red-700  hover:bg-red-600 active:bg-red-900 justify-center items-center"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
