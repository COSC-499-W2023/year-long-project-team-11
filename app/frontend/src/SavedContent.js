import React, { useState, useEffect } from "react";
import Post from "./components/Post";

export default function SavedContent() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/savedcontent/?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        setHasNext(data.hasNext);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [currentPage])

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

      <div className="h-screen items-center justify-center flex flex-col">
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
  );
}
