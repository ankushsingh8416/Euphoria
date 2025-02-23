"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";

const Support = () => {
  return (
    <div className="w-full md:w-[80%] shadow-lg h-screen mx-auto relative bg-gray-100">
      {/* Go Back Button */}
      <Link
        href={"/"}
        className="absolute top-4 right-14 flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <BiLogOut size={20} />
        <span className="hidden md:inline font-medium">Back</span>
      </Link>

      {/* Chatbot Iframe */}
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/dkUPXOI0QtYihjt3OZgmT"
        frameBorder="0"
        className="w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default Support;
