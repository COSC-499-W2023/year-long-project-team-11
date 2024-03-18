import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import MoonLoader from "react-spinners/MoonLoader";
import ConfirmModal from "./components/ConfirmModal";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios, { AxiosError } from "axios";

export default function Regenerate() {
  const [outputString, setOutputString] = useState("<test></test>");
  const [filename, setFilename] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [documentText, setDocumentText] = useState(null);
  const [fontType, setFontType] = useState("Arial");
  const [fontColor, setFontColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [context, setContext] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();
  const csrfToken = Cookies.get("csrftoken");

  const openModal = () => setShowSave(true);
  const closeModal = () => setShowSave(false);

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (data) {
      console.log(data);
      setOutputString(data.output);
      setFilename(data.filename);
      let base = data.filename.substring(0, data.filename.lastIndexOf('.'));
      let previewFilename = base + ".pdf";
      setDocs([{ uri: `http://localhost:8000/api/presentations/${previewFilename}/` }]);
      setDocumentText(data.documentText);
      setFontType(data.fontType);
      setFontColor(data.fontColor);
      setBackgroundColor(data.backgroundColor);
      setContext(data.context);
    }
  }, [data]);

  useEffect(() => {
    let base = filename.substring(0, filename.lastIndexOf('.'));
    let previewFilename = base + ".pdf";
    setDocs([{ uri: `http://localhost:8000/api/presentations/${previewFilename}/` }]);
  }, [filename])

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

  const handleSavePost = (e) => {
    e.preventDefault();

    const post = {
      tag: tags,
      title: title,
      filepath: filename,
      userid: localStorage.getItem("userID"),
    }

    console.log(post);
    
    fetch("http://localhost:8000/save_output/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
        'Authorization': 'Bearer '.concat(localStorage.getItem('access_token')),
      },
      body: JSON.stringify(post),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Saved post: ", data);
        navigate('/Output', { state: { output: outputString, filename: filename, title: title, tags: tags, postid: data.postid } });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

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
                <a href="/Prompt"><img alt="Edusynth Logo" src={require("./img/logo/logo-landscape.png")} height={60} width={100} /></a>
                <a
                  className="text-[#44566B] py-3 px-3 hover:text-black"
                  href="/Prompt"
                >
                  A.I. Page
                </a>
                <a
                  className="text-[#44566B] py-3 px-3 hover:text-black"
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
                  {/* <pre>{outputString}</pre> */}
                  <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
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
                  onClick={openModal}
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
              <ConfirmModal isOpen={showSave} closeModal={closeModal}>
                <form onSubmit={handleSavePost}>
                  <div className="p-2">
                    <div>
                      <h1 className="mb-2 text-2xl">Save</h1>
                      <p>Title</p>
                      <input
                        className="border border-black rounded-md"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <p>Tags</p>
                      <input
                        className="border border-black rounded-md"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#19747E] text-white rounded hover:bg-[#316268] p-1 mt-2 mx-2"
                    >
                      Submit
                    </button>
                  </div>
                  
                </form>
              </ConfirmModal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
