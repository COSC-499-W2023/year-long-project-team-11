import React, { useState, useEffect } from "react";
import "./css/login.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
      // Fetch the username using Axios
      axios.get("http://localhost:8000/")
      .then(response => {
        
          setUserData(response.data[0]);
      })
      .catch(error => {
          console.error("Error fetching user data:", error);
      });
}, []); // The empty dependency array ensures that the effect runs only once after the initial render
// 
    return (
<div className="h-screen grid place-items-center">
  <div className="rounded-lg w-500 h-500 px-[100px] py-[30px] bg-[#E2E2E2] border-[3px] border-black" 
  id="user-profile-box">
    <div className="flex">

        {/* Left Column  */}
      <div className="w-[30%] p-4 flex flex-col items-center" id="left-box">
        <img alt="User Symbol" className="grid place-items-center" src={require("./img/symbol-user.png")} height={140} width={100} />
            <p className="text-[#19747E] font-bold text-2xl">{userData.username}</p>
      </div>

        {/* Right Column */}
      <div className="grid place-items-center w-[70%] p-4 " id="right-box">
            <p className="text-[#19747E] font-bold text-2xl">Name's Public Materials</p>

            <div className="flex">

                <div className=" bg-gray-200 w-1/2 p-2 m-2 rounded-lg">
                    {/* Add content for the first column */}
                    <p className="text-gray-800 bg-white px-2 mb-3 rounded-lg font-bold" id="title">Column Title</p>

                    <p className="text-gray-700 bg-white  px-2 py-1 rounded-lg text-sm mb-2" id="tag">Tag 1</p>
                    <p className="text-gray-700 bg-white  px-2 py-1 rounded-lg text-sm mb-2" id="tag">Tag 2</p>

                </div>

                <div className=" bg-gray-200 w-1/2 p-2 m-2 rounded-lg">
                    {/* Add content for the second column */}
                    <p className="text-gray-800 bg-white px-2 mb-3 rounded-lg font-bold"  id="title">Column Title</p>

                    <p className="text-gray-700 bg-white  px-2 py-1 rounded-lg text-sm mb-2" id="tag">Tag 1</p>

                </div>

            </div>

      </div>

    </div>
  </div>
</div>

    )
}