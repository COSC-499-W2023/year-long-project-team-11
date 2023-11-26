import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Prompt() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const csrfToken = Cookies.get("csrftoken");

  const handlePrompt = (e) => {
    e.preventDefault();
    console.log(prompt);

    if (prompt.length === 0) {
      return;
    }

    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })
      .then((response) => response.json())
      .then(data => {
        setOutput(data.response);
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="grid place-items-center rounded-lg px-[100px] py-[30px] text-center bg-[#E2E2E2] border-[3px] border-black">
        {output.length != 0 && (
          <div className="my-[10px]">
            <p>{output}</p>
          </div>
        )}
        <form onSubmit={handlePrompt}>
          <div>
            <input
              className="border border-black rounded-md min-w-[500px]"
              type="text"
              placeholder="Prompt:"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
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
