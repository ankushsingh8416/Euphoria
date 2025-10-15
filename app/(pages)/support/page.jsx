"use client";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";

const Support = () => {
  const [message, setMessage] = useState("");
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./eupohirachats.json");
      const data = await res.json();
      setFaqData(data);
    };
    fetchData();
  }, []);


  console.log(faqData);

  async function fetchGeminiResponse() {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAYlTH8lCyOVOVjZNuXeKT5Ex7XH6KpgrA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: message,
                  },
                ],
              },
            ],
          }),
        }
      );

      console.log("HTTP Status Code:", response.status);

      const data = await response.json();

      if (response.ok) {
        console.log("Gemini says:", data?.candidates?.[0]?.content?.parts?.[0]?.text);
      } else {
        console.error("Error:", data.error?.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }



  return (
    <div className="w-full md:w-[80%] shadow-lg h-screen mx-auto relative bg-gray-100">
      {/* Go Back Button */}
      <div
        onClick={() => window.history.back()}
        className="absolute cursor-pointer top-4 right-14 flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <BiLogOut size={20} />
        <span className="hidden md:inline font-medium">Back</span>
      </div>

      <div className="p-14">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="border border-gray-700 p-2"
        />
        <button onClick={() => fetchGeminiResponse()} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Support;
