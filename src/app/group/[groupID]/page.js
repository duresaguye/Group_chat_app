"use client";
import { useRouter } from 'next/navigation';
import { db } from '../../../../lib/firebase';
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Logout from '@/component/Logout';
import { FaSpinner } from 'react-icons/fa';

const GroupChat = ({ params }) => {
  const { groupID } = params;
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        const intendedUrl = `/group/${groupID}`;
        router.push(`/login?redirect=${encodeURIComponent(intendedUrl)}`);
      }
    });

    return () => unsubscribe();
  }, [auth, router, groupID]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchGroupData = async () => {
        try {
          const groupRef = doc(db, 'groups', groupID);
          const groupSnap = await getDoc(groupRef);

          if (groupSnap.exists()) {
            setGroupData(groupSnap.data());
          } else {
            console.error('Group not found');
          }
        } catch (error) {
          console.error('Error fetching group data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchGroupData();

      const messagesRef = collection(db, 'groups', groupID, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messagesData);
      });

      return () => unsubscribe();
    }
  }, [groupID, isAuthenticated]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      const messagesRef = collection(db, 'groups', groupID, 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        timestamp: serverTimestamp(),
        user: user.displayName || user.uid
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading group chat...</div>;
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (!groupData) {
    return <div className="text-center mt-10">Group not found.</div>;
  }

  const shareLink = `http://localhost:3000/group/${groupID}`; // Update for your deployment

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-3xl mx-auto mt-10 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => router.push('/')} 
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Back to Home
        </button>
        <button 
          onClick={handleLogout} 
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Logout
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-2">Group: {groupData.name || groupID}</h1>
      <p className="mb-4">This is your group chat!</p>
      <div className="bg-gray-800 p-4 rounded mb-4">
        <p>Invite others to join using this link:</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            readOnly
            value={shareLink}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareLink)}
            className="ml-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Copy Link
          </button>
        </div>
      </div>
      <div className="h-64 overflow-y-scroll bg-gray-800 p-4 rounded mb-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong className="text-blue-400">{message.user}:</strong>{' '}
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send
        </button>
      </form>
    </div>
  );
};

export default GroupChat;