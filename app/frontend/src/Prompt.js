import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Prompt() {
  const [targetGrade, setTargetGrade] = useState("");
  const [file, setFile] = useState(null);
  const [context, setContext] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [filename, setFilename] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [fontType, setFontType] = useState("");
  const csrfToken = Cookies.get("csrftoken");

  const handleSubmit = (e) => {
    e.preventDefault();
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
        setFilename(data.filename);
        console.log(filename);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="grid place-items-center rounded-lg px-[100px] py-[30px] text-center bg-[#E2E2E2] border-[3px] border-black">
        {output.length !== 0 && (
          <div className="my-[10px]">
            <p>{output}</p>
            <a href={`http://localhost:8000/api/presentations/${filename}`}>Download</a>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <div className="py-2">
              <label htmlFor="targetGrade" className="px-2">Target Grade Level:</label>
              <select
                id="targetGrade"
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="bg-white border border-black rounded-sm p-1"
              >
                <option value="" hidden>
                  Select Grade
                </option>
                {[...Array(12).keys()].map((grade) => (
                  <option key={grade + 1} value={grade + 1}>
                    Grade {grade + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="py-2">
              <label htmlFor="backgroundColor" className="px-2">Background Color:</label>
              <select
                id="backgroundColor"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="bg-white border border-black rounded-sm p-1"
              >
                <option value="">Select Color</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="grey">grey</option>
                <option value="cream">cream</option>
                <option value="light blue">light blue</option>
              </select>
            </div>

            <div className="py-2">
              <label htmlFor="fontColor" className="px-2">Font Color:</label>
              <select
                id="fontColor"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="bg-white border border-black rounded-sm p-1"
              >
                <option value="">Select Color</option>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </div>

            <div className="py-2">
              <label htmlFor="fontType" className="px-2">Font Type:</label>
              <select
                id="fontType"
                value={fontType}
                onChange={(e) => setFontType(e.target.value)}
                className="bg-white border border-black rounded-sm p-1"
              >
                <option value="">Select Font</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Courier">Courier</option>
                <option value="Georgia">Georgia</option>
                <option value="Comic Sans">Comic Sans</option>
              </select>
            </div>

            <div className="py-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="application/pdf"
              />
            </div>

            <div>
              <input
                className="border border-black rounded-md min-w-[500px] px-2"
                type="text"
                placeholder="Context:"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <div className="mt-[20px]">
              <input
                className="border border-black rounded-md min-w-[500px] px-2"
                type="text"
                placeholder="Prompt:"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="mt-[20px]">
              <button
                className="bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] p-2"
                type="submit"
              >
                Prompt
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}