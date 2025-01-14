"use client";

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';  
import { useSearchParams } from 'next/navigation';

const Chat = ({ user, onLogout }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    if (!user) {
      console.error('User is not defined');
      return;
    }

    await addDoc(collection(db, 'messages'), {
      text: message,
      uid: user.uid,
      displayName: user.displayName,
      timestamp: new Date(),
    });

    setMessage('');
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from parent
    router.push('/'); // Navigate back to home
  };

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

      <div className="h-64 overflow-y-scroll bg-gray-800 p-4 rounded mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong className="font-semibold">{msg.displayName}:</strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button onClick={sendMessage} className="ml-2 bg-teal-400 hover:bg-teal-300 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;