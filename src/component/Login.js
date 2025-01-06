"use client";

import { signInWithPopup, auth, provider } from '../../lib/firebase';
import { useRouter } from 'next/navigation';  
import { useSearchParams } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push(redirectUrl); 
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;