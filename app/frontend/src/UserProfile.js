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
  const [searchTerm, setSearchTerm] = useState(""); // State for managing search term

  useEffect(() => {
    // Function to fetch data based on the current page and search term
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/savedcontent/?page=${currentPage}&search=${searchTerm}`);
        // Assuming your backend returns an array of posts, and a flag indicating if there's a next page
        setPosts(response.data.results || []); // Adjust based on your actual API response structure
        setHasNext(response.data.next != null); // Adjust based on your actual API response structure
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]); // Effect runs on mount and when currentPage or searchTerm changes

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Optionally reset to the first page on a new search
  };

  const handleNext = () => {
    if (hasNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      axios.delete("http://localhost:8000/delete_account/", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      })
      .then(() => {
        alert("Account deleted successfully.");
        navigate("/login"); // Navigate to login page after deletion
      })
      .catch(error => {
        console.error("Error deleting account:", error);
        alert("Failed to delete account.");
      });
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-[#E2E2E2]">
        {/* Navigation Bar Content */}
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Main Content */}
      <div className="h-screen grid place-items-center">
        {/* Content and Styling */}
        {posts.length === 0 ? (
          <div>No Saved Files</div>
        ) : (
          <div className="posts-container">
            {posts.map((post) => (
              <Post key={post.id} /* props based on your Post component */ />
            ))}
            <div className="pagination">
              {currentPage !== 1 && (
                <button onClick={handlePrevious}>Previous</button>
              )}
              {hasNext && <button onClick={handleNext}>Next</button>}
            </div>
          </div>
        )}
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}
