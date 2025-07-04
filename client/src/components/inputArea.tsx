"use client";

import { useState } from "react";
import axios from "axios";

export interface ChildProps {
  getAnswerToParent: (res: string) => void;
}

const InputArea: React.FC<ChildProps> = ({ getAnswerToParent }) => {
  const [prompt, setPrompt] = useState<string>("");

  const runRequest = () => {
    axios
      .post(
        "https://medlas.onrender.com/generate-reply",
        { query: prompt },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://medlas.vercel.app",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        getAnswerToParent(res.data.result[0].reply);
        console.log(res.data.result[0].reply);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getAnswerToParent("");
    runRequest();
    console.log("Prompt submitted:", prompt);
  };

  return (
    <form
      className="flex items-center justify-center fixed top-5 w-full"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Ask Away!"
        className="h-12 w-4/5 text-black rounded-l-md rounded-r-none border-r-0 pl-2 border-2 border-amber-800 focus:outline-none"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="h-12 w-10 bg-amber-800 rounded-r-md border-none flex items-center justify-center"
      >
        <img src="/send.svg" className="h-4 w-4" />
      </button>
    </form>
  );
};

export default InputArea;
