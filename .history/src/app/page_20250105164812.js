"use client"

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import Login from '../component/Login';
import Logout from '../component/Logout';
import Chat from '../component/Chat';
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <div>
          <Logout />
          <Chat user={user} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
