import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { register } from "../../API/Auth";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../HOC/Toast";
// import { successToast, showErrorToastMessage } from "../HOC/Toast";
function Register() {
  const [showpass, setShowPass] = useState(false);
  const [showCpass, setCShowPass] = useState(false);
  const [match, setMatch] = useState(true);
  const [emailTaken,setemailtaken] = useState(true)
  const [errorMsg, setErrorMsg] = useState("");
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[2].value !== e.target[3].value) {
      errorToast("Password donot match");
      return setMatch(false);
    }
    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    register(data).then(res=>{
        if(res.msg === "Email is already taken.")
        {
          setErrorMsg(res.msg);
          setemailtaken(true)
        }
    });
  };

  return (
    <div className="h-full bg-  w-full md:p-4 lg:p-4 p-2">
      <p className="text-2xl font-extrabold leading-6 text-black text-center ">
        Register your account
      </p>

      <div className="bg-white m-auto  rounded-lg shadow-md  lg:w-6/12 md:8/12 sm:w-11/12 p-8 mt-8 ">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="text-md font-medium leading-none text-gray-800">
              Name
            </label>
            <input
              placeholder="Enter your fullname"
              type="text"
              name="name"
              className="bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
          </div>
          <div className="w-full mt-4">
            <label className="text-md font-medium leading-none text-gray-800">
              Email
            </label>
            <input
              onChange={() => {
                setemailtaken(false);
              }}
              placeholder="Enter your email"
              type="email"
              name="email"
              className="bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            {emailTaken && error && (
              <p className="text-md text-red-500 mb-4 font-semibold">
                {errorMsg}
              </p>
            )}
          </div>

          <div className=" w-full md:flex justify-between ">
            <div className="md:w-[45%] mt-4">
              <label className="text-md font-medium leading-none text-gray-800">
                Create Password
              </label>
              <div className="relative flex items-center justify-center z-1">
                <input
                  onChange={() => {
                    setMatch(true);
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
                  {showCpass ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </div>
              </div>
            </div>
            <div className="md:w-[45%] mt-4">
              <label className="text-md font-medium leading-none text-gray-800">
                Confirm Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  onChange={() => {
                    setMatch(true);
                  }}
                  id="cpassword"
                  name="cpassword"
                  placeholder="Enter your password"
                  type={showCpass ? "text" : "password"}
                  className="bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <div
                  onClick={() => setCShowPass(!showCpass)}
                  className="absolute right-0 mt-2 mr-3 cursor-pointer"
                >
                  {showCpass ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {!match && (
            <p className="text-md text-red-500 my-4 font-semibold">
              Passwords do not match !!!
            </p>
          )}

          <a
            href="/login"
            className="underline flex justify-end my-8 text-blue-500"
          >
            Already have an account? <strong>Login Here</strong>
          </a>
          <button
            type="submit"
            className="rounded-md flex space-x-2 w-36 h-14 font-normal text-md leading-3 text-indigo-700 bg-white border border-indigo-700  hover:bg-gray-200  active:bg-white  justify-center items-center"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
