import React, { useState } from 'react';
import tutorialImage1 from './img-tutorial/tutorialimg1.png';
import tutorialImage2 from './img-tutorial/tutorialimg2.png';

const Tutorial = () => {
  // State to keep track of the user's choice
  const [choice, setChoice] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to process the user's choice
    alert(`You have chosen to ${choice}`);
  };

  

  return (
    <div>
      {/* Nav Bar */}
      <nav class="bg-[#E2E2E2]">
          <div class="flex justify-between mr-5 ml-5 py-2">
              {/* General Area (Left side) */}
              <div class="flex items-center space-x-1">
                  <div class="font-bold">(Logo) EduSynth</div>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Prompt">A.I. Page</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SavedContent">Saved Content</a>
                  <a className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]" href="/Tutorial">Tutorial</a>
              </div>

              {/* User Area (Right side) */}
              <div class="flex items-center space-x-1">
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Profile">Profile</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/Login">Log In</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black">Log Out</a>
                  <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SignUp">Sign Up</a>
              </div>
          </div>
      </nav>

      {/* Content */}
      <div className="tutorial h-screen grid place-items-center">
        <div className="grid place-items-center rounded-lg px-[100px] py-[30px] text-center bg-[#E2E2E2] border-[3px] border-black" >
          <h1 className="font-bold text-2xl">Welcome to the AI Content Converter!</h1>
          <img src={tutorialImage1} alt="Image of prompt page" /> 
          <p>
            This website allows you to convert your teaching material into the format you need or generate fresh content using AI.
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              What would you like to do?
              <select value={choice} onChange={(e) => setChoice(e.target.value)}>
                <option value="">Select an option</option>
                <option value="convert existing material">Convert Existing Material</option>
{/*                 <option value="generate new content">Generate New Content</option> */}
              </select>
            </label>
          </form>

          {choice === 'convert existing material' && (
            <div className="grid place-items-center">
              <h2 className="font-bold text-1xl pt-[50px]">How to Convert Existing Material</h2>
              <img src={tutorialImage2} alt="Image of styling options" /> 
              <p>
                Step 1: Enter a context of the study materials you are uploading.<br />
                Step 2: Choose the target grade level.<br />
                Step 3 (optional): Enter a prompt to note any specific request and choose styling options for the presentation.<br />
                Step 4: Click 'Prompt' and wait for the process to complete.<br />
              </p>
            </div>
          )}

{/*           {choice === 'generate new content' && (
            <div>
              <h2 className="font-bold text-1xl pb-[200px] pt-[50px]">How to Convert Existing Material</h2>
              <p>
                Step 1: Enter a prompt describing the content you need.<br />
                Step 2: Choose the type of content (text, image, etc.).<br />
                Step 3: Click 'Generate' and wait for the AI to create your content.<br />
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
