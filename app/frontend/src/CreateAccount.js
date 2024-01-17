import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        password: "Password must contain at least one number and symbol",
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
        password: "Password must contain at least one number and symbol",
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

    // ====================== ADD FUNCTIONALITY HERE ======================
    const user = {
      email: email,
      username: username,
      password: password,
    };

    // Create the POST requuest
    console.log("Stuck on post!");
    var responseCode = 200;
    axios
      .post("http://localhost:8000/add/", {
        email: email,
        username: username,
        password: password,
      })
      .catch((err) => {
        responseCode = err.response.status;
        return err;
      });

    if (responseCode != 200) {
      alert("Field is invalid!");
      return;
    } else {
      alert("Success!");
    }
    console.log("Successfully created an account: " + email);
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="px-[100px] py-[30px] grid place-items-center rounded-lg border-[3px] border-black bg-[#E2E2E2] text-center">
        <h2 className="font-bold text-2xl pb-[10px]">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <p className="text-sm text-red-500">&nbsp;{errors.firstName}</p>
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
          <p className="text-sm text-red-500">&nbsp;{errors.email}</p>
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
          <p className="text-sm text-red-500">&nbsp;{errors.password}</p>
          <input
            className="py-[5px] bg-white text-center rounded-lg w-[100%]"
            type="password"
            name="password"
            placeholder="Password"
            maxLength={100}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <p className="text-sm text-red-500">&nbsp;{errors.confirmPassword}</p>
          <input
            className="py-[5px] bg-white text-center rounded-lg w-[100%]"
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
              <a href="#" className="text-[#44566B] underline">
                Sign In
              </a>
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
  );
}
