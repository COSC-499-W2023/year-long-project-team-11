import React from "react";

export default function SavedContent() {
  const isLoggedIn = localStorage.getItem('access_token') ? true : false;
  const username = localStorage.getItem("username");
  return (
    <div>
      <nav className="bg-[#E2E2E2]">
        <div className="flex justify-between mr-5 ml-2 py-2">
          <div className="flex items-center space-x-1">
            <a href="/Prompt"><img alt="Edusynth Logo" src={require("./img/logo/logo-landscape.png")} height={60} width={100} /></a>
            <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Prompt">A.I. Page</a>
            <a className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]" href="/SavedContent">Saved Content</a>
            <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Tutorial">Tutorial</a>
          </div>

          <div>
            <p className="text-[#44566B] py-3 px-3">{username}</p>
          </div>

          <div className="flex items-center space-x-1">
            {isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/UserProfile">Profile</a>}
            {!isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>}
            {isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Logout">Log Out</a>}
            {!isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>}
          </div>
        </div>
      </nav>

      <div className="h-screen grid place-items-center">
        <div className="rounded-lg px-[50px] py-[30px] bg-[#E2E2E2] border-[3px] border-black text-left">
          {/* Content goes here */}
          <h1> No Saved Files</h1>
        </div>
      </div>
    </div>
  );
}
