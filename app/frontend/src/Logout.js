import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Logout() {
const [userData, setUserData] = useState({});

  // See if user is logged in
  useEffect(() => {
    // Fetch the username using Axios
    axios.get("http://localhost:8000/", {
      headers: {
          'Authorization': 'Bearer '.concat(localStorage.getItem('access_token'))
      }
    })
    .then(response => {
        setUserData(response.data[0]);
    })
    .catch(error => {
        if (error.code === "ERR_BAD_REQUEST") {
          // User is not logged in
          window.location.href = "/Login";
        } else {
          // User is logged in
        }
    });
  }, []); 

  const handleLogout = async (e) => {
    try {
      localStorage.clear();
      window.location.href = '/Landing';
    } catch (e) {
      console.log('Logout is not working', e)
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
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/UserProfile">Profile</a>
                  <a hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>
                  <a className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]">Log Out</a>
                  <a hidden className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>
              </div>
          </div>
      </nav>

      {/* Content */}
      <div className="logout-background text-xl flex justify-center items-center h-screen " >
        <div className="card font-sans p-12 border-[3px] border-black rounded-lg bg-[#E2E2E2]">
          <h2 className='text-center font-bold text-4xl'>Sign Out</h2>
          <br></br>
          <p className='font-medium'>You are signing out of AI Generator</p>
          <p className='font-medium'>Do you want to logout?</p>
          <br></br>
          <div className='buttons'>
            <button onClick={handleLogout} className='bg-[#19747E] text-white py-2 rounded hover:bg-[#316268] w-[100%]'>Log Out</button>
            {/* <button onClick={handleLogout} className='bg-white text-black py-2 mt-4 rounded hover:bg-[#e2e2e2] w-[100%]'>Go back home</button> */}
          </div>

        </div>
      </div>
    </div>
  )
}
