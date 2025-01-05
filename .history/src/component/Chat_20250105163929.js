"use client";

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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

    await addDoc(collection(db, 'messages'), {
      text: message,
      uid: user.uid,
      displayName: user.displayName,
      timestamp: new Date(),
    });

    setMessage('');
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map(msg => (
          <div key={msg.id} style={styles.messageBubble}>
            <strong style={styles.username}>{msg.displayName}:</strong> 
            <span style={styles.messageText}> {msg.text}</span>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.inputField}
        />
        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

// Styling
const styles = {
  chatContainer: {
    backgroundColor: '#121212', // Dark background
    padding: '20px',
    borderRadius: '8px',
   
    margin: 'auto',
    marginTop: '100px',
    color: '#FFFFFF', 
    fontFamily: 'Arial, sans-serif',
  },
  messagesContainer: {
    height: '300px',
    overflowY: 'scroll',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#1E1E1E', // Slightly lighter dark background for messages area
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Shadow for depth effect
  },
  messageBubble: {
    backgroundColor: '#333333',
    padding: '8px 12px',
    borderRadius: '8px',
    margin: '5px 0',
    color: '#e1e1e1', // Light gray text
  },
  username: {
    fontWeight: 'bold',
    color: '#BB86FC', // Accent color for usernames
  },
  messageText: {
    marginLeft: '5px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #555555',
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF', // Input text color
    marginRight: '10px',
    fontSize: '16px',
  },
  sendButton: {
    backgroundColor: '#03DAC6', // Teal accent color
    color: '#121212', // Dark button text for contrast
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};
