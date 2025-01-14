import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { FaSpinner } from "react-icons/fa"; 

// Dynamically import Chat component
const Chat = dynamic(() => import("../../component/Chat"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl" />
      <span className="ml-4">Loading...</span>
    </div>
  ),
});

const ChatPage = ({ user, onLogout }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chat user={user} onLogout={onLogout} />
    </Suspense>
  );
};

export default ChatPage;
