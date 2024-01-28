import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Prompt() {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState(null);
  const [targetGrade, setTargetGrade] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const csrfToken = Cookies.get("csrftoken");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(prompt);
    console.log(context);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);
    formData.append("context", context);
    formData.append("targetGrade", targetGrade);

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
                className="bg-white border border-black rounded-sm p-1 "
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
