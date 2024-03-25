import React, { useState, useEffect } from "react";
import "./css/login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function UserProfile() {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
          setUserData(result[0]);
      })
      .catch(error => {
          if (error.code === "ERR_BAD_REQUEST") {
            // User is not logged in
            window.location.href = "/Login";
          } else {
            console.error("Error fetching user data:", error);
          }
      });

      console.log(localStorage.getItem('access_token'));
      console.log(localStorage.getItem('username'));
      console.log(localStorage.getItem('userID'));
    }, []);

  // Deletion Function
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      axios.delete("http://localhost:8000/delete_account/", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      })
      .then(response => {
        alert("Account deleted successfully.");
        navigate("/login"); // Navigate to login or home page after deletion
      })
      .catch(error => {
        console.error("Error deleting account:", error);
        alert("Failed to delete account.");
      });
    }
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
                  <a className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]" href="/UserProfile">Profile</a>
                  <a hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Logout">Log Out</a>
                  <a hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>
              </div>
          </div>
        </nav>

      {/* Content */}
      <div className="h-screen grid place-items-center">
        <div className="rounded-lg w-500 h-500 px-[100px] py-[30px] bg-[#E2E2E2] border-[3px] border-black" 
        id="user-profile-box">
          <div className="flex">

              {/* Left Column  */}
            <div className="w-[30%] p-4 flex flex-col items-center" id="left-box">
              <img alt="User Symbol" className="grid place-items-center" src={require("./img/symbol-user.png")} height={140} width={100} />
                  <p className="text-[#19747E] font-bold text-2xl">{userData.username}</p>

              {/* Add Delete Account Link */}
              <span className="text-[#19747E] cursor-pointer hover:text-red-600" onClick={handleDeleteAccount}>
                Delete Account
              </span>

            </div>

              {/* Right Column */}
            <div className="grid place-items-center w-[70%] p-4 " id="right-box">
                  <p className="text-[#19747E] font-bold text-2xl">{userData.username}'s Public Materials</p>

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
      </div>

    )
}