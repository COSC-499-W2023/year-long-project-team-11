import React, { useState } from "react";
import "./css/login.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  localStorage.clear();

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

    if (responseCode !== 200) {
      alert("Username or password is incorrect!");
      setPasswordError("Username or password is incorrect!");
      return;
    }

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    // Fetch the username using Axios
    axios.get("http://localhost:8000/", {
      headers: {
          'Authorization': 'Bearer '.concat(localStorage.getItem('access_token'))
      }
    })
    .then(response => {
        var values = function(x) {
          return Object.keys(x).map(function(k){return x[k]})
        }
        var result = response.data.filter(function(x) {
          return values(x).indexOf(localStorage.getItem('email')) > -1
        })
        localStorage.setItem("username", result[0].username)
        localStorage.setItem("userID", result[0].id);
    })
    .catch(error => {
        if (error.code === "ERR_BAD_REQUEST") {
          // User is not logged in
          window.location.href = "/Login";
        } else {
          console.error("Error fetching user data:", error);
        }
    });

    // Set email
    localStorage.setItem("email", email)

    // Set status
    localStorage.setItem("loggedIn", true)
      
    // Finally
    window.location.href = "/Prompt";
  };

  return (
    <div>
      {/* Nav Bar */}
      <nav class="bg-[#E2E2E2]">
        <div class="flex justify-between mr-5 ml-2 py-2">
          {/* General Area (Left side) */}
          <div class="flex items-center space-x-1">
            {/* <div class="font-bold">(Logo) EduSynth</div> */}
            <img alt="Edusynth Logo" src={require("./img/logo/logo-landscape.png")} height={60} width={100} />
            <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Prompt">A.I. Page</a>
            <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SavedContent">Saved Content</a>
            <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Tutorial">Tutorial</a>
          </div>

          <div>
            <p className="text-[#44566B] py-3 px-3">{localStorage.getItem("username")}</p>
          </div>

          {/* User Area (Right side) */}
          <div class="flex items-center space-x-1">
            <a id='profile-option' hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/UserProfile">Profile</a>
            <a id='login-option' className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]" href="/Login">Log In</a>
            <a id='logout-option' hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/Logout">Log Out</a>
            <a id='signup-option' className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Content */}
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
              alt="Sign In Icon"
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
    </div>
  );
}
