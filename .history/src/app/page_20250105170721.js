"use client";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';  
import Login from '../component/Login';
import Logout from '../component/Logout';
import Chat from '../component/Chat';
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  const handleJoinChat = () => {
    router.push('/chat');  // Redirect to the chat page
  };

  return (
    <div>
      {user ? (
        <div>
          <Logout />
          <div className="text-center mt-48">
            <h1 className="text-3xl text-blue-500">Welcome to the Group Chat, {user.displayName}!</h1>
            <p className="text-gray-300 mt-4">We're excited to have you here.</p>
            <button
              onClick={handleJoinChat}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
            >
              Join the Chat
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
