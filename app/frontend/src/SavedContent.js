import React, { useState, useEffect } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const SavedContent = () => {
  const [paragraph, setParagraph] = useState('Your paragraph of words goes here.');
  const [filename, setFilename] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [postId, setPostId] = useState(0);
  const [comment, setComment] = useState("");

  // If user is logged in
  // if (localStorage.getItem('access_token')) {
  //   setTimeout(function() {
  //     document.getElementById('login-option').style.display = 'none'; //Will hide
  //     document.getElementById('signup-option').style.display = 'none';
  //   },20);
  // } else {
  //   setTimeout(function() {
  //     document.getElementById('profile-option').style.display = 'none';
  //     document.getElementById('logout-option').style.display = 'none';
  //   },20);
  // }

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (data) {
      console.log(data)
      const output = data.output;
      const filename = data.filename;
      setParagraph(output);
      setFilename(filename);
      setTitle(data.title);
      setTags(data.tags);
      setPostId(data.postid);
    }
  }, [data]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      // Adjust the URL to match your Django backend endpoint
      const response = await axios.post('http://localhost:8000/addcomment/', {
        userid: localStorage.getItem("userID"),
        postid: postId,
        comment: comment,
        // Include any other data your backend requires
      });
      console.log('Comment submitted:', response.data);
      setComment(''); // Clear the comment box after successful submission
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const file = `http://localhost:8000/api/presentations/presentation_20240212051521.pptx/`;
  const fileType = "pptx";

  const docs = [
    { uri: `http://localhost:8000/api/presentations/${data.filename}` }, // Local File
  ];

  return (
    <div>
      {/* Nav Bar */}
      <nav class="bg-[#E2E2E2]">
        <div class="flex justify-between mr-5 ml-2 py-2">
          {/* General Area (Left side) */}
          <div class="flex items-center space-x-1">
            {/* <div class="font-bold">(Logo) EduSynth</div> */}
            <img alt="Edusynth Logo" src={require("./img/logo/logo-landscape.png")} height={60} width={100} />
            <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Prompt">A.I. Page</a>
            <a className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]" href="/SavedContent">Saved Content</a>
            <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Tutorial">Tutorial</a>
          </div>

          <div>
            <p className="text-[#44566B] py-3 px-3">{localStorage.getItem("username")}</p>
          </div>

          {/* User Area (Right side) */}
          <div class="flex items-center space-x-1">
            <a id='profile-option' className="text-[#44566B] py-3 px-3 hover:text-black" href="/UserProfile">Profile</a>
            <a id='login-option' className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>
            <a id='logout-option' className="text-[#44566B] py-3 px-3 hover:text-black" href="/Logout">Log Out</a>
            <a id='signup-option' className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="savedcontent flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Title of Content</h1>
          <p className="text-lg mb-4">Content Type</p>
          <div className="my-8">
            <div>
              <DocViewer documents={[{ uri: `http://localhost:8000/api/presentations/presentation_20240212051521.pptx/`, fileType: "pptx" }]} pluginRenderers={DocViewerRenderers} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <form onSubmit={handleSubmitComment} className="mt-4">
              <textarea
                className="w-full p-2 text-lg border rounded-md"
                placeholder="Write a comment about the output..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                Submit Comment
              </button>
            </form>
            <div className='buttons flex flex-row'>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4" onClick={() => window.location.href = `http://localhost:8000/api/presentations/${filename}?download=true`}>Download</button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedContent;
