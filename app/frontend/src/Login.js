import React, { useState, useEffect } from "react";
import "./css/login.css";
import users from "./tests/loginTest.json";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // const cors = require('cors');
  // app.use(cors());

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Frontend check if valid email
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      setPassword("");
      return;
    }

    setEmailError("");
    // const user = users.find(user => user.email === email)

    // Frontend check if valid password
    // if (user && user.password === password) {
    //     setPasswordError('')
    // } else {
    //     setPasswordError("Invalid email or password. Please try again.")
    // }
    // setPassword('')

    // ==========================================================================================

    const user = {
      email: email,
      password: password,
    };
    // Create the POST requuest
    console.log("Stuck on post!");
    var responseCode = 200;
    const { data } = await axios
      .post(
        "http://localhost:8000/token/",
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          "Access-Control-Allow-Credentials": true,
        }
      )
      .catch((err) => {
        responseCode = err.response.status;
        return err;
      });
    console.log("Response Code: " + responseCode);

    if (responseCode != 200) {
      alert("Username or password is incorrect!");
      return;
    } else {
      alert("Success!");
    }
    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = "Bearer ${data['access']}";

    window.open("http://localhost:3000");
    // window.open("/");

    // ==========================================================================================

    // Create the POST request
    // const login = "http://localhost:8000";

    // fetch(login, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         email: email,
    //         password: password
    //     })
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log("===========================");
    //     console.log(data);
    //     console.log("+++++++++++++++++++++++++++");
    //     if (data.error) {
    //         // setPasswordError("Invalid email or password. Please try again.")
    //         alert("Error Password or Username"); /*displays error message*/
    //     } else {
    //         // Successful login
    //         console.log("Logged in as " + email);
    //         window.open("http://localhost:3000");
    //         // window.location.href = "http://localhost:3000";
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="grid place-items-center">
        <div
          className="grid place-items-center rounded-lg w-500 h-500 px-[100px] py-[30px] text-center bg-[#E2E2E2] border-[3px] border-black"
          id="main-signin-box"
        >
          <img
            className="py-[10px]"
            src={require("./img/symbol-user.png")}
            height={100}
            width={70}
          />
          <h2 className="font-bold text-2xl pb-[10px]">Sign In</h2>

          {/* Form (email, password, remember me, and forgot password) */}
          <form onSubmit={handleLogin}>
            {/* Email */}

            <div className="py-[5px]">
              <input
                className="bg-white text-center rounded-lg"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                maxLength="100"
                required
                value={email}
                // Set email here
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="text-sm text-red-500">&nbsp;{emailError}</p>
            {/* Password */}
            <div className="py-[5px]">
              <input
                className="bg-white text-center rounded-lg"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                maxLength="100"
                required
                value={password}
                // Set password here
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-sm text-red-500">&nbsp;{passwordError}</p>
            {/* Submission of form */}
            <div className="py-[5px]">
              <input
                type="checkbox"
                id="rememberme"
                name="rememberme"
                className="mr-1"
              />
              <label htmlFor="rememberme" className="text-black">
                Remember Me
              </label>
            </div>
            <button
              className="grid place-items-center bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] w-[100%]"
              type="submit"
            >
              Sign In
            </button>
            {/* Remember me */}
            <p className="pt-[5px]">
              <a className="text-[#19747E]" href="#">
                Forgot Your Password?
              </a>
            </p>
          </form>
        </div>

        {/* Create account */}
        <p>
          Don't have an account?&#160;
          <Link to={"/SignUp"}>
            <a className="text-[#44566B] underline" href="#">
              Create an account
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
