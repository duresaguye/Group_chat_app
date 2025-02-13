"use client";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import Login from '../component/Login';
import { signOut } from 'firebase/auth';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleCreateGroupChat = async () => {
    try {
      const groupRef = collection(db, 'groups'); // Reference to Firestore collection
      const groupDoc = await addDoc(groupRef, {
        name: "New Group", // Default name or prompt user for input
        members: [user.uid], // Add the creator as the first member
        createdAt: new Date(),
      });

      const groupID = groupDoc.id; // Firestore auto-generated document ID
      router.push(`/group/${groupID}`); // Redirect to the newly created group
    } catch (error) {
      console.error('Error creating group chat:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out of Firebase authentication
      router.push('/'); // Redirect to the home (login) page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <div className="flex justify-between items-center p-4">
            <h1 className="text-3xl text-blue-500">Welcome, {user.displayName}!</h1>
            <button
              onClick={handleLogout} // Logout the user
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
          
          <div className="text-center mt-48">
            <p className="text-gray-300 mt-4">Join or create a group chat.</p>
            <button
              onClick={() => router.push('/chat')} // Existing group chat
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
            >
              Join Super Chat
            </button>
            <button
              onClick={handleCreateGroupChat} // Create new group chat
              className="mt-4 ml-4 bg-green-500 text-white px-6 py-2 rounded"
            >
              Create Group Chat
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
