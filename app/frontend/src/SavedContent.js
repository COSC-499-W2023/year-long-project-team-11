import React, { useState,useEffect } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import { useLocation } from 'react-router-dom';

const SavedContent = () => {
  const [paragraph, setParagraph] = useState('Your paragraph of words goes here.');
  const [downloadLink, setDownloadLink] = useState("");

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([paragraph], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'paragraph.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const location=useLocation();
  const data = location.state;
  
  useEffect(() => {
    if (data) {
      console.log(data)
      const output= data.output;
      const link = data.download;
      setParagraph(output);
      setDownloadLink(link);
    }
  }, [data]);

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
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/UserProfile">Profile</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Logout">Log Out</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>
              </div>
          </div>
      </nav>

      {/* Content */}
      <div className="savedcontent flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Title of Content</h1>
          <p className="text-lg mb-4">Content Type</p>  
          <div className="my-8">
            <p>{paragraph}</p>
          </div>
          <div className="flex justify-between items-center">
          <div className='buttons flex flex-row'>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4" onClick={() => window.location.href = downloadLink}>Download</button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Share</button>
          </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedContent;
