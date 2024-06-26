import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // See if user is logged in
  if (localStorage.getItem('loggedIn') === 'true') {
    window.location.href = "/Prompt";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    // SQL Injection dummy check
    const maliciousPatterns = ["SELECT", "DROP", ";--", "INSERT", "DELETE"];
    if (
      maliciousPatterns.some(
        (pattern) =>
          username.toUpperCase().includes(pattern) ||
          email.toUpperCase().includes(pattern)
      )
    ) {
      alert("Potential SQL injection detected!");
      return;
    }

    // Email format check
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));

    // Password length check
    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is too short",
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));

    // Password contains at least 1 number
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "PW needs one number & symbol",
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));

    // Password contains at least 1 symbol
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!hasSymbol.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "PW needs one number & symbol",
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));

    // Password match check
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: "",
    }));

    const user = {
      email: email,
      username: username,
      password: password,
    };

    // Create the POST requuest
    console.log("Stuck on post!");
    // var responseCode = 200;
    // axios
    //   .post("http://localhost:8000/add/", {
    //     email: email,
    //     username: username,
    //     password: password,
    //   })
    //   .catch((err) => {
    //     responseCode = err.response.status;
    //     return err;
    //   });

    // if (responseCode !== 200) {
    //   alert("Field is invalid!");
    //   return;
    // }
    
    // console.log("Successfully created an account: " + email);
    // window.location.href = "/Login";

    // Fetch API method
    fetch("http://localhost:8000/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log("Successfully created an account: ", data);
        window.location.href = "/Login";
      })
      .catch(error => {
        return error;
      });
  };

  return (
    <div>
      {/* Nav Bar */}
      <nav class="bg-[#E2E2E2]">
          <div class="flex justify-between mr-5 ml-2 py-2">
              {/* General Area (Left side) */}
              <div class="flex items-center space-x-1">
                  {/* <div class="font-bold">(Logo) EduSynth</div> */}
                  <a href="/Prompt"><img alt="Edusynth Logo" src={require("./img/logo/logo-landscape.png")} height={60} width={100} /></a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Prompt">A.I. Page</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SavedContent">Saved Content</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Tutorial">Tutorial</a>
              </div>

              <div>
                <p className="text-[#44566B] py-3 px-3">{localStorage.getItem("username")}</p>
              </div>

              {/* User Area (Right side) */}
              <div class="flex items-center space-x-1">
                  <a hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/UserProfile">Profile</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>
                  <a hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/Logout">Log Out</a>
                  <a className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]" href="/SignUp">Sign Up</a>
              </div>
          </div>
      </nav>

      {/* Content */}
      <div className="h-screen grid place-items-center">
        <div className="px-[100px] py-[30px] grid place-items-center rounded-lg border-[3px] border-black bg-[#E2E2E2] text-center">
          <h2 className="font-bold text-2xl pb-[10px]">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <p className={`h-5 text-red-500 text-sm whitespace-normal ${errors.firstName ? "visible" : "invisible"}`}>{errors.firstName}</p>
            <input
              className="py-[5px] bg-white text-center rounded-lg w-[100%]"
              type="text"
              name="username"
              placeholder="Username"
              maxLength={100}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email */}
            <p className={`h-5 text-red-500 text-sm whitespace-normal ${errors.email ? "visible" : "invisible"}`}>{errors.email}</p>
            <input
              className="py-[5px] bg-white text-center rounded-lg w-[100%]"
              type="text"
              name="email"
              placeholder="Email"
              maxLength={100}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="w-52 md:w-52">
            <p className={`h-5 text-red-500 text-sm whitespace-normal ${errors.password ? "visible" : "invisible"}`}>{errors.password}</p>
              <div className="relative flex items-center mb-2">
                <input
                  className="py-[5px] bg-white text-center rounded-lg w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  maxLength={100}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a className="absolute right-0 mr-[-2.5rem] flex items-center justify-center w-8 h-8 border-2 border-black rounded-full text-black font-bold no-underline hover:bg-gray-200" data-tooltip-id="password" data-tooltip-content="Password must be at least 6 characters long, and contain at least 1 number and 1 symbol each." data-tooltip-place="top">i</a>
                <Tooltip id="password" />
              </div>
            </div>

            {/* Confirm Password */}
            <p className={`h-5 text-red-500 text-sm whitespace-normal ${errors.confirmPassword ? "visible" : "invisible"}`}>{errors.confirmPassword}</p>
            <input
              className="py-[4px] bg-white text-center rounded-lg w-[100%]"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              maxLength={100}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <p className="text-sm pt-[2px] pb-[20px]">
              Already have an account?&#160;
              <Link to={"/Login"}>
                <div className="text-[#44566B] underline">
                  Sign In
                </div>
              </Link>
            </p>

            <button
              className="bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] w-[100%]"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}