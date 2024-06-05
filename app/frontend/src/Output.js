import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Comment from './components/Comment';
import { useParams } from 'react-router-dom';

const Output = () => {
  const { postId } = useParams();
  const [filename, setFilename] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [comment, setComment] = useState("");
  const [docs, setDocs] = useState([]);
  const [comments, setComments] = useState([]);
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");

  useEffect(() => {
    fetchPostData(postId);
    fetchComments(postId);
  }, [postId])

  const fetchPostData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const filename = data.filepath;
      setFilename(filename);
      let base = filename.substring(0, filename.lastIndexOf('.'));
      let previewFilename = base + ".pdf";
      setDocs([{ uri: `http://localhost:8000/api/files/${previewFilename}/` }]);
      setTitle(data.title);
      setTags(data.tags);

    } catch (error) {
      console.error("Could not fetch the post data:", error);
    }
  }

  const fetchComments = async (id) => {
    fetch(`http://localhost:8000/comments/${id}/`)
      .then((response) => response.json())
      .then((data) => { setComments(data); console.log(data) })
      .catch((error) => console.log(error));
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/addcomment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: localStorage.getItem("userID"),
          postid: postId,
          comment: comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newComment = await response.json();
      addComment(newComment);
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const copyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopyButtonText("Link copied!");

      setTimeout(() => {
        setCopyButtonText("Copy Link");
      }, 1000);
    }).catch(err => {
      console.error("Failed to copy link: ", err);
    }); 
  };

  const isLoggedIn = localStorage.getItem('access_token') ? true : false;
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
            {isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/UserProfile">Profile</a>}
            {!isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>}
            {isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Logout">Log Out</a>}
            {!isLoggedIn && <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="savedcontent flex flex-col items-center justify-center min-h-screen py-4">
        <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-4">{tags}</p>
          <div className="my-8">
            <div>
              <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className='buttons flex flex-row'>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4" onClick={() => window.location.href = `http://localhost:8000/api/files/${filename}?download=true`}>Download</button>
              <button onClick={copyLink} className="px-4 py-2 bg-gray-500 text-white rounded-md">{copyButtonText}</button>
            </div>
          </div>
          <div>
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
            <div>
              {comments.length > 0 &&
                comments.map((comment) => <Comment key={comment.id} comment={comment} />)
              }
              {!comments && <p>No comments</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Output;