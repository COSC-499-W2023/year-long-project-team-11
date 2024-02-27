import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function Regenerate() {
  const [outputString, setOutputString] = useState("<test></test>");
  const [filename, setFilename] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [documentText, setDocumentText] = useState(null);
  const [fontType, setFontType] = useState("Arial");
  const [fontColor, setFontColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [context, setContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const csrfToken = Cookies.get("csrftoken");

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (data) {
      console.log(data);
      setOutputString(data.output);
      setFilename(data.filename);
      setDocumentText(data.documentText);
      setFontType(data.fontType);
      setFontColor(data.fontColor);
      setBackgroundColor(data.backgroundColor);
      setContext(data.context);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("originalString", outputString);
    formData.append("prompt", prompt);
    formData.append("filename", filename);
    formData.append("documentText", documentText);
    formData.append("fontType", fontType);
    formData.append("fontColor", fontColor);
    formData.append("backgroundColor", backgroundColor);
    formData.append("ctx", context)

    fetch("http://localhost:8000/api/regenerate/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      }, 
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // navigate('/Regenerate', { state : { output: data.response, context: data.context, filename: data.filename, documentText: data.file_text, fontType: data.style.fonttype, fontColor: data.style.fontcolor, backgroundColor: data.style.bg } })
        setOutputString(data.response);
        setContext(data.context);
        setFilename(data.filename);
        setDocumentText(data.file_text);
        setFontType(data.style.fonttype);
        setFontColor(data.style.fontcolor);
        setBackgroundColor(data.style.bg);

        setPrompt("");
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      })
      
  }

  return (
    <div>
      {/* Nav Bar */}
      <nav class="bg-[#E2E2E2]">
        <div class="flex justify-between mr-5 ml-2 py-2">
          {/* General Area (Left side) */}
          <div class="flex items-center space-x-1">
            {/* <div class="font-bold">(Logo) EduSynth</div> */}
            <img
              alt="Edusynth Logo"
              src={require("./img/logo/logo-landscape.png")}
              height={60}
              width={100}
            />
            <a
              className="text-[#44566B] py-3 px-3 hover:text-black"
              href="/Prompt"
            >
              A.I. Page
            </a>
            <a
              className="bg-[#316268] text-white py-3 px-3 rounded hover:bg-[#3e7a82]"
              href="/SavedContent"
            >
              Saved Content
            </a>
            <a
              className="text-[#44566B] py-3 px-3 hover:text-black"
              href="/Tutorial"
            >
              Tutorial
            </a>
          </div>

          <div>
            <p className="text-[#44566B] py-3 px-3">
              {localStorage.getItem("username")}
            </p>
          </div>

          {/* User Area (Right side) */}
          <div class="flex items-center space-x-1">
            <a
              className="text-[#44566B] py-3 px-3 hover:text-black"
              href="/UserProfile"
            >
              Profile
            </a>
            <a
              className="text-[#44566B] py-3 px-3 hover:text-black"
              href="/Login"
            >
              Log In
            </a>
            <a
              className="text-[#44566B] py-3 px-3 hover:text-black"
              href="/Logout"
            >
              Log Out
            </a>
            <a
              className="text-[#44566B] py-3 px-3 hover:text-black"
              href="/SignUp"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="savedcontent flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Preview</h1>
          <div className="my-8">
            <div>
              <pre>{outputString}</pre>
            </div>
          </div>

          <div
            style={{
              maxHeight: !showForm ? "500px" : "0",
              overflow: 'hidden',
              transition: 'max-height 0.2s ease-in',
            }}
            className="origin-bottom rounded-lg"
          >
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#19747E] text-white rounded hover:bg-[#316268] p-1 mx-1"
              type="button"
            >
              Make Changes
            </button>
            <button
              className="bg-[#19747E] text-white rounded hover:bg-[#316268] p-1 mx-1"
              type="button"
              onClick={() => navigate('/SavedContent', { state: { output: outputString, filename: filename } })}
            >
              Confirm
            </button>
          </div>

          <div
            style={{
              maxHeight: showForm ? "500px" : "0",
              overflow: 'hidden',
              transition: 'max-height 0.2s ease-out',
            }}
            className="origin-top rounded-lg"
          >
            <form onSubmit={handleSubmit}>
              <div className="p-2">
                <p>What would you like to change?</p>
                <input
                  className="border border-black rounded-md min-w-[500px]"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#19747E] text-white rounded hover:bg-[#316268] p-1 mx-2"
                >
                  Submit
                </button>
              </div>
              <button
                type="button"
                className="bg-[#19747E] text-white rounded hover:bg-[#316268] p-1 mx-2"
                onClick={() => setShowForm(!showForm)}
              >
                Cancel
              </button>
            </form>
          </div>
          <div className="flex justify-between items-center">
            <div className='buttons flex flex-row'>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4" onClick={() => window.location.href = `http://localhost:8000/api/presentations/${filename}?download=true`}>Download</button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
