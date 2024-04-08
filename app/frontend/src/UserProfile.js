import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import "./css/login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import defaultUserSymbol from "./img/symbol-user.png";
export default function UserProfile() {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultUserSymbol); // State for the profile image
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetch(`http://localhost:8000/savedcontent/?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts.filter(function(post) {
          return post.userid == userID;
        }))
        setHasNext(data.hasNext);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [currentPage])

  useEffect(() => {
    axios.get('http://localhost:8000/currentuser/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
    })
    .then(response => {
        console.log(response.data);
        if(response.data.userSymbol_url !== null)
          setProfileImage(`http://localhost:8000${response.data.userSymbol_url}`);
        console.log(profileImage);
        console.log(userData.userSymbol_url);
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}, []); // Empty dependency array means this effect runs once on component mount


  const handleNext = () => {
    if (hasNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the profile image preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        // Optionally, call the uploadImage function here to automatically upload after selection
        // uploadImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = (imageBase64) => {
    axios.put('http://localhost:8000/uploadprofilepicture/', { userSymbol: imageBase64 }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then(response => {
      console.log('Image uploaded successfully:', response.data);
      // Update user profile or state as necessary
    })
    .catch(error => {
      console.error('Error uploading the image:', error);
    });
  };


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
                <label htmlFor="image-upload" className="cursor-pointer">
                  <img src={profileImage} alt="User Symbol" height={140} width={100} />
                </label>
                <input id="image-upload" type="file" onChange={handleImageChange} style={{display: 'none'}}/>
                <button onClick={() => uploadImage(profileImage)}>Upload Image</button>
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