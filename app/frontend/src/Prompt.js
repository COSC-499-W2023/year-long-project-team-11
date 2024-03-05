import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

export default function Prompt() {
  const [targetGrade, setTargetGrade] = useState("");
  const [file, setFile] = useState(null);
  const [context, setContext] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [filename, setFilename] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontColor, setFontColor] = useState("black");
  const [fontType, setFontType] = useState("Arial");
  const [showStyleOptions, setShowStyleOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const csrfToken = Cookies.get("csrftoken");

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

  const getColorCode = (color) => {
    switch(color) {
      case "black":
        return "rgb(0, 0, 0)";
      case "white":
        return "rgb(255, 255, 255)";
      case "lightblue":
        return "rgb(135, 206, 235)";
      case "cream":
        return "rgb(255, 253, 208)";
      case "grey":
        return "rgb(128, 128, 128)";
      default:
        return "rgb(0, 0, 0)";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    console.log(prompt);
    console.log(context);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);
    formData.append("ctx", context);
    formData.append("targetGrade", targetGrade);
    formData.append("backgroundColor", backgroundColor);
    formData.append("fontColor", fontColor);
    formData.append("fontType", fontType);

    fetch("http://localhost:8000/api/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setOutput(data.response);
        // setFilename(data.filename);
        setFilename("test");
        navigate('/Regenerate', { state : { output: data.response, filename: data.filename, documentText: data.file_text, fontColor: data.style.fontcolor, fontType: data.style.fonttype, backgroundColor: data.style.bg } });
        // navigate('/SavedContent', { state: { output: data.response, filename: data.filename } });
        console.log(filename);
        console.log(data.response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };
  const handleSave= () =>{
    fetch("http://localhost:8000/save_output/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ output: output }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Save response:", data);
    })
    .catch((error) => {
        console.error("Error saving:", error);
    });
  };

  return (
    <div>
      {isLoading ? (
        <div className="h-screen grid place-items-center">
          <MoonLoader 
            size={80}
            loading={isLoading}
          />
        </div>
      ) : (
      <div>
        {/* Nav Bar */}
        <nav class="bg-[#E2E2E2]">
            <div class="flex justify-between mr-5 ml-2 py-2">
                {/* General Area (Left side) */}
                <div class="flex items-center space-x-1">
                    {/* <div class="font-bold">(Logo) EduSynth</div> */}
                    <img alt="Edusynth Logo" src={require("./img/logo/logo-landscape.png")} height={60} width={100} />
                    <a className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]" href="/Prompt">A.I. Page</a>
                    <a className="text-[#44566B] py-3 px-3 hover:text-black" href="/SavedContent">Saved Content</a>
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
        <div className="h-screen grid place-items-center">
          <div className="rounded-lg px-[50px] py-[30px] bg-[#E2E2E2] border-[3px] border-black text-left">
            {output.length !== 0 && (
              <div className="my-[10px]">
                <p>{output}</p>
                <a href={`http://localhost:8000/api/presentations/${filename}`}>Download</a>
                <button onClick={handleSave} className="bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] p-2" type="submit">Save</button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <h2 className="text-center font-bold text-2xl">Generate a Presentation</h2>
                <div className="py-4 border-b-[1px] border-slate-400">
                  <p className="py-1">Upload the materials you would like to use as a base</p>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="application/pdf, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                  />
                </div>

                <div className="py-4 border-b-[1px] border-slate-400">
                  <select
                    id="targetGrade"
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    className="bg-white border border-black rounded-sm p-1"
                    required
                  >
                    <option value="" hidden>
                      Target Grade Level
                    </option>
                    {[...Array(12).keys()].map((grade) => (
                      <option key={grade + 1} value={grade + 1}>
                        Grade {grade + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="py-4 border-b-[1px] border-slate-400">
                  <p className="py-1">Give some context about the file you are uploading: </p>
                  <input
                    className="border border-black rounded-md min-w-[500px] px-2"
                    type="text"
                    placeholder="(e.g. a university computer science course)"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    required
                  />
                </div>

                <div className="py-4 border-b-[1px] border-slate-400">
                  <p className="py-1">(Optional) Enter any specific requests</p>
                  <input
                    className="border border-black rounded-md min-w-[500px] px-2"
                    type="text"
                    placeholder="Any further requests?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                      
                <div className="py-4">
                  <button
                    onClick={() => setShowStyleOptions(!showStyleOptions)}
                    className="bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] p-2"
                    type="button"
                  >
                    {showStyleOptions ? "Hide Style Options" : "Show Style Options"}
                  </button>
                </div>
                
                <div
                  style={{
                    maxHeight: showStyleOptions ? "500px" : "0",
                    overflow: 'hidden',
                    transition: 'max-height 0.2s ease-out',
                  }} 
                  className="origin-top bg-neutral-300 rounded-lg"
                >
                  <div className="py-2">
                    <label htmlFor="backgroundColor" className="px-2">Background Color:</label>
                    <select
                      id="backgroundColor"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="bg-white border border-black rounded-sm p-1"
                    >
                      <option value="white">White</option>
                      <option value="black">Black</option>
                      <option value="grey">Grey</option>
                      <option value="cream">Cream</option>
                      <option value="lightblue">Light Blue</option>
                    </select>
                    <div
                      style={{backgroundColor: getColorCode(backgroundColor)}} 
                      className="align-middle w-[20px] h-[20px] inline-block ml-[10px] border border-black"></div>
                  </div>

                  <div className="py-2">
                    <label htmlFor="fontColor" className="px-2">Font Color:</label>
                    <select
                      id="fontColor"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      className="bg-white border border-black rounded-sm p-1"
                    >
                      <option value="black">Black</option>
                      <option value="white">White</option>
                    </select>
                    <div
                      style={{backgroundColor: getColorCode(fontColor)}} 
                      className="align-middle w-[20px] h-[20px] inline-block ml-[10px] border border-black"></div>
                  </div>

                  <div className="py-2">
                    <label htmlFor="fontType" className="px-2">Font Type:</label>
                    <select
                      id="fontType"
                      value={fontType}
                      onChange={(e) => setFontType(e.target.value)}
                      className="bg-white border border-black rounded-sm p-1 w-auto"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Courier">Courier</option>
                      <option value="Georgia">Georgia</option>
                    </select>
                  </div>
                </div>

                <div className="mt-[20px]">
                  <button
                    className="bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] p-2"
                    type="submit"
                    disabled={isLoading}
                  >
                    Prompt
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}