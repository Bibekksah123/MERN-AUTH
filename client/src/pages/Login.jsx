import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Appcreatecontext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { backendUrl, setIsloggedin,getuerdata } = useContext(Appcreatecontext);
 // console.log(backendUrl)
  const [createdlogin, setCreatedlogin] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hadlersubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (createdlogin === "Sign Up") {
        const { data } = await axios.post("http://localhost:3000/api/auth/register",{name,email,password});
        console.log(data);
        if (data.Success) {
          setIsloggedin(true);
          getuerdata()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("http://localhost:3000/api/auth/login",{email,password});
        if (data.Success) {
          setIsloggedin(true);
          getuerdata()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {createdlogin === "Sign Up"
            ? "Create Your Account"
            : "Login To Your Account!"}
        </h2>
        <p className="text-sm text-center mb-6">
          {createdlogin === "Sign Up"
            ? "Create Your Account"
            : "Login To Your Account!"}
        </p>
        <form onSubmit={hadlersubmit}>
          {createdlogin === "Sign Up" && (
            <div className="mb-4 px-1 flex items-center gap-3 w-full py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none"
              />
            </div>
          )}
          <div className="mb-4 px-1 flex items-center gap-3 w-full py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none"
            />
          </div>
          <div className="mb-4 px-1 flex items-center gap-3 w-full py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none"
            />
          </div>
          <p
            className="cursor-pointer mb-3 text-slate-300"
            onClick={() => navigate("/reset")}
          >
            Forget Password?
          </p>
          <button className="w-full py-2 cursor-pointer rounded-full bg-gradient-to-b from-indigo-500 to-indigo-900">
            {createdlogin}
          </button>
          {createdlogin === "Sign Up" ? (
            <p className="text-gray-400 text-sm text-center mt-4">
              Already Have an Account?{" "}
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => setCreatedlogin("Login")}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-sm text-center mt-4">
              Don't Have an Account?{" "}
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => setCreatedlogin("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
