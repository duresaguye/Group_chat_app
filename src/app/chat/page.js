import React, { Suspense } from "react";
import dynamic from 'next/dynamic';
import { FaSpinner } from "react-icons/fa"; // Importing a loading spinner from react-icons

const Chat = dynamic(() => import("../../component/Chat"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl" />
      <span className="ml-4">Loading...</span>
    </div>
  ), // Custom loading spinner while the Chat component is loading
});

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chat />
    </Suspense>
  );
};

export default ChatPage;