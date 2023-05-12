import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../API/Auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const [showpass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [PwError, setPwError] = useState(false);

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    login(data).then((res) => {
      if (!error) {
        return navigate("/developer");
      }
      // if (error && res.msg === "Password is incorrect") {
      //   setPwError(true);
      //   setErrorMsg(res.msg);
      //   return;
      // } else {
      //   setEmailError(true);
      //   setErrorMsg(res.msg);
      // }
      navigate("/developer");
    });
  };
  return (
    <div className="h-full bg-  w-full md:p-4 lg:p-4 p-2">
      <p className="text-2xl font-extrabold leading-6 text-black text-center ">
        Login in your account
      </p>

      <div className="bg-white m-auto  rounded-lg shadow-md  lg:w-6/12 md:8/12 sm:w-11/12 p-8 mt-8 ">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <label className="text-md font-medium leading-none text-gray-800">
              Email
            </label>
            <input
              onChange={() => {
                setEmailError(false);
              }}
              placeholder="Enter your email"
              type="email"
              name="email"
              className="bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            {error && emailError && (
              <p className="text-md text-red-500 my-4 font-semibold">
                {errorMsg}
              </p>
            )}
          </div>

          <div className="w-full mt-4">
            <label className="text-md font-medium leading-none text-gray-800">
              Password
            </label>
            <div className="relative flex items-center justify-center">
              <input
                onChange={() => {
                  setPwError(false);
                }}
                id="password"
                name="password"
                placeholder="Enter your password"
                type={showpass ? "text" : "password"}
                className="bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <div
                onClick={() => setShowPass(!showpass)}
                className="absolute right-0 mt-2 mr-3 cursor-pointer"
              >
                {showpass ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </div>
            </div>
          </div>

          {error && PwError && (
            <p className="text-md text-red-500 my-4 font-semibold">
              {errorMsg}
            </p>
          )}

          <a
            href="/register"
            className="underline flex justify-end my-8 text-blue-500"
          >
            Don't have an account? <strong>Register Here</strong>
          </a>
          <button
            type="submit"
            className="rounded-md flex space-x-2 w-36 h-14 font-normal text-md leading-3 text-indigo-700 bg-white border border-indigo-700  hover:bg-gray-200   active:bg-white  justify-center items-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
