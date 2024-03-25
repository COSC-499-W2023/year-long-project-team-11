import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import "./css/login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function UserProfile() {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/savedcontent/?page=${currentPage}`)
    .then(response => {
        var values = function(x) {
          return Object.keys(x).map(function(k){return x[k]})
        }
        var result = response.data.filter(function(x) {
          // return values(x).indexOf(localStorage.getItem('email')) > -1
          return values(x)
        })
        setPosts(result[0]);
        setHasNext(result[1]);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [currentPage])

  const handleNext = () => {
    if (hasNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // useEffect(() => {
  //     // Fetch the username using Axios
  //     axios.get("http://localhost:8000/", {
  //       headers: {
  //           'Authorization': 'Bearer '.concat(localStorage.getItem('access_token'))
  //       }
  //     })
      // .then(response => {
      //     var values = function(x) {
      //       return Object.keys(x).map(function(k){return x[k]})
      //     }
      //     var result = response.data.filter(function(x) {
      //       return values(x).indexOf(localStorage.getItem('email')) > -1
      //     })
      //     setUserData(result[0]);
      // })
  //     .catch(error => {
  //         if (error.code === "ERR_BAD_REQUEST") {
  //           // User is not logged in
  //           window.location.href = "/Login";
  //         } else {
  //           console.error("Error fetching user data:", error);
  //         }
  //     });

    //   console.log(localStorage.getItem('access_token'));
    //   console.log(localStorage.getItem('username'));
    //   console.log(localStorage.getItem('userID'));
    // }, []);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

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
          <div className="items-center justify-center flex">

              {/* Left Column  */}
            <div className="w-[30%] p-4 flex flex-col items-center" id="left-box">
              <img alt="User Symbol" className="grid place-items-center" src={require("./img/symbol-user.png")} height={140} width={100} />
                  <p className="text-[#19747E] font-bold text-2xl">{localStorage.getItem("username")}</p>

              {/* Add Delete Account Link */}
              <span className="text-[#19747E] cursor-pointer hover:text-red-600" onClick={handleDeleteAccount}>
                Delete Account
              </span>

            </div>

              {/* Right Column */}
            <div className="grid place-items-center w-[70%] p-4 " id="right-box">
                  <p className="text-[#19747E] font-bold text-2xl">{localStorage.getItem("username")}'s Public Materials</p>

                  <div className="flex">

                  {posts.length === 0 ? 
          <div className="rounded-lg px-[50px] py-[30px] bg-[#E2E2E2] border-[3px] border-black text-left">
            {/* Content goes here */}
            <h1> No Saved Files </h1>
          </div>
          :
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {posts.map((post) => (
                <Post key={post.id} filename={post.filepath} title={post.title} tags={post.tag} postID={post.id} timestamp={post.timestamp} posterID={post.userid} posterUsername={post.username} />
              ))}
            </div>
            <div>
              {currentPage !== 1 && <button className="mx-1" onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>}
              {hasNext && <button className="mx-1" onClick={handleNext} disabled={!hasNext}>Next</button>}
            </div>
          </div>
        }

                  </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    )
}