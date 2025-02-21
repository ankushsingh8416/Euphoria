"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Support = () => {
  const { data: session } = useSession();
  const [chatUserId, setChatUserId] = useState("");

  useEffect(() => {
    // Generate a unique User ID for each new chat session
    const newUserId = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    setChatUserId(newUserId);
  }, []);

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50">
      <iframe
        key={chatUserId} // Forces iframe to reload on new ID
        src={`https://www.chatbase.co/chatbot-iframe/dkUPXOI0QtYihjt3OZgmT?user_id=${chatUserId}&random=${Math.random()}`}
        frameBorder="0"
        style={{ width: "100%", height: "100%" }}
      ></iframe>
    </div>
  );
};

export default Support;
